'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';

interface Project {
    name: string;
    tech: string;
    description: string;
    challenge: string;
    approach: string;
    impact: string;
}

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const cardColors = ['#00E5FF', '#FF9100', '#FF3366'];
    const caseStudyIcons = [Target, Zap, TrendingUp];

    return (
        <section ref={containerRef} className="relative w-full py-32 px-6 bg-black z-20 overflow-hidden">
            {/* Background Orb */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.06] pointer-events-none bg-[#FF3366]" />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <h2 className="section-label text-[#FF3366] mb-4">Selected Work</h2>
                    <h3 className="section-title text-5xl md:text-7xl text-white">Featured Projects</h3>
                    <p className="text-white/30 text-base font-body font-light mt-4 max-w-xl">Each project is a case study — from identifying the challenge to delivering measurable impact.</p>
                </motion.div>

                {/* Project Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, i) => {
                        const color = cardColors[i % cardColors.length];
                        const isExpanded = expandedIndex === i;

                        return (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 60 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm overflow-hidden hover:border-white/[0.12] transition-all duration-500 cursor-pointer"
                                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                            >
                                {/* Color Accent Bar */}
                                <div className="h-[2px] w-full" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />

                                {/* Top-edge shine on hover */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="p-8 flex flex-col flex-1">
                                    {/* Project Number */}
                                    <span className="text-[80px] font-display font-extrabold leading-none tracking-tighter text-white/[0.02] absolute top-4 right-4 select-none">
                                        0{i + 1}
                                    </span>

                                    <h4 className="text-xl font-display font-bold text-white mb-3 relative z-10">{project.name}</h4>

                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {project.tech.split(', ').map(t => (
                                            <span key={t} className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-lg border border-white/[0.06] text-white/30 font-body bg-white/[0.02]">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-white/35 font-body font-light leading-relaxed text-sm flex-1">{project.description}</p>

                                    {/* Case Study Expand */}
                                    <motion.div
                                        initial={false}
                                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-4">
                                            {[
                                                { label: 'Challenge', value: project.challenge, Icon: caseStudyIcons[0] },
                                                { label: 'Approach', value: project.approach, Icon: caseStudyIcons[1] },
                                                { label: 'Impact', value: project.impact, Icon: caseStudyIcons[2] },
                                            ].map(({ label, value, Icon }) => (
                                                <div key={label} className="flex gap-3">
                                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.06] bg-white/[0.02]" style={{ color }}>
                                                        <Icon size={13} />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] tracking-[0.15em] uppercase text-white/25 font-body block mb-1">{label}</span>
                                                        <p className="text-white/50 font-body font-light text-sm leading-relaxed">{value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* CTA */}
                                    <div className="mt-6 flex items-center justify-between">
                                        <span className="text-xs font-body font-medium tracking-[0.15em] uppercase transition-transform duration-300" style={{ color }}>
                                            {isExpanded ? 'Collapse' : 'View Case Study'}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 90 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ color }}
                                        >
                                            <ArrowRight size={14} />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Hover Glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at 50% 100%, ${color}08, transparent 70%)` }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
