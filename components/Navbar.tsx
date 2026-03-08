'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

export default function Navbar() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeIntervalRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // Initialize audio on mount
        audioRef.current = new Audio('/music2.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0; // Start at 0 for fade in

        return () => {
            // Cleanup on unmount to prevent multiple audio instances playing
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
                // Clamp volume between 0 and 1
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
            // Fade out then pause
            fadeAudio(0, 800);
            setIsPlaying(false);
        } else {
            // Play then fade in
            audioRef.current.play().catch(e => console.log("Play failed", e));
            fadeAudio(1, 800);
            setIsPlaying(true);
        }
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-[#020005]/60 border-b border-[#00E5FF]/10 supports-[backdrop-filter]:bg-transparent"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Brand / Logo */}
                <div className="flex items-center gap-4 cursor-pointer group">
                    <svg width="32" height="32" viewBox="0 0 100 100" className="group-hover:rotate-180 transition-transform duration-1000 ease-in-out">
                        <defs>
                            <linearGradient id="singularity" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00E5FF" />
                                <stop offset="100%" stopColor="#FF9100" />
                            </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="url(#singularity)" strokeWidth="4" />
                        <circle cx="50" cy="50" r="25" fill="none" stroke="url(#singularity)" strokeWidth="2" strokeDasharray="5,5" className="animate-[spin_4s_linear_infinite]" />
                        <circle cx="50" cy="50" r="10" fill="#00E5FF" className="animate-[pulse_2s_ease-in-out_infinite]" style={{ filter: 'drop-shadow(0 0 15px #00E5FF)' }} />
                    </svg>
                    <span className="text-2xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        SINGULARITY
                    </span>
                </div>

                {/* Right side controls */}
                <div className="flex items-center gap-6">

                    {/* GitHub Repos Link */}
                    <motion.a
                        href="https://github.com/rushikeshgoud19?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden sm:flex items-center gap-2 text-white/60 hover:text-[#00E5FF] transition-colors duration-300 text-sm tracking-widest font-medium"
                        aria-label="GitHub Repositories"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GITHUB
                    </motion.a>

                    {/* Audio Toggle */}
                    <motion.button
                        onClick={toggleAudio}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex items-center justify-center w-12 h-12 rounded-full border border-[#00E5FF]/20 bg-black/40 hover:bg-[#00E5FF]/10 transition-colors group"
                        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
                    >
                        {/* Glow effect */}
                        <div className={`absolute inset-0 rounded-full blur-[10px] transition-opacity duration-1000 ${isPlaying ? 'bg-[#00E5FF]/40 opacity-100' : 'bg-transparent opacity-0'}`} />

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
                                            className="w-1 bg-[#00E5FF] rounded-full origin-bottom"
                                            animate={{
                                                height: ["4px", "14px", "4px"]
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: i * 0.15,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <Play size={18} className="ml-1" fill="currentColor" />
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
                        className="relative px-6 py-2.5 rounded-full border border-[#00E5FF]/30 overflow-hidden group tracking-widest text-sm font-medium cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/20 to-[#FF9100]/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
                        <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
                            ENTER THE VOID
                        </span>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
