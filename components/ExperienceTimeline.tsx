'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

interface Role {
    company: string;
    position: string;
    duration: string;
    description: string;
}

export default function ExperienceTimeline({ roles }: { roles: Role[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    return (
        <section 
            ref={containerRef} 
            id="experience-section" 
            className="relative w-full py-32 px-6 bg-black z-20 overflow-hidden scroll-mt-24"
            style={{ perspective: '1200px' }}
        >
            {/* Background Accents */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.06] pointer-events-none bg-[#FF9100]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.04] pointer-events-none bg-[#00E5FF]" />

            <div className="max-w-5xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8, z: -100, filter: 'blur(15px)' }}
                    animate={isInView ? { opacity: 1, scale: 1, z: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-20"
                >
                    <h2 className="section-label text-[#FF9100] mb-4">Journey So Far</h2>
                    <h3 className="section-title text-5xl md:text-7xl text-white">Experience</h3>
                </motion.div>

                {/* Timeline */}
                <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Vertical Line */}
                    <motion.div
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                        transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF9100]/60 via-[#00E5FF]/40 to-transparent origin-top"
                    />

                    {roles.map((role, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8, z: -100, filter: 'blur(10px)' }}
                            animate={isInView ? { opacity: 1, scale: 1, z: 0, filter: 'blur(0px)' } : {}}
                            transition={{ duration: 1.5, delay: 0.6 + i * 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="relative pl-10 md:pl-20 pb-16 last:pb-0 group"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2">
                                <div className="w-3 h-3 rounded-full border-2 border-[#00E5FF]/60 bg-black group-hover:bg-[#00E5FF] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-500" />
                            </div>

                            <div className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm hover:border-[#00E5FF]/20 hover:bg-white/[0.03] transition-all duration-500 group will-change-transform">
                                {/* Inner top shine */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent rounded-t-2xl" />

                                <div className="flex flex-wrap items-center gap-4 mb-5">
                                    <div className="flex items-center gap-2 text-[#00E5FF]">
                                        <Briefcase size={14} />
                                        <span className="text-xs font-display font-bold tracking-[0.15em] uppercase">{role.position}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/30 text-[11px] tracking-wider font-body">
                                        <Calendar size={11} />
                                        {role.duration}
                                    </div>
                                </div>
                                <h4 className="text-xl font-display font-bold text-white mb-3">{role.company}</h4>
                                <p className="text-white/40 font-body font-light leading-relaxed text-sm">{role.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
