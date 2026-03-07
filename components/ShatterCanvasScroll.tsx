'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 839;
const PRELOAD_BATCH = 60;

export default function ShatterCanvasScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

    // Store all instantiated Images in memory to quickly draw to canvas without React state overhead
    const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
    // Track the latest loaded frame that we can fall back to if the current one isn't ready
    const lastDrawnFrameIndex = useRef<number>(1);

    const currentFrame = useRef<number>(1);
    const targetFrame = useRef<number>(1);
    const animationFrameRef = useRef<number>(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    useMotionValueEvent(rawFrameIndex, "change", (latest) => {
        targetFrame.current = latest;
    });

    // Preloader function to chunk requests ahead of the user
    const preloadImages = (startIndex: number) => {
        for (let i = Math.max(1, startIndex); i < startIndex + PRELOAD_BATCH && i <= FRAME_COUNT; i++) {
            if (!imageCache.current.has(i)) {
                const img = new Image();
                const paddedIndex = i.toString().padStart(3, '0');
                img.src = `/shatter_frames/shatter_frame_${paddedIndex}.jpg`;
                imageCache.current.set(i, img);
            }
        }
    };

    const drawImageToCanvas = (img: HTMLImageElement) => {
        if (!canvasRef.current || !img.complete || img.naturalHeight === 0) return;
        const canvas = canvasRef.current;

        if (!canvasCtxRef.current) {
            canvasCtxRef.current = canvas.getContext('2d', { alpha: false });
        }
        const ctx = canvasCtxRef.current;
        if (!ctx) return;

        // Ensure canvas bounds match viewport for crispness
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        // "cover" algorithm
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
    };

    useEffect(() => {
        const renderLoop = () => {
            // Smooth lerp towards target scroll position
            currentFrame.current += (targetFrame.current - currentFrame.current) * 0.15;

            const index = Math.min(Math.max(Math.round(currentFrame.current), 1), FRAME_COUNT);

            // Avoid redundant renders if we haven't moved enough to change frames
            if (index !== lastDrawnFrameIndex.current) {
                let img = imageCache.current.get(index);

                if (!img) {
                    // Instantiate on the fly if user scrubbed too fast past preloads
                    img = new Image();
                    const paddedIndex = index.toString().padStart(3, '0');
                    img.src = `/shatter_frames/shatter_frame_${paddedIndex}.jpg`;
                    imageCache.current.set(index, img);
                }

                if (img.complete && img.naturalHeight !== 0) {
                    drawImageToCanvas(img);
                    lastDrawnFrameIndex.current = index;
                } else {
                    // Fallback draw: if you scrub extremely fast, keep drawing the last good frame
                    const fallbackImg = imageCache.current.get(lastDrawnFrameIndex.current);
                    if (fallbackImg && fallbackImg.complete) {
                        drawImageToCanvas(fallbackImg);
                    }

                    img.onload = () => {
                        const currentIndex = Math.min(Math.max(Math.round(currentFrame.current), 1), FRAME_COUNT);
                        if (Math.abs(currentIndex - index) < 5) {
                            drawImageToCanvas(img);
                            lastDrawnFrameIndex.current = index;
                        }
                    };
                }

                // Push preload window forward
                preloadImages(index + 1);
            }

            animationFrameRef.current = requestAnimationFrame(renderLoop);
        };

        // Start loop
        animationFrameRef.current = requestAnimationFrame(renderLoop);

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    useEffect(() => {
        // Initial setup load
        preloadImages(1);

        const handleResize = () => {
            if (canvasRef.current) {
                canvasCtxRef.current = canvasRef.current.getContext('2d', { alpha: false });
            }
            const img = imageCache.current.get(lastDrawnFrameIndex.current);
            if (img) drawImageToCanvas(img);
        };

        // Setup canvas delay to wait for first load
        setTimeout(() => handleResize(), 100);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scale = useTransform(scrollYProgress, [0.95, 1], [1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

    // Using a 400vh height to make the 839 frames feel reasonably paced
    return (
        <div ref={containerRef} className="relative h-[400vh] w-full z-40">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black z-40">
                <motion.canvas
                    data-testid="project-canvas"
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover will-change-transform"
                    style={{ transform: 'translateZ(0)', scale, opacity }}
                />
            </div>

            {/* The invisible snapping structural anchors */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={`shatter-snap-${idx}`} className="h-[100vh] w-full shrink-0 snap-start" />
                ))}
            </div>
        </div>
    );
}
