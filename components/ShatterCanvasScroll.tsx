'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useScrollAgent } from '@/hooks/useScrollAgent';
import { AnimationAgent } from '@/lib/AnimationAgent';

const FRAME_COUNT = 168; // Sampled from 839 (1/5 step)
const FRAME_STEP = 5;
const PRELOAD_BATCH = 40;

export default function ShatterCanvasScroll() {
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const agent = useMemo(() => new AnimationAgent({
        preloadBatchSize: PRELOAD_BATCH,
        maxFrames: FRAME_COUNT,
        frameStep: FRAME_STEP,
        maxActualFrame: 839,
        getImageUrl: (actualIndex) => {
            const paddedIndex = actualIndex.toString().padStart(3, '0');
            return `/shatter_frames/shatter_frame_${paddedIndex}.jpg`;
        }
    }), []);

    const { canvasRef, scrollYProgress } = useScrollAgent({
        targetRef: containerRef,
        agent,
        frameCount: FRAME_COUNT,
        onReady: () => setIsReady(true)
    });

    const scale = useTransform(scrollYProgress, [0.95, 1], [1, 1.1]);
    const scrollOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-[250vh] w-full z-40">
            <div className="sticky top-0 h-screen w-full overflow-hidden z-40">
                <motion.canvas
                    data-testid="project-canvas"
                    ref={canvasRef}
                    className={`absolute inset-0 h-full w-full object-cover will-change-transform transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transform: 'translateZ(0)', scale, opacity: scrollOpacity }}
                />
            </div>

            {/* The invisible snapping structural anchors */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={`shatter-snap-${idx}`} className="h-[80vh] w-full shrink-0 snap-start" />
                ))}
            </div>
        </div>
    );
}
