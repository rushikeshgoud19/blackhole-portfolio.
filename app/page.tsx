'use client';

import { motion } from 'framer-motion';
import { portfolio } from '@/data/projects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCanvasScroll from '@/components/ProjectCanvasScroll';
import ProjectTextOverlays from '@/components/ProjectTextOverlays';
import ShatterCanvasScroll from '@/components/ShatterCanvasScroll';
import PortfolioReveal from '@/components/PortfolioReveal';

export default function Home() {
    const project = portfolio;

    return (
        <main className="relative bg-black min-h-screen">
            <Navbar />

            <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="w-full"
            >
                {/* Scroll Engine & Texts */}
                {/* Unified Animation Engine: Black Hole -> Shatter */}
                <div className="relative z-10 w-full">
                    <ProjectCanvasScroll folderPath={project.folderPath} />
                    <ProjectTextOverlays project={project} />
                    <ShatterCanvasScroll />
                </div>

                {/* The "visually crazy" animated portfolio reveal */}
                <PortfolioReveal project={project} />

                {/* Details Section */}
                <motion.section
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 py-32 px-6 max-w-7xl mx-auto bg-black snap-start"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white" style={{ textShadow: `0 0 40px ${project.themeColor}80` }}>
                                {project.detailsSection.title}
                            </h3>
                            <p className="text-xl text-gray-300 leading-relaxed font-light mb-8">
                                {project.detailsSection.description}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-4 py-2 rounded-full border border-white/20 text-sm tracking-widest bg-white/5 backdrop-blur-sm text-white">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-white/10" style={{ background: project.gradient }}>
                            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbHRlcj0idXJsKCNuIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')] mix-blend-overlay" />
                            <div className="absolute inset-0 flex items-center justify-center text-white/50 tracking-widest uppercase font-bold text-sm">
                                [{project.detailsSection.imageAlt}]
                            </div>
                        </div>
                    </div>

                    {/* Removed legacy stats section */}
                </motion.section>

                {/* Architecture Section */}
                <motion.section
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 py-32 px-6 bg-black snap-start"
                    style={{ borderTop: `1px solid ${project.themeColor}30` }}
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                            {project.architectureSection.title}
                        </h3>
                        <p className="text-xl text-gray-400 leading-relaxed font-light">
                            {project.architectureSection.description}
                        </p>
                    </div>
                </motion.section>

                {/* Links Section */}
                <motion.section
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 py-32 px-6 max-w-7xl mx-auto bg-black snap-start mb-24"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-20" style={{ backgroundColor: project.themeColor }} />
                        <div className="relative z-10">
                            <div className="text-sm tracking-widest text-gray-400 uppercase mb-4">Availability Status</div>
                            <div className="text-2xl mb-8 flex items-center gap-3 text-white">
                                <span className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ backgroundColor: project.themeColor, color: project.themeColor }} />
                                {project.linksSection.status}
                            </div>
                            <div className="text-sm tracking-widest text-gray-400 uppercase mb-4">Core Principles</div>
                            <ul className="space-y-3 mb-8">
                                {project.linksSection.keyFeatures.map(feat => (
                                    <li key={feat} className="flex items-center gap-3 text-lg text-white/90">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={project.themeColor} strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center gap-6 relative z-10">
                            <div className="p-6 rounded-2xl bg-black/50 border border-white/5">
                                <h4 className="font-bold mb-2 text-white">Focus</h4>
                                <p className="text-gray-400 font-light text-sm">{project.linksSection.deployment}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-black/50 border border-white/5">
                                <h4 className="font-bold mb-2 text-white">Open Source</h4>
                                <p className="text-gray-400 font-light text-sm">{project.linksSection.githubPolicy}</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

            </motion.div>

            <Footer />
        </main>
    );
}
