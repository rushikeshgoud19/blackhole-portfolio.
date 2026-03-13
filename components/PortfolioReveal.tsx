'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PortfolioData } from '@/data/projects';

export default function PortfolioReveal({ project }: { project: PortfolioData }) {
    const containerRef = useRef<HTMLDivElement>(null);
    // Trigger only when the section is significantly into the viewport to ensure the shatter finishes first
    const isInView = useInView(containerRef, { once: true, margin: "0px 0px -40% 0px" });

    const nameLetters = Array.from(project.name);

    // Deep Space cinematic variants - Strictly Z-Axis
    const letterVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.05, 
            z: -1200, 
            y: 0, // Explicitly lock Y to 0
            rotateX: 45, 
            filter: 'blur(50px)' 
        },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            z: 0,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: {
                delay: i * 0.1,
                duration: 3, // Slower, more intentional arrival
                ease: [0.16, 1, 0.3, 1], 
            }
        })
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.2, 
            z: -1000, 
            y: 0,
            rotateX: -20, 
            filter: 'blur(30px)' 
        },
        visible: {
            opacity: 1,
            scale: 1,
            z: 0,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 2.5,
                delay: 1.5, // Start well after name begins to settle
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section 
            ref={containerRef} 
            className="relative w-full min-h-screen bg-black overflow-hidden py-32 flex flex-col items-center justify-center z-20 border-t border-white/5"
            style={{ perspective: '2000px' }} // Deepened perspective for 3D depth
        >
            {/* Immersive Background Orbs - Drifting in depth */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[140px] opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${project.themeColor} 0%, transparent 70%)` }}
                initial={{ scale: 0.5, opacity: 0, z: -500 }}
                animate={isInView ? { 
                    scale: [0.8, 1.3, 1], 
                    opacity: [0, 0.4, 0.2],
                    z: [ -500, 0, -200 ]
                } : {}}
                transition={{ duration: 6, ease: "easeOut" }}
            />

            {/* Introduction Text Block */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mb-32 flex flex-col items-center text-center">
                <motion.h2
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter uppercase flex overflow-hidden lg:perspective-[2000px]"
                    style={{ 
                        textShadow: `0 0 100px ${project.themeColor}80`, 
                        color: 'white',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {nameLetters.map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="inline-block will-change-transform"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5, z: -300, filter: 'blur(20px)' }}
                    animate={isInView ? { opacity: 1, scale: 1, z: 0, filter: 'blur(0px)' } : {}}
                    transition={{ delay: 1.2, duration: 2, ease: "easeOut" }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <h3 className="text-2xl md:text-4xl font-light tracking-[0.4em] text-[#00E5FF] mb-8 uppercase" style={{ textShadow: '0 0 40px #00E5FF' }}>
                        {project.role}
                    </h3>
                    <p className="max-w-2xl mx-auto text-xl text-gray-400 font-light leading-relaxed tracking-wide opacity-80 font-body">
                        {project.description}
                    </p>
                </motion.div>
            </div>

            {/* Teaser Data Section - Rushing forward from deep space */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8" style={{ transformStyle: 'preserve-3d' }}>
                {/* Latest Project Feature */}
                {project.projectsSection.projects[0] && (
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="group relative p-12 rounded-[40px] border border-[#00E5FF]/20 bg-black/40 backdrop-blur-2xl overflow-hidden hover:border-[#00E5FF]/60 transition-colors duration-700 will-change-transform"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <h4 className="text-[#00E5FF]/40 text-xs tracking-[0.3em] uppercase mb-4 font-bold font-body">Featured Genesis</h4>
                        <h5 className="text-4xl text-white font-display font-black mb-4 tracking-tight">{project.projectsSection.projects[0].name}</h5>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed font-body font-light opacity-90">{project.projectsSection.projects[0].description}</p>
                        <button
                            onClick={() => {
                                const el = document.getElementById('portfolio-details');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="text-[#00E5FF] uppercase tracking-[0.2em] text-[10px] font-bold flex items-center gap-3 group-hover:gap-5 transition-all cursor-pointer font-body border border-[#00E5FF]/30 px-6 py-2 rounded-full hover:bg-[#00E5FF]/10"
                        >
                            Explore Architecture <span>→</span>
                        </button>
                    </motion.div>
                )}

                {/* Tech & Skills Stagger */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="p-12 rounded-[40px] border border-[#FF9100]/20 bg-black/40 backdrop-blur-2xl overflow-hidden hover:border-[#FF9100]/60 transition-colors duration-700 will-change-transform"
                >
                    <h4 className="text-[#FF9100]/40 text-xs tracking-[0.3em] uppercase mb-6 font-bold font-body">Core Engine Stack</h4>
                    <div className="flex flex-wrap gap-4">
                        {project.techStack.map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0, z: -100 }}
                                animate={isInView ? { opacity: 1, scale: 1, z: 0 } : {}}
                                transition={{ delay: 1.8 + (i * 0.1), type: "spring", bounce: 0.4 }}
                                className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:text-white hover:bg-white/10 transition-all cursor-crosshair font-body"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    <div className="mt-14 pt-8 border-t border-white/5">
                        <h4 className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mb-4 font-bold font-body">Current Broadcast</h4>
                        <div className="flex items-center gap-5 text-white/80 text-lg font-display tracking-tight">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9100] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF9100]"></span>
                            </span>
                            {project.linksSection.status} / {project.linksSection.type}
                        </div>
                    </div>
                </motion.div>
            </div>

        </section>
    );
}
