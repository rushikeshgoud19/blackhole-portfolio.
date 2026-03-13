'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Mail, ArrowUp } from 'lucide-react';

export default function FloatingCTA() {
    const [visible, setVisible] = useState(false);

    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Show after 15% scroll, hide near the very bottom (footer territory)
        setVisible(latest > 0.15 && latest < 0.95);
    });

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={visible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.08] bg-black/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
        >
            {/* Status Dot */}
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[11px] text-white/40 font-body tracking-wider uppercase hidden sm:block">Available</span>

            <div className="w-px h-5 bg-white/[0.08]" />

            <a
                href="mailto:rushikeshgoud19@gmail.com"
                className="flex items-center gap-2 text-[11px] text-[#00E5FF] font-body font-medium tracking-[0.15em] uppercase hover:text-white transition-colors"
            >
                <Mail size={12} />
                <span className="hidden sm:block">Get in Touch</span>
            </a>

            <div className="w-px h-5 bg-white/[0.08]" />

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
                aria-label="Scroll to top"
            >
                <ArrowUp size={12} className="text-white/40" />
            </button>
        </motion.div>
    );
}
