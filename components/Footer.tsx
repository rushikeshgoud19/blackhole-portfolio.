'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/rushikeshgoud19", icon: Github },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/rushikesh-kayala/", icon: Linkedin },
        { name: "Email", url: "mailto:rushikeshgoud19@gmail.com", icon: Mail }
    ];

    return (
        <footer className="relative w-full bg-black text-white pt-32 pb-16 px-6 overflow-hidden z-20 border-t border-white/[0.04]">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-gradient-to-b from-[#00E5FF]/[0.06] to-transparent blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Massive CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center mb-32"
                >
                    <h2 className="section-title text-5xl md:text-8xl mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
                        Let&apos;s Build <br/> The Future.
                    </h2>
                    <motion.a 
                        href="mailto:rushikeshgoud19@gmail.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 py-3.5 rounded-full bg-white text-black font-display font-bold tracking-[0.15em] text-xs uppercase overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[#00E5FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 flex items-center gap-2.5">
                            <Mail size={14} /> rushikeshgoud19@gmail.com
                        </span>
                    </motion.a>
                </motion.div>

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pt-12 border-t border-white/[0.06]">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <svg width="20" height="20" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#00E5FF" strokeWidth="3" />
                                <circle cx="50" cy="50" r="22" fill="none" stroke="#FF9100" strokeWidth="1.5" strokeDasharray="4,6" className="animate-[spin_6s_linear_infinite]" />
                                <circle cx="50" cy="50" r="8" fill="#00E5FF" style={{ filter: 'drop-shadow(0 0 6px #00E5FF)' }} />
                            </svg>
                            <h3 className="text-lg font-display font-bold tracking-[0.15em]">RUSHIKESH</h3>
                        </div>
                        <p className="text-white/30 max-w-sm text-sm leading-relaxed font-body font-light">
                            Creative Developer & AI Engineer blurring the lines between art, logic, and profound digital experiences.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-display font-bold mb-6 text-white/80 uppercase tracking-[0.2em] text-[11px]">Socials</h4>
                        <ul className="space-y-4 text-white/30 font-body font-light text-sm">
                            {socialLinks.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="group flex items-center gap-3 hover:text-[#00E5FF] transition-colors w-max"
                                    >
                                        <link.icon size={14} className="text-white/20 group-hover:text-[#00E5FF] transition-colors" />
                                        <span>{link.name}</span>
                                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">↗</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h4 className="font-display font-bold mb-6 text-white/80 uppercase tracking-[0.2em] text-[11px]">Status</h4>
                            <div className="flex items-center gap-3 bg-white/[0.02] w-max px-4 py-2 rounded-full border border-white/[0.06]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                </span>
                                <span className="text-white/70 text-[11px] font-body font-medium tracking-wider uppercase">Available for work</span>
                            </div>
                        </div>
                        
                        <div className="mt-12 md:mt-0 text-white/20 text-[10px] tracking-wider uppercase font-body">
                            © {currentYear} Kayala Rushikesh Goud.<br/>All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
