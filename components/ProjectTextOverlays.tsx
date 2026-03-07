'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { PortfolioData } from '@/data/projects';
import { useRef } from 'react';

interface Props {
    project: PortfolioData;
}

const QuoteSection = ({
    quote,
    index,
    total,
    scrollYProgress,
}: {
    quote: { title: string, subtitle: string },
    index: number,
    total: number,
    scrollYProgress: MotionValue<number>
}) => {
    // 1-to-1 Snapping Math:
    // With N snap blocks (height N*100vh), scrollYProgress maps to:
    // Snapped at Block 0 -> 0.0
    // Snapped at Block 1 -> 1 / (N - 1)
    const p = index / Math.max(1, total - 1);

    // We want the quote strictly invisible unless the user has snapped to this block.
    // Fade out completely if user scrolls just 2.5% of the total distance away from the snap point.
    const fadeDistance = 0.025;

    let inputSpace = [p - fadeDistance, p, p + fadeDistance];
    let outputOpacity = [0, 1, 0];
    let outputY = [20, 0, -20];

    // Handle array boundary conditions for framer-motion strict increasing bounds
    if (index === 0) {
        inputSpace = [0, fadeDistance];
        outputOpacity = [1, 0];
        outputY = [0, -20];
    } else if (index === total - 1) {
        inputSpace = [p - fadeDistance, 1];
        outputOpacity = [0, 1];
        outputY = [20, 0];
    }

    const opacity = useTransform(scrollYProgress, inputSpace, outputOpacity);
    const y = useTransform(scrollYProgress, inputSpace, outputY);

    const getPositionStyles = (i: number): React.CSSProperties => {
        // 4-Corner Layout mapping: 
        // 0: Top-Left, 1: Top-Right, 2: Bottom-Left, 3: Bottom-Right
        const positions: React.CSSProperties[] = [
            { top: '15%', left: '8%', textAlign: 'left' as const, paddingRight: '20px', maxWidth: '600px' },
            { top: '20%', right: '8%', textAlign: 'right' as const, paddingLeft: '20px', maxWidth: '600px' },
            { bottom: '15%', left: '8%', textAlign: 'left' as const, paddingRight: '20px', maxWidth: '600px' },
            { bottom: '20%', right: '8%', textAlign: 'right' as const, paddingLeft: '20px', maxWidth: '600px' },
        ];
        return positions[i % 4];
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 pointer-events-none z-10 w-full h-full"
        >
            <div className="absolute w-full" style={getPositionStyles(index)}>

                {/* The Quote */}
                <h2
                    className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4 text-white uppercase"
                    style={{ textShadow: `0 0 40px rgba(0,229,255,0.6), 0 4px 20px rgba(0,0,0,0.9)`, fontFamily: 'var(--font-space-grotesk)' }}
                >
                    {quote.title}
                </h2>
                {quote.subtitle && (
                    <p className="relative z-10 text-xl md:text-2xl font-medium tracking-wide text-white/90"
                        style={{ textShadow: `0 4px 15px rgba(0,0,0,0.9)` }}>
                        {quote.subtitle}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default function ProjectTextOverlays({ project }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: `${project.quotes.length * 100}vh` }}>
            {/* The visible sticky container for quotes */}
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                {project.quotes.map((quote, idx) => (
                    <QuoteSection
                        key={idx}
                        quote={quote}
                        index={idx}
                        total={project.quotes.length}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>

            {/* The invisible snapping structural anchors */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-auto">
                {project.quotes.map((_, idx) => (
                    <div key={`snap-${idx}`} className="h-[100vh] w-full shrink-0 snap-start" />
                ))}
            </div>
        </div>
    );
}
