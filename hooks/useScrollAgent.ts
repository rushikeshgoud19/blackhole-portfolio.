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
                // Try to get the exact frame OR the nearest available frame instantly
                let img = agent.getNearestFrame(index);

                if (img) {
                    if (canvasRef.current) {
                        if (!canvasCtxRef.current) canvasCtxRef.current = canvasRef.current.getContext('2d', { alpha: false });
                        if (canvasCtxRef.current) {
                            agent.drawImageToCanvas(img, canvasRef.current, canvasCtxRef.current);
                            lastDrawnFrameIndex.current = index;
                        }
                    }
                }

                // Passive background load nearby frames
                agent.preloadImages(index);
            }

            animationFrameRef.current = requestAnimationFrame(renderLoop);
        };

        animationFrameRef.current = requestAnimationFrame(renderLoop);
        
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [agent, frameCount]);

    useEffect(() => {
        // High-priority skeleton load for immediate interaction
        agent.preloadKeyframes(onReady);

        const handleResize = () => {
            if (canvasRef.current) {
                canvasCtxRef.current = canvasRef.current.getContext('2d', { alpha: false });
            }
            const img = agent.getNearestFrame(lastDrawnFrameIndex.current);
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
