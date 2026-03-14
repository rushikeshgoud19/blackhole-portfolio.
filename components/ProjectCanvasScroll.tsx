'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useScrollAgent } from '@/hooks/useScrollAgent';
import { AnimationAgent } from '@/lib/AnimationAgent';
import { portfolio } from '@/data/projects';

interface Props {
    folderPath: string;
    totalQuotes?: number;
    onProgress?: (loaded: number, total: number) => void;
}

const DESKTOP_MAX = 1807;
const DESKTOP_STEP = 12;
const DESKTOP_COUNT = Math.floor(DESKTOP_MAX / DESKTOP_STEP);

const PRELOAD_BATCH = 40;

export default function ProjectCanvasScroll({ folderPath: desktopPath, totalQuotes = 12, onProgress }: Props) {
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const config = useMemo(() => {
        if (isMobile === null) return null;
        if (isMobile) {
            return {
                path: portfolio.mobileFolderPath,
                max: portfolio.mobileMaxFrames,
                actualMax: portfolio.mobileMaxFrames,
                step: 1,
                count: portfolio.mobileMaxFrames,
                getName: (idx: number) => `${portfolio.mobileFolderPath}/${idx}.jpg`
            };
        }
        return {
            path: desktopPath,
            max: DESKTOP_COUNT,
            actualMax: DESKTOP_MAX,
            step: DESKTOP_STEP,
            count: DESKTOP_COUNT,
            getName: (idx: number) => {
                const paddedIndex = idx.toString().padStart(3, '0');
                return `${desktopPath}/blackhole_frame_${paddedIndex}.jpg`;
            }
        };
    }, [isMobile, desktopPath]);

    const agent = useMemo(() => {
        if (!config) return null;
        return new AnimationAgent({
            preloadBatchSize: isMobile ? 20 : PRELOAD_BATCH,
            maxFrames: config.count,
            frameStep: config.step,
            maxActualFrame: config.actualMax,
            getImageUrl: config.getName
        });
    }, [config, isMobile]);

    const { canvasRef } = useScrollAgent({
        targetRef: containerRef,
        agent: agent!,
        frameCount: config?.count || 0,
        onReady: () => setIsReady(true),
        onProgress
    });

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: `${totalQuotes * 100}vh` }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                {isMobile !== null && (
                    <canvas
                        data-testid="project-canvas"
                        ref={canvasRef}
                        className={`absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-1000 will-change-transform ${isReady ? 'opacity-80' : 'opacity-0'}`}
                        style={{ transform: 'translateZ(0)' }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
            </div>
        </div>
    );
}
