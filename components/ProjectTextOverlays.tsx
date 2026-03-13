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
    const p = index / Math.max(1, total - 1);

    // Wider fade window (~8% of scroll) so the quote is visible for a proper "snap" step
    const fadeDistance = 0.08;

    let inputSpace = [p - fadeDistance, p, p + fadeDistance];
    let outputOpacity = [0, 1, 0];
    let outputY = [40, 0, -40];

    // Boundary conditions
    if (index === 0) {
        inputSpace = [0, fadeDistance];
        outputOpacity = [1, 0];
        outputY = [0, -40];
    } else if (index === total - 1) {
        inputSpace = [p - fadeDistance, 1];
        outputOpacity = [0, 1];
        outputY = [40, 0];
    }

    const opacity = useTransform(scrollYProgress, inputSpace, outputOpacity);
    const y = useTransform(scrollYProgress, inputSpace, outputY);

    // Alternate positions: centered for more impact
    const getPositionStyles = (i: number): React.CSSProperties => {
        const positions: React.CSSProperties[] = [
            { top: '35%', left: '8%', textAlign: 'left' as const, maxWidth: '700px' },
            { top: '30%', right: '8%', textAlign: 'right' as const, maxWidth: '700px' },
            { bottom: '30%', left: '8%', textAlign: 'left' as const, maxWidth: '700px' },
            { top: '35%', right: '8%', textAlign: 'right' as const, maxWidth: '700px' },
            { bottom: '25%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' as const, maxWidth: '700px' },
            { top: '30%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' as const, maxWidth: '700px' },
        ];
        return positions[i % positions.length];
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 pointer-events-none z-10 w-full h-full"
        >
            <div className="absolute w-full" style={getPositionStyles(index)}>
                {/* The Quote */}
                <h2
                    className="relative z-10 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 text-white"
                    style={{ textShadow: `0 0 60px rgba(0,229,255,0.5), 0 4px 30px rgba(0,0,0,0.95)`, fontFamily: 'var(--font-display)' }}
                >
                    {quote.title}
                </h2>
                {quote.subtitle && (
                    <p className="relative z-10 text-lg md:text-xl font-body font-light tracking-wide text-white/70 leading-relaxed"
                        style={{ textShadow: `0 4px 20px rgba(0,0,0,0.95)` }}>
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

            {/* The invisible snapping structural anchors — CSS snap for crisp transitions */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none">
                {project.quotes.map((_, idx) => (
                    <div key={`snap-${idx}`} className="h-screen w-full shrink-0 snap-start" />
                ))}
            </div>
        </div>
    );
}
