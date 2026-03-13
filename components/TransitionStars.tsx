'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function TransitionStars() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 2]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

    if (!mounted) return null;

    return (
        <div ref={containerRef} className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <motion.div
                style={{ scale, opacity, rotate }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh]"
            >
                {/* Randomly generated stars radiating outward */}
                {Array.from({ length: 40 }).map((_, i) => {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 50 + 10;
                    const x = `${50 + Math.cos(angle) * distance}%`;
                    const y = `${50 + Math.sin(angle) * distance}%`;
                    const size = Math.random() * 3 + 1;
                    const delay = Math.random() * 2;

                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                left: x,
                                top: y,
                                width: size,
                                height: size,
                                boxShadow: '0 0 10px 2px rgba(255,255,255,0.4)'
                            }}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.5 + delay, repeat: Infinity }}
                        />
                    );
                })}
            </motion.div>
        </div>
    );
}
