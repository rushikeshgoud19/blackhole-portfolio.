'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Allow the page to hydrate and load critical resources
        const timer = setTimeout(() => setIsLoading(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loading"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(20px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
                >
                    {/* Pulsing Singularity */}
                    <motion.div
                        className="relative"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <svg width="80" height="80" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#00E5FF" strokeWidth="2" strokeDasharray="10 5" className="animate-[spin_3s_linear_infinite]" />
                            <circle cx="50" cy="50" r="25" fill="none" stroke="#FF9100" strokeWidth="1.5" strokeDasharray="5 8" className="animate-[spin_5s_linear_infinite_reverse]" />
                            <circle cx="50" cy="50" r="8" fill="#00E5FF" style={{ filter: 'drop-shadow(0 0 20px #00E5FF)' }} className="animate-pulse" />
                        </svg>
                    </motion.div>

                    {/* Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mt-8 text-xs tracking-[0.5em] uppercase text-white/50 font-medium"
                    >
                        Entering the Void
                    </motion.p>

                    {/* Progress Bar */}
                    <motion.div
                        className="mt-6 w-48 h-px bg-white/10 rounded-full overflow-hidden"
                    >
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-[#00E5FF] to-[#FF9100]"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
