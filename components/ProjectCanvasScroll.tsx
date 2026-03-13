'use client';

import { useState, useMemo, useRef } from 'react';
import { useScrollAgent } from '@/hooks/useScrollAgent';
import { AnimationAgent } from '@/lib/AnimationAgent';

interface Props {
    folderPath: string;
    totalQuotes?: number;
}

const FRAME_COUNT = 226; // Sampled from 1807 (1/8 step)
const FRAME_STEP = 8;
const PRELOAD_BATCH = 40;

export default function ProjectCanvasScroll({ folderPath, totalQuotes = 12 }: Props) {
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const agent = useMemo(() => new AnimationAgent({
        preloadBatchSize: PRELOAD_BATCH,
        maxFrames: FRAME_COUNT,
        frameStep: FRAME_STEP,
        maxActualFrame: 1807,
        getImageUrl: (actualIndex) => {
            const paddedIndex = actualIndex.toString().padStart(3, '0');
            return `${folderPath}/blackhole_frame_${paddedIndex}.jpg`;
        }
    }), [folderPath]);

    const { canvasRef } = useScrollAgent({
        targetRef: containerRef,
        agent,
        frameCount: FRAME_COUNT,
        onReady: () => setIsReady(true)
    });

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: `${totalQuotes * 100}vh` }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                <canvas
                    data-testid="project-canvas"
                    ref={canvasRef}
                    className={`absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-1000 will-change-transform ${isReady ? 'opacity-80' : 'opacity-0'}`}
                    style={{ transform: 'translateZ(0)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
            </div>
        </div>
    );
}
