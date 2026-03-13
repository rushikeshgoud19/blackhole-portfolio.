'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent, ReactNode } from 'react';
import NeuralBackground from './NeuralBackground';

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    glowColor?: string;
    neural?: boolean;
    neuralColor?: string;
    neuralNodeCount?: number;
    neuralLabel?: string;
    skillNodes?: string[];
    anchors?: { x: number, y: number, label: string }[];
}

export default function BentoCard({ 
    children, 
    className = '', 
    delay = 0, 
    glowColor = 'rgba(255, 255, 255, 0.06)', 
    neural = false,
    neuralColor,
    neuralNodeCount,
    neuralLabel,
    skillNodes = [],
    anchors = []
}: BentoCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            className={`group relative rounded-[20px] border border-white/[0.06] bg-white/[0.015] backdrop-blur-2xl overflow-hidden p-7 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.03] ${className}`}
        >
            {/* Mouse-tracking radial glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            500px circle at ${mouseX}px ${mouseY}px,
                            ${glowColor},
                            transparent 80%
                        )
                    `,
                }}
            />

            {neural && (
                <div className="absolute inset-0 z-0">
                    <NeuralBackground 
                        color={neuralColor} 
                        nodeCount={neuralNodeCount} 
                        label={neuralLabel} 
                        skillNodes={skillNodes}
                        anchors={anchors}
                        className="opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                    />
                </div>
            )}

            {/* Top-edge subtle shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Content Layer */}
            <div className="relative z-10 flex h-full flex-col">{children}</div>
        </motion.div>
    );
}
