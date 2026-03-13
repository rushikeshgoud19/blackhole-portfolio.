'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import ConstellationSkills from './ConstellationSkills';


function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutStory({ paragraphs }: { paragraphs: string[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    return (
        <section
            ref={containerRef}
            id="about-section"
            className="relative w-full py-32 px-6 bg-black z-20 overflow-hidden scroll-mt-24"
            style={{ perspective: '1200px' }}
        >
            {/* Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.05] pointer-events-none bg-[#00E5FF]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.04] pointer-events-none bg-[#FF9100]" />

            <div className="max-w-6xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, z: -100, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, scale: 1, z: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-20"
                >
                    <h2 className="section-label text-[#00E5FF] mb-4">Who I Am</h2>
                    <h3 className="section-title text-5xl md:text-7xl text-white">My Story</h3>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Story — Left Column (3/5) */}
                    <div className="lg:col-span-3 space-y-8" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Pull Quote */}
                        <motion.blockquote
                            initial={{ opacity: 0, scale: 0.9, z: -50, filter: 'blur(10px)' }}
                            animate={isInView ? { opacity: 1, scale: 1, z: 0, filter: 'blur(0px)' } : {}}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative pl-6 border-l-2 border-[#00E5FF]/40 mb-12"
                        >
                            <p className="text-2xl md:text-3xl font-display font-bold text-white/90 leading-relaxed tracking-tight">
                                &ldquo;Whatever it is, I will support you.&rdquo;
                            </p>
                            <span className="text-white/30 text-sm font-body mt-3 block">— My mother&apos;s words that became my anchor</span>
                        </motion.blockquote>

                        {/* Paragraphs */}
                        {paragraphs.map((p, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, scale: 0.95, z: -20 }}
                                animate={isInView ? { opacity: 1, scale: 1, z: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                                className="text-white/40 font-body font-light leading-[1.9] text-[15px]"
                            >
                                {p}
                            </motion.p>
                        ))}
                    </div>

                    {/* Stats & Skills — Right Column (2/5) */}
                    <div className="lg:col-span-2 space-y-10" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                { number: 1, suffix: '+', label: 'Year Building' },
                                { number: 10, suffix: '+', label: 'Projects' },
                                { number: 5, suffix: '+', label: 'Technologies' },
                                { number: 100, suffix: '%', label: 'Passion' },
                            ].map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.015]"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, z: -50 }}
                                        animate={isInView ? { opacity: 1, scale: 1, z: 0 } : {}}
                                        transition={{ type: "spring", bounce: 0.35, delay: 0.5 + i * 0.15 }}
                                        className="text-3xl font-display font-extrabold text-white mb-1"
                                    >
                                        <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                                    </motion.div>
                                    <p className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-body">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Constellation Skill Graph */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                            animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                            transition={{ duration: 1.2, delay: 0.6 }}
                            className="space-y-5"
                        >
                            <h4 className="text-[10px] tracking-[0.2em] text-white/25 uppercase font-body font-medium mb-4">Core Skills Constellation</h4>
                            <ConstellationSkills />
                        </motion.div>

                        {/* Location / Availability */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] space-y-3"
                        >
                            <div className="flex items-center gap-3">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span className="text-sm text-white/50 font-body">Hyderabad, India</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                </span>
                                <span className="text-sm text-white/50 font-body">Available for work</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
