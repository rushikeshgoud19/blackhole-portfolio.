export class AnimationAgent {
    private imageCache = new Map<number, HTMLImageElement>();
    private preloadBatchSize: number;
    private maxFrames: number;
    private frameStep: number;
    private maxActualFrame: number;
    private getImageUrl: (index: number) => string;
    private loadQueue: number[] = [];
    private isProcessingQueue = false;

    constructor(config: {
        preloadBatchSize?: number;
        maxFrames: number;
        frameStep: number;
        maxActualFrame: number;
        getImageUrl: (index: number) => string;
    }) {
        this.preloadBatchSize = config.preloadBatchSize || 40;
        this.maxFrames = config.maxFrames;
        this.frameStep = config.frameStep;
        this.maxActualFrame = config.maxActualFrame;
        this.getImageUrl = config.getImageUrl;
    }

    // 1. Load a sparse "skeleton" of frames immediately so the whole scroll works instantly (e.g., every 15th frame)
    public preloadKeyframes(onReady?: () => void) {
        if (typeof window === 'undefined') return;

        const keyframeStep = Math.max(1, Math.floor(this.maxFrames / 15)); // Try to get ~15 keyframes
        const keyframes: number[] = [];
        
        for (let i = 1; i <= this.maxFrames; i += keyframeStep) {
            keyframes.push(i);
        }
        // Always include the last frame
        if (keyframes[keyframes.length - 1] !== this.maxFrames) {
            keyframes.push(this.maxFrames);
        }

        let loadedCount = 0;
        const requiredForReady = Math.min(3, keyframes.length);

        keyframes.forEach(index => {
            if (!this.imageCache.has(index)) {
                const img = new Image();
                img.src = this.getImageUrl(this.getActualIndex(index));
                
                img.onload = () => {
                    loadedCount++;
                    if (onReady && loadedCount >= requiredForReady) {
                        onReady();
                        onReady = undefined; // Fire once
                    }
                };
                
                // Do not block rendering, keep decoding async
                img.decoding = 'async'; 
                this.imageCache.set(index, img);
            } else {
                loadedCount++;
                if (onReady && loadedCount >= requiredForReady) {
                    onReady();
                    onReady = undefined;
                }
            }
        });
    }

    // 2. Queue-based passive loading for nearby frames
    public preloadImages(startIndex: number) {
        if (typeof window === 'undefined') return;

        // Clear existing queue and reprioritize based on current scroll position
        this.loadQueue = [];
        
        // Add nearby frames (high priority)
        const forwardCount = Math.min(this.preloadBatchSize, 20);
        const backwardCount = Math.min(this.preloadBatchSize / 2, 10);
        
        // Look ahead
        for (let i = startIndex; i < startIndex + forwardCount && i <= this.maxFrames; i++) {
            if (!this.imageCache.has(i)) this.loadQueue.push(i);
        }
        // Look behind
        for (let i = startIndex - 1; i >= Math.max(1, startIndex - backwardCount); i--) {
            if (!this.imageCache.has(i)) this.loadQueue.push(i);
        }

        this.processQueue();
    }

    // Non-blocking queue processor
    private processQueue() {
        if (this.isProcessingQueue || this.loadQueue.length === 0 || typeof window === 'undefined') return;
        this.isProcessingQueue = true;

        const deferFn = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));
        
        const loadNext = () => {
            // Process up to 3 images per idle cycle to prevent blocking
            const batch = this.loadQueue.splice(0, 3);
            
            if (batch.length > 0) {
                batch.forEach(index => {
                    if (!this.imageCache.has(index)) {
                        const img = new Image();
                        img.decoding = 'async'; // Critical for non-blocking UI
                        img.src = this.getImageUrl(this.getActualIndex(index));
                        this.imageCache.set(index, img);
                    }
                });
                
                if (this.loadQueue.length > 0) {
                    deferFn(loadNext);
                    return;
                }
            }
            this.isProcessingQueue = false;
        };

        deferFn(loadNext);
    }

    private getActualIndex(mappedIndex: number): number {
        return Math.min((mappedIndex - 1) * this.frameStep + 1, this.maxActualFrame);
    }

    // 3. Smart Fallback: Find the closest loaded frame if the exact one is missing
    public getNearestFrame(targetIndex: number): HTMLImageElement | undefined {
        if (this.imageCache.has(targetIndex)) {
            const img = this.imageCache.get(targetIndex)!;
            if (img.complete && img.naturalHeight !== 0) return img;
        }

        let closestImg: HTMLImageElement | undefined;
        let smallestDiff = Infinity;

        // Search the cache for the nearest available frame
        this.imageCache.forEach((img, index) => {
            if (img.complete && img.naturalHeight !== 0) {
                const diff = Math.abs(index - targetIndex);
                if (diff < smallestDiff) {
                    smallestDiff = diff;
                    closestImg = img;
                }
            }
        });

        return closestImg;
    }

    public lazyLoadImage(index: number): HTMLImageElement {
        if (!this.imageCache.has(index) && typeof window !== 'undefined') {
            const img = new Image();
            img.decoding = 'async';
            img.src = this.getImageUrl(this.getActualIndex(index));
            this.imageCache.set(index, img);
            return img;
        }
        return this.imageCache.get(index)!;
    }

    public drawImageToCanvas(img: HTMLImageElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (!img.complete || img.naturalHeight === 0) return;

        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
}

