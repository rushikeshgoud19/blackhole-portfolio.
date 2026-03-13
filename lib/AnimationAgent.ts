export class AnimationAgent {
    private imageCache = new Map<number, HTMLImageElement>();
    private preloadBatchSize: number;
    private maxFrames: number;
    private frameStep: number;
    private maxActualFrame: number;
    private getImageUrl: (index: number) => string;

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

    public preloadImages(startIndex: number, onInitialFramesReady?: () => void, requiredInitial: number = 15) {
        let loadedCount = 0;
        for (let i = Math.max(1, startIndex); i < startIndex + this.preloadBatchSize && i <= this.maxFrames; i++) {
            if (!this.imageCache.has(i)) {
                // Must be in browser to use Image
                if (typeof window === 'undefined') return;

                const img = new Image();
                img.src = this.getImageUrl(this.getActualIndex(i));
                
                img.onload = () => {
                    loadedCount++;
                    if (onInitialFramesReady && this.imageCache.size >= requiredInitial && loadedCount >= requiredInitial) {
                        onInitialFramesReady();
                    }
                };
                this.imageCache.set(i, img);
            }
        }
    }

    private getActualIndex(mappedIndex: number): number {
        return Math.min((mappedIndex - 1) * this.frameStep + 1, this.maxActualFrame);
    }

    public getImage(index: number): HTMLImageElement | undefined {
        return this.imageCache.get(index);
    }

    public getFallbackImage(lastDrawnIndex: number): HTMLImageElement | undefined {
        return this.imageCache.get(lastDrawnIndex);
    }

    public lazyLoadImage(index: number): HTMLImageElement {
        if (!this.imageCache.has(index) && typeof window !== 'undefined') {
            const img = new Image();
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
