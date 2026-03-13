'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

export default function Navbar() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeIntervalRef = useRef<NodeJS.Timeout>();

    // Scroll progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        audioRef.current = new Audio('/music2.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0;

        return () => {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, []);

    const fadeAudio = (targetVolume: number, duration: number = 1000) => {
        if (!audioRef.current) return;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

        const steps = 20;
        const stepTime = duration / steps;
        const currentVolume = audioRef.current.volume;
        const volumeStep = (targetVolume - currentVolume) / steps;
        let currentStep = 0;

        fadeIntervalRef.current = setInterval(() => {
            currentStep++;
            if (audioRef.current) {
                const newVolume = currentVolume + (volumeStep * currentStep);
                audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
            }
            if (currentStep >= steps) {
                clearInterval(fadeIntervalRef.current);
                if (targetVolume === 0 && audioRef.current) {
                    audioRef.current.pause();
                }
            }
        }, stepTime);
    };

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            fadeAudio(0, 800);
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(e => console.log("Play failed", e));
            fadeAudio(1, 800);
            setIsPlaying(true);
        }
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00E5FF] via-[#FF9100] to-[#FF3366] z-[60] origin-left"
                style={{ scaleX }}
            />

            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-black/50 border-b border-white/[0.04]"
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    {/* Brand / Logo */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        <svg width="28" height="28" viewBox="0 0 100 100" className="group-hover:rotate-180 transition-transform duration-1000 ease-in-out">
                            <defs>
                                <linearGradient id="singularity" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00E5FF" />
                                    <stop offset="100%" stopColor="#FF9100" />
                                </linearGradient>
                            </defs>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#singularity)" strokeWidth="3" />
                            <circle cx="50" cy="50" r="22" fill="none" stroke="url(#singularity)" strokeWidth="1.5" strokeDasharray="4,6" className="animate-[spin_6s_linear_infinite]" />
                            <circle cx="50" cy="50" r="8" fill="#00E5FF" className="animate-[pulse_3s_ease-in-out_infinite]" style={{ filter: 'drop-shadow(0 0 10px #00E5FF)' }} />
                        </svg>
                        <span className="text-lg font-display font-bold tracking-[0.15em] text-white/90">
                            RUSHIKESH
                        </span>
                    </button>

                    {/* Right side controls */}
                    <div className="flex items-center gap-4">

                        {/* GitHub Link */}
                        <motion.a
                            href="https://github.com/rushikeshgoud19?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden sm:flex items-center gap-2 text-white/40 hover:text-[#00E5FF] transition-colors duration-300 text-xs tracking-[0.2em] font-body font-medium"
                            aria-label="GitHub Repositories"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GITHUB
                        </motion.a>

                        {/* Audio Toggle */}
                        <motion.button
                            onClick={toggleAudio}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] transition-colors group"
                            aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
                        >
                            <div className={`absolute inset-0 rounded-full blur-[8px] transition-opacity duration-1000 ${isPlaying ? 'bg-[#00E5FF]/30 opacity-100' : 'bg-transparent opacity-0'}`} />

                            <div className="relative z-10 text-[#00E5FF]">
                                {isPlaying ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-[2px] h-4"
                                    >
                                        {[...Array(4)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-[3px] bg-[#00E5FF] rounded-full origin-bottom"
                                                animate={{ height: ["3px", "12px", "3px"] }}
                                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                                            />
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                                        <Play size={14} className="ml-0.5" fill="currentColor" />
                                    </motion.div>
                                )}
                            </div>
                        </motion.button>

                        {/* CTA */}
                        <button
                            onClick={() => {
                                const el = document.getElementById('portfolio-details');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="relative px-5 py-2 rounded-full border border-white/[0.08] overflow-hidden group tracking-[0.15em] text-xs font-body font-medium cursor-pointer hover:border-[#00E5FF]/30 transition-colors"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/10 to-[#FF9100]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-300">
                                ENTER THE VOID
                            </span>
                        </button>
                    </div>
                </div>
            </motion.nav>
        </>
    );
}
