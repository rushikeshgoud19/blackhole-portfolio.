'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { portfolio } from '@/data/projects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BentoCard from '@/components/BentoCard';
import SectionDivider from '@/components/SectionDivider';

// Dynamically import heavy client-side components to speed up initial GET / load
const ProjectCanvasScroll = dynamic(() => import('@/components/ProjectCanvasScroll'), { ssr: false });
const ProjectTextOverlays = dynamic(() => import('@/components/ProjectTextOverlays'), { ssr: false });
const ShatterCanvasScroll = dynamic(() => import('@/components/ShatterCanvasScroll'), { ssr: false });
const PortfolioReveal = dynamic(() => import('@/components/PortfolioReveal'), { ssr: false });
const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline'), { ssr: false });
const FeaturedProjects = dynamic(() => import('@/components/FeaturedProjects'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), { ssr: false });
const AboutStory = dynamic(() => import('@/components/AboutStory'), { ssr: false });
const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), { ssr: false });

export default function Home() {
    const project = portfolio;

    return (
        <main className="relative bg-black min-h-screen hide-default-cursor">
            <CustomCursor />
            <ScrollToTop />
            <Navbar />
            <FloatingCTA />

            <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="w-full"
            >
                {/* Scroll Engine & Texts */}
                {/* Unified Animation Engine: Black Hole -> Shatter */}
                <div className="relative z-10 w-full snap-start">
                    <ProjectCanvasScroll folderPath={project.folderPath} totalQuotes={project.quotes.length} />
                    <ProjectTextOverlays project={project} />
                    <ShatterCanvasScroll />
                </div>

                {/* The "visually crazy" animated portfolio reveal */}
                <div className="snap-start">
                    <PortfolioReveal project={project} />
                </div>

                <SectionDivider />

                {/* About / Personal Story Section */}
                <div className="snap-start">
                    <AboutStory paragraphs={project.aboutMeSection.paragraphs} />
                </div>

                <SectionDivider />

                {/* Experience Timeline */}
                <div className="snap-start">
                    <ExperienceTimeline roles={project.experienceSection.roles} />
                </div>

                <SectionDivider />

                {/* Featured Projects Showcase — Case Study Format */}
                <div className="snap-start">
                    <FeaturedProjects projects={project.projectsSection.projects} />
                </div>

                <SectionDivider />

                {/* ========== PREMIUM DETAILS SECTION ========== */}
                <div className="snap-start">
                    <section id="portfolio-details" className="relative z-20 py-32 px-6 bg-black scroll-mt-24 overflow-hidden">
                        {/* Background Orbs */}
                        <div className="absolute top-20 left-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.08] pointer-events-none" style={{ backgroundColor: project.themeColor }} />
                        <div className="absolute bottom-40 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none bg-[#00E5FF]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-[0.04] pointer-events-none bg-[#FF9100]" />

                        <div className="max-w-7xl mx-auto">
                            {/* Section Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="mb-20"
                            >
                                <h2 className="section-label text-[#00E5FF] mb-4">Deep Dive</h2>
                                <h3 className="section-title text-5xl md:text-7xl text-white">The Details</h3>
                                <p className="text-white/50 text-lg font-body font-light mt-4 max-w-xl">Everything you need to know about what I do, how I build, and where I&apos;m headed.</p>
                            </motion.div>

                            {/* BENTO GRID — 10 Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[220px]">

                                {/* Card 1 — Main Spotlight / Journey (Large) */}
                                <BentoCard className="md:col-span-2 md:row-span-2" delay={0.1} glowColor={`${project.themeColor}30`}>
                                    <div className="flex flex-col h-full justify-between relative">
                                        <svg className="absolute -top-8 -right-8 w-40 h-40 opacity-10 animate-[spin_20s_linear_infinite]" viewBox="0 0 200 200">
                                            <circle cx="100" cy="100" r="80" fill="none" stroke="#00E5FF" strokeWidth="1" strokeDasharray="8 6" />
                                            <circle cx="100" cy="100" r="50" fill="none" stroke="#FF9100" strokeWidth="0.5" strokeDasharray="4 8" />
                                            <circle cx="100" cy="20" r="4" fill="#00E5FF" />
                                        </svg>
                                        <div>
                                            <div className="inline-block px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-[11px] tracking-[0.2em] uppercase font-medium mb-4">About Me</div>
                                            <h3 className="text-2xl md:text-4xl font-display font-extrabold mb-4 tracking-tight text-white leading-tight">
                                                {project.detailsSection.title}
                                            </h3>
                                            <p className="text-base text-white/60 leading-relaxed font-body font-light">
                                                {project.detailsSection.description}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const el = document.getElementById('about-section');
                                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }}
                                            className="mt-auto pt-4 flex items-center gap-3 group/btn cursor-pointer"
                                        >
                                            <div className="w-9 h-9 rounded-full border border-[#00E5FF]/30 flex items-center justify-center group-hover/btn:bg-[#00E5FF]/10 group-hover/btn:border-[#00E5FF]/60 transition-all duration-300">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                            </div>
                                            <span className="text-xs tracking-[0.15em] uppercase text-[#00E5FF]/80 group-hover/btn:text-[#00E5FF] transition-colors font-body font-medium">Read my story</span>
                                        </button>
                                    </div>
                                    <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: project.themeColor }} />
                                </BentoCard>

                                {/* Card 2 — Stats Grid */}
                                <BentoCard className="md:col-span-1 md:row-span-1" delay={0.15} glowColor="rgba(255, 145, 0, 0.12)">
                                    <div className="flex flex-col h-full justify-between">
                                        <h4 className="text-xs tracking-[0.15em] text-white/40 uppercase font-body font-medium">Impact</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-end gap-3">
                                                <motion.span
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
                                                    className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50"
                                                >1</motion.span>
                                                <span className="text-xs text-white/40 tracking-wider uppercase pb-2 font-body">Year Building</span>
                                            </div>
                                            <div className="flex items-end gap-3">
                                                <motion.span
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                                                    className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#FF9100] to-[#FF3366]"
                                                >10+</motion.span>
                                                <span className="text-xs text-white/40 tracking-wider uppercase pb-2 font-body">Projects</span>
                                            </div>
                                        </div>
                                    </div>
                                </BentoCard>

                                {/* Card 3 — Status Beacon */}
                                <BentoCard className="md:col-span-1 md:row-span-1" delay={0.2}>
                                    <div className="flex flex-col h-full justify-between">
                                        <h4 className="text-xs tracking-[0.15em] text-white/40 uppercase font-body font-medium">Status</h4>
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                                                </span>
                                                <span className="text-white font-display font-bold text-lg">{project.linksSection.status}</span>
                                            </div>
                                            <p className="text-white/50 text-sm font-body font-light">{project.linksSection.type}</p>
                                            <p className="text-white/30 text-xs font-body font-light mt-2">{project.linksSection.deployment}</p>
                                        </div>
                                    </div>
                                </BentoCard>

                                {/* Card 4 — Tech Stack Pills */}
                                <BentoCard className="md:col-span-2 md:row-span-1" delay={0.25}>
                                    <div className="flex flex-col h-full justify-between">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xs tracking-[0.15em] text-white/40 uppercase font-body font-medium">Tech Stack</h4>
                                            <span className="text-xs text-white/25 font-body">{project.techStack.length} technologies</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2.5">
                                            {project.techStack.map((tech, i) => (
                                                <motion.span
                                                    key={tech}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.3 + i * 0.06, type: "spring", bounce: 0.4 }}
                                                    className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-sm tracking-wider bg-white/[0.03] text-white/60 hover:text-white hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300 cursor-default font-body"
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </BentoCard>

                                {/* Card 5 — Architecture / Visual */}
                                <BentoCard className="md:col-span-1 md:row-span-1 p-0 overflow-hidden relative" delay={0.3}>
                                    <div className="absolute inset-0 z-0" style={{ background: project.gradient }}>
                                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                                    </div>
                                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-[2px]">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-4">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                        </div>
                                        <h4 className="text-xl font-display font-bold text-white text-center mb-2">{project.architectureSection.title}</h4>
                                        <p className="text-sm text-white/60 text-center font-body font-light leading-relaxed">{project.architectureSection.description}</p>
                                    </div>
                                </BentoCard>

                                {/* Card 6 — Key Strengths */}
                                <BentoCard className="md:col-span-1 md:row-span-1" delay={0.35}>
                                    <div className="flex flex-col h-full justify-between">
                                        <h4 className="text-xs tracking-[0.15em] text-white/40 uppercase font-body font-medium">Strengths</h4>
                                        <ul className="space-y-3">
                                            {project.linksSection.keyFeatures.map((feat, i) => (
                                                <motion.li
                                                    key={feat}
                                                    initial={{ opacity: 0, x: -15 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.4 + i * 0.1 }}
                                                    className="flex items-center gap-3 text-base text-white/60 font-body font-light"
                                                >
                                                    <div className="w-6 h-6 rounded-md bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center shrink-0">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    {feat}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </BentoCard>

                                {/* Card 7 — Philosophy (NEW) */}
                                <BentoCard className="md:col-span-2 md:row-span-1" delay={0.38} glowColor="rgba(255, 51, 102, 0.08)">
                                    <div className="flex flex-col h-full justify-between">
                                        <h4 className="text-xs tracking-[0.15em] text-white/40 uppercase font-body font-medium">Philosophy</h4>
                                        <div>
                                            <h3 className="text-xl font-display font-bold text-white mb-3">Build with purpose, ship with precision.</h3>
                                            <p className="text-base text-white/50 font-body font-light leading-relaxed">
                                                Every project starts with a question: <span className="text-white/80">what impact will this create?</span> I don&apos;t just write code — I craft experiences that solve real problems and leave lasting impressions.
                                            </p>
                                        </div>
                                    </div>
                                </BentoCard>

                                {/* Card 8 — Approach (NEW) */}
                                <BentoCard className="md:col-span-2 md:row-span-1" delay={0.42} glowColor="rgba(0, 229, 255, 0.06)">
                                    <div className="flex flex-col h-full justify-between">
                                        <h4 className="text-xs tracking-[0.15em] text-white/40 uppercase font-body font-medium">How I Work</h4>
                                        <div className="flex gap-6">
                                            {[
                                                { step: '01', label: 'Research', desc: 'Deep-dive into the problem space' },
                                                { step: '02', label: 'Design', desc: 'Prototype and iterate fast' },
                                                { step: '03', label: 'Build', desc: 'Clean code, tested, shipped' },
                                            ].map((item, i) => (
                                                <motion.div
                                                    key={item.step}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.5 + i * 0.1 }}
                                                    className="flex-1"
                                                >
                                                    <span className="text-2xl font-display font-extrabold text-[#00E5FF]/30">{item.step}</span>
                                                    <h5 className="text-base font-display font-bold text-white mt-1">{item.label}</h5>
                                                    <p className="text-sm text-white/40 font-body font-light mt-1">{item.desc}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </BentoCard>

                                {/* Card 9 — Email CTA */}
                                <BentoCard className="md:col-span-2 md:row-span-1" delay={0.45} glowColor="rgba(0, 229, 255, 0.08)">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-full gap-4">
                                        <div>
                                            <h4 className="text-xs tracking-[0.15em] text-white/40 uppercase font-body font-medium mb-2">Let&apos;s Connect</h4>
                                            <h3 className="text-xl font-display font-bold text-white mb-1">Got a project in mind?</h3>
                                            <p className="text-white/50 text-sm font-body font-light">I&apos;m always open to discussing new opportunities.</p>
                                        </div>
                                        <motion.a
                                            href="mailto:rushikeshgoud19@gmail.com"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/5 hover:bg-[#00E5FF]/15 transition-all text-[#00E5FF] text-sm font-body font-medium tracking-widest uppercase shrink-0"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                            Email Me
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </motion.a>
                                    </div>
                                </BentoCard>

                                {/* Card 10 — GitHub */}
                                <BentoCard className="md:col-span-2 md:row-span-1" delay={0.5} glowColor="rgba(255, 255, 255, 0.05)">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-full gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-display font-bold text-white">{project.linksSection.githubPolicy}</h3>
                                                <p className="text-white/40 text-sm font-body font-light">Open source contributions & projects.</p>
                                            </div>
                                        </div>
                                        <motion.a
                                            href="https://github.com/rushikeshgoud19"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-display font-bold tracking-widest uppercase shrink-0 hover:bg-[#00E5FF] transition-colors"
                                        >
                                            GitHub
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </motion.a>
                                    </div>
                                </BentoCard>

                            </div>
                        </div>
                    </section>
                </div>

            </motion.div>

            <div className="snap-start">
                <Footer />
            </div>
        </main>
    );
}
