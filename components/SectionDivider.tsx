import { motion } from 'framer-motion';

export default function SectionDivider() {
    return (
        <div className="relative w-full h-32 z-20 flex items-center justify-center overflow-hidden bg-black">
            
            <div className="relative z-10 w-full flex items-center justify-center">
                {/* Horizontal Animated Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent origin-center"
                />

                {/* Center Diamond */}
                <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="absolute w-2.5 h-2.5 bg-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,229,255,0.5)] rounded-sm"
                />
            </div>
        </div>
    );
}
