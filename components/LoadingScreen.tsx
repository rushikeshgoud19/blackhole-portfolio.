'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

interface Props {
    progress: number;   // 0–100
    onComplete: () => void;
}

const NAME = 'RUSHIKESH';
const ROLE = 'Creative Developer';

// Starfield Canvas Component for high-performance background
const StarfieldCanvas = ({ phase }: { phase: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const stars = useMemo(() => {
        return Array.from({ length: 200 }, () => ({
            x: Math.random() * 2000,
            y: Math.random() * 2000,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.7 + 0.1,
            blinkSpeed: Math.random() * 0.02 + 0.005,
            blinkPhase: Math.random() * Math.PI * 2,
        }));
    }, []);

    const nebula = useMemo(() => {
        return Array.from({ length: 50 }, () => ({
            x: Math.random() * 2000,
            y: Math.random() * 2000,
            size: Math.random() * 3 + 1,
            color: Math.random() > 0.6 ? '#00E5FF' : (Math.random() > 0.5 ? '#FF3366' : '#FF9100'),
            opacity: Math.random() * 0.3 + 0.05,
            driftX: (Math.random() - 0.5) * 0.2,
            driftY: (Math.random() - 0.5) * 0.2,
        }));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            time += 0.01;
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Draw Stars
            stars.forEach(s => {
                const currentOpacity = s.opacity * (0.6 + 0.4 * Math.sin(time * s.blinkSpeed * 100 + s.blinkPhase));
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.beginPath();
                ctx.arc(s.x % window.innerWidth, s.y % window.innerHeight, s.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Nebula Bits
            nebula.forEach(p => {
                const x = (p.x + time * p.driftX * 100) % window.innerWidth;
                const y = (p.y + time * p.driftY * 100) % window.innerHeight;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity * (0.5 + 0.5 * Math.sin(time + p.x));
                ctx.beginPath();
                ctx.arc(x < 0 ? x + window.innerWidth : x, y < 0 ? y + window.innerHeight : y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1.0;

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [stars, nebula]);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{ filter: phase === 'exit' ? 'blur(20px)' : 'none', transition: 'filter 1.5s ease' }}
        />
    );
};

// Speed streaks that appear behind the rocket
function generateStreaks(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        length: Math.random() * 100 + 50,
        duration: Math.random() * 0.5 + 0.2,
        delay: Math.random() * 2,
    }));
}

const STREAKS = generateStreaks(25);

const RocketShip = ({ progress, phase }: { progress: number; phase: string }) => {
    // Rocket moves from bottom-left towards center
    const x = `${(progress * 0.45)}%`; 
    const y = `${(100 - (progress * 0.45))}%`; 

    return (
        <motion.div
            className="absolute z-[100] pointer-events-none"
            initial={{ left: '-10%', top: '110%', rotate: 45, scale: 0.8 }}
            animate={{
                left: x,
                top: y,
                rotate: 45,
                scale: phase === 'loaded' ? [1, 1.2, 0] : 1,
                opacity: phase === 'exit' ? 0 : 1,
                filter: phase === 'loaded' ? 'blur(10px)' : 'blur(0px)',
            }}
            transition={{
                duration: phase === 'loaded' ? 2.5 : 0.5, // Slower final push
                ease: phase === 'loaded' ? 'easeInOut' : 'linear',
            }}
            style={{ x: '-50%', y: '-50%' }}
        >
            {/* Rocket SVG */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d="M20 35C20 35 15 30 15 25C15 20 20 20 20 20C20 20 25 20 25 25C25 30 20 35 20 35Z"
                    fill="url(#flameGrad)"
                    animate={{ scaleY: [1, 1.8, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.08, repeat: Infinity }}
                    style={{ transformOrigin: 'top center' }}
                />
                <path d="M20 5C20 5 12 15 12 25C12 30 15 32 20 32C25 32 28 30 28 25C28 15 20 5 20 5Z" fill="#F4F4F4" />
                <path d="M20 5C20 5 15 15 15 25C15 28 17 30 20 30V5Z" fill="#E2E2E2" />
                <circle cx="20" cy="18" r="3" fill="#00E5FF" fillOpacity="0.4" stroke="#00E5FF" strokeWidth="0.5" />
                <path d="M12 22L8 28C8 28 8 32 12 30L12 22Z" fill="#FF3366" />
                <path d="M28 22L32 28C32 28 32 32 28 30L28 22Z" fill="#FF3366" />
                <defs>
                    <radialGradient id="flameGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 25) rotate(90) scale(12 6)">
                        <stop offset="0%" stopColor="#FF9100" />
                        <stop offset="100%" stopColor="#FF3366" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>

            {/* Velocity Streaks */}
            <AnimatePresence>
                {progress > 10 && phase === 'intro' && (
                    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 w-[300px] h-[300px] pointer-events-none">
                        {STREAKS.map(s => (
                            <motion.div
                                key={s.id}
                                className="absolute bg-white/20"
                                style={{
                                    left: `${s.x}%`,
                                    top: `${s.y}%`,
                                    width: 1,
                                    height: s.length,
                                    filter: 'blur(1px)',
                                }}
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ 
                                    scaleY: [0, 1.5, 0], 
                                    opacity: [0, 0.4, 0],
                                    y: [0, 250]
                                }}
                                transition={{
                                    duration: s.duration,
                                    repeat: Infinity,
                                    delay: s.delay,
                                    ease: 'linear'
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function LoadingScreen({ progress, onComplete }: Props) {
    const [phase, setPhase] = useState<'intro' | 'loaded' | 'exit'>('intro');
    const [typedRole, setTypedRole] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const hasCompletedRef = useRef(false);

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < ROLE.length) {
                setTypedRole(ROLE.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 65);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const blink = setInterval(() => setShowCursor(prev => !prev), 530);
        return () => clearInterval(blink);
    }, []);

    useEffect(() => {
        if (progress >= 100 && phase === 'intro') {
            const t = setTimeout(() => setPhase('loaded'), 1800); // Increased delay for weight
            return () => clearTimeout(t);
        }
    }, [progress, phase]);

    useEffect(() => {
        if (phase === 'loaded') {
            const t = setTimeout(() => setPhase('exit'), 3200); // More time to enjoy the "entering" state
            return () => clearTimeout(t);
        }
    }, [phase]);

    const handleExitComplete = useCallback(() => {
        if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete();
        }
    }, [onComplete]);

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {phase !== 'exit' && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{
                        scale: 0.05,
                        opacity: 0,
                        filter: 'blur(80px)', // Heavier blur on exit
                    }}
                    transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        transformOrigin: 'center center',
                        background: 'radial-gradient(ellipse at 50% 60%, #0a0015 0%, #03000a 50%, #000000 100%)',
                    }}
                >
                    {/* ── High Performance Star Field ── */}
                    <StarfieldCanvas phase={phase} />

                    {/* ── Rocket Animation ── */}
                    <RocketShip progress={progress} phase={phase} />

                    {/* ── Accretion Disk / Nebula Glow (BG) ── */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            className="absolute rounded-full"
                            style={{
                                width: 800,
                                height: 800,
                                background: 'radial-gradient(ellipse, transparent 42%, rgba(255,51,102,0.06) 60%, rgba(100,0,200,0.1) 75%, transparent 90%)',
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.div
                            style={{
                                width: 550,
                                height: 200,
                                borderRadius: '50%',
                                background: 'radial-gradient(ellipse, rgba(255,145,0,0.15) 0%, rgba(255,51,102,0.08) 50%, transparent 80%)',
                                filter: 'blur(40px)',
                            }}
                            animate={{ scaleX: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.div
                            style={{
                                width: 240,
                                height: 240,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(0,229,255,0.4) 0%, rgba(0,100,200,0.2) 50%, transparent 80%)',
                                filter: 'blur(30px)',
                            }}
                            animate={{ 
                                opacity: phase === 'loaded' ? [0.6, 1.4, 0.6] : [0.5, 1, 0.5], 
                                scale: phase === 'loaded' ? [1, 1.5, 1] : [0.9, 1.1, 0.9] 
                            }}
                            transition={{ duration: phase === 'loaded' ? 1.2 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>

                    {/* ── Orbital SVG Rings ── */}
                    <motion.div
                        className="absolute flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <svg width="340" height="340" viewBox="0 0 340 340">
                            <ellipse cx="170" cy="170" rx="150" ry="55" fill="none" stroke="url(#diskGrad)" strokeWidth="1" opacity="0.4" className="splash-orbit" />
                            <ellipse cx="170" cy="170" rx="110" ry="38" fill="none" stroke="#FF3366" strokeWidth="0.5" strokeDasharray="4 12" opacity="0.25" className="splash-orbit-slow" />
                            <circle cx="170" cy="170" r="60" fill="none" stroke="#00E5FF" strokeWidth="0.4" strokeDasharray="3 8" opacity="0.2" className="splash-orbit-rev" />
                            <circle cx="170" cy="170" r="10" fill="black" />
                            <circle cx="170" cy="170" r="8" fill="url(#coreGrad)" opacity="0.9" />
                            <circle cx="170" cy="170" r="4" fill="#00E5FF" opacity="1" />
                            <defs>
                                <linearGradient id="diskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FF3366" stopOpacity="0.6" />
                                    <stop offset="50%" stopColor="#FF9100" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#FF3366" stopOpacity="0.6" />
                                </linearGradient>
                                <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.3" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </motion.div>

                    {/* ── Content ── */}
                    <motion.div 
                        className="relative z-10 flex flex-col items-center"
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                    >
                        {/* Name */}
                        <div className="flex gap-0 mb-3 overflow-hidden">
                            {NAME.split('').map((letter, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: 70, opacity: 0, filter: 'blur(10px)' }}
                                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                    transition={{
                                        delay: 0.4 + i * 0.07,
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white splash-letter"
                                    style={{ textShadow: '0 0 60px rgba(0,229,255,0.2)' }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* Role */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.5 }}
                            className="flex items-center mb-10"
                        >
                            <span className="text-sm md:text-base tracking-[0.35em] uppercase text-[#00E5FF]/60 font-body font-light">
                                {typedRole}
                            </span>
                            <span
                                className="text-sm md:text-base text-[#00E5FF] ml-[2px] transition-opacity"
                                style={{ opacity: showCursor ? 1 : 0 }}
                            >
                                |
                            </span>
                        </motion.div>

                        {/* Progress */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.6 }}
                            className="flex flex-col items-center gap-4 w-64"
                        >
                            <div className="w-full h-[1.5px] bg-white/[0.07] rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, #00E5FF, #FF9100, #FF3366)',
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                />
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <span className="font-mono text-[10px] text-white/20 tracking-widest">
                                    {phase === 'loaded' ? '[ VOID_LOCKED ]' : '[ TRAJECTORY_STABLE ]'}
                                </span>
                                <span className="font-mono text-[10px] text-white/35 tabular-nums">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                        </motion.div>

                        {/* "Entering" pulse */}
                        <AnimatePresence>
                            {(phase === 'loaded' || progress >= 100) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="mt-8"
                                >
                                    <motion.span
                                        animate={{ opacity: [0.4, 1.0, 0.4] }}
                                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                        className="text-xs tracking-[0.4em] uppercase text-[#FF9100] font-body font-bold"
                                    >
                                        Approaching Event Horizon
                                    </motion.span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Brackets */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 1 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="absolute top-6 left-6"><div className="w-8 h-[1px] bg-white/10" /><div className="w-[1px] h-8 bg-white/10 mt-0" /></div>
                        <div className="absolute top-6 right-6 flex flex-col items-end"><div className="w-8 h-[1px] bg-white/10" /><div className="w-[1px] h-8 bg-white/10 self-end" /></div>
                        <div className="absolute bottom-6 left-6 flex flex-col justify-end"><div className="w-[1px] h-8 bg-white/10" /><div className="w-8 h-[1px] bg-white/10" /></div>
                        <div className="absolute bottom-6 right-6 flex flex-col items-end justify-end"><div className="w-[1px] h-8 bg-white/10 self-end" /><div className="w-8 h-[1px] bg-white/10" /></div>
                    </motion.div>

                    {/* Status */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.8 }}
                        className="absolute bottom-8 font-mono text-[9px] text-white/12 tracking-[0.3em]"
                    >
                        MISSION.VOID // ACTIVE // {new Date().getFullYear()}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
