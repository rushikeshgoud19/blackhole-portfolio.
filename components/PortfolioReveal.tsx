'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PortfolioData } from '@/data/projects';

export default function PortfolioReveal({ project }: { project: PortfolioData }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-200px" });

    const nameLetters = Array.from(project.name);

    // Core animation variants
    const letterVariants = {
        hidden: { opacity: 0, y: 100, rotateX: -90, filter: 'blur(20px)' },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: {
                delay: i * 0.05,
                duration: 1.2,
                ease: [0.2, 0.65, 0.3, 0.9],
            }
        })
    };

    const revealVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 150 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 40,
                damping: 20,
                mass: 1.5
            }
        }
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden py-32 flex flex-col items-center justify-center z-20 border-t border-white/5">
            {/* Immersive Background Orbs */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${project.themeColor} 0%, transparent 70%)` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: [1, 1.2, 1], opacity: [0, 0.3, 0.15] } : {}}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />

            {/* Introduction Text Block */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mb-32 flex flex-col items-center text-center">
                <motion.h2
                    className="text-7xl md:text-9xl font-black mb-4 tracking-tighter uppercase flex overflow-hidden perspective-1000"
                    style={{ textShadow: `0 0 80px ${project.themeColor}50`, color: 'white' }}
                >
                    {nameLetters.map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="drop-shadow-2xl"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                >
                    <h3 className="text-2xl md:text-4xl font-light tracking-widest text-[#00E5FF] mb-8 uppercase" style={{ textShadow: '0 0 30px #00E5FF' }}>
                        {project.role}
                    </h3>
                    <p className="max-w-2xl mx-auto text-xl text-gray-400 font-light leading-relaxed">
                        {project.description}
                    </p>
                </motion.div>
            </div>

            {/* Teaser Data Section */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Latest Project Feature */}
                {project.projectsSection.projects[0] && (
                    <motion.div
                        variants={revealVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: 1.2 }}
                        className="group relative p-10 rounded-3xl border border-[#00E5FF]/20 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-[#00E5FF]/50 transition-colors duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <h4 className="text-gray-500 text-sm tracking-widest uppercase mb-4 font-bold">Latest Innovation</h4>
                        <h5 className="text-4xl text-white font-bold mb-4">{project.projectsSection.projects[0].name}</h5>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">{project.projectsSection.projects[0].description}</p>
                        <div className="text-[#00E5FF] uppercase tracking-widest text-sm font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                            Explore Project <span className="text-lg">→</span>
                        </div>
                    </motion.div>
                )}

                {/* Tech & Skills Stagger */}
                <motion.div
                    variants={revealVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 1.4 }}
                    className="p-10 rounded-3xl border border-[#FF9100]/20 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-[#FF9100]/50 transition-colors duration-500"
                >
                    <h4 className="text-gray-500 text-sm tracking-widest uppercase mb-6 font-bold">Core Stack</h4>
                    <div className="flex flex-wrap gap-3">
                        {project.techStack.map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                                transition={{ delay: 1.6 + (i * 0.1), type: "spring", bounce: 0.6 }}
                                className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors cursor-pointer hover:scale-105 hover:-translate-y-1"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    <div className="mt-12">
                        <h4 className="text-gray-500 text-sm tracking-widest uppercase mb-4 font-bold">Current Status</h4>
                        <div className="flex items-center gap-4 text-white/90 text-lg">
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9100] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FF9100]"></span>
                            </span>
                            {project.linksSection.status} / {project.linksSection.type}
                        </div>
                    </div>
                </motion.div>
            </div>

        </section>
    );
}
