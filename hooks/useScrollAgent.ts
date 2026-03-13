'use client';

import { useEffect, useRef, RefObject } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { AnimationAgent } from '../lib/AnimationAgent';

interface UseScrollAgentConfig {
    targetRef: RefObject<HTMLElement>;
    agent: AnimationAgent;
    frameCount: number;
    onReady?: () => void;
}

export function useScrollAgent({ targetRef, agent, frameCount, onReady }: UseScrollAgentConfig) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    
    // Track the latest loaded frame that we can fall back to
    const lastDrawnFrameIndex = useRef<number>(1);
    const currentFrame = useRef<number>(1);
    const targetFrame = useRef<number>(1);
    const animationFrameRef = useRef<number>(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [1, Math.max(1, frameCount)]);

    useMotionValueEvent(rawFrameIndex, "change", (latest) => {
        targetFrame.current = latest;
    });

    useEffect(() => {
        const renderLoop = () => {
            currentFrame.current += (targetFrame.current - currentFrame.current) * 0.15;
            const index = Math.min(Math.max(Math.round(currentFrame.current), 1), frameCount);

            if (index !== lastDrawnFrameIndex.current) {
                let img = agent.lazyLoadImage(index);

                if (img?.complete && img?.naturalHeight !== 0) {
                    if (canvasRef.current && img) {
                        if (!canvasCtxRef.current) canvasCtxRef.current = canvasRef.current.getContext('2d', { alpha: false });
                        if (canvasCtxRef.current) {
                            agent.drawImageToCanvas(img, canvasRef.current, canvasCtxRef.current);
                            lastDrawnFrameIndex.current = index;
                        }
                    }
                } else {
                    const fallbackImg = agent.getFallbackImage(lastDrawnFrameIndex.current);
                    if (fallbackImg && fallbackImg.complete && canvasRef.current) {
                        if (!canvasCtxRef.current) canvasCtxRef.current = canvasRef.current.getContext('2d', { alpha: false });
                        if (canvasCtxRef.current) {
                            agent.drawImageToCanvas(fallbackImg, canvasRef.current, canvasCtxRef.current);
                        }
                    }

                    if (img) {
                        img.onload = () => {
                            const currentIndex = Math.min(Math.max(Math.round(currentFrame.current), 1), frameCount);
                            if (Math.abs(currentIndex - index) < 5 && canvasRef.current) {
                                if (!canvasCtxRef.current) canvasCtxRef.current = canvasRef.current.getContext('2d', { alpha: false });
                                if (canvasCtxRef.current) {
                                    agent.drawImageToCanvas(img, canvasRef.current, canvasCtxRef.current);
                                    lastDrawnFrameIndex.current = index;
                                }
                            }
                        };
                    }
                }

                agent.preloadImages(index + 1);
            }

            animationFrameRef.current = requestAnimationFrame(renderLoop);
        };

        animationFrameRef.current = requestAnimationFrame(renderLoop);
        
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [agent, frameCount]);

    useEffect(() => {
        agent.preloadImages(1, onReady, 2);

        const handleResize = () => {
            if (canvasRef.current) {
                canvasCtxRef.current = canvasRef.current.getContext('2d', { alpha: false });
            }
            const img = agent.getFallbackImage(lastDrawnFrameIndex.current);
            if (img && canvasRef.current && canvasCtxRef.current) {
                agent.drawImageToCanvas(img, canvasRef.current, canvasCtxRef.current);
            }
        };

        // Setup canvas delay to wait for first load/DOM
        setTimeout(() => handleResize(), 100);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [agent, onReady]);

    return { canvasRef, scrollYProgress };
}
