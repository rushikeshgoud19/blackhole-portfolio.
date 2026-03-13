'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMemo, useState, useEffect, useRef } from 'react';

interface Node {
    id: number;
    x: number;
    y: number;
    targetX?: number; // Logical target coordinate
    targetY?: number;
    size: number;
    delay: number;
    speed: number;
    parallaxFactor: number;
    label?: string;
    isAnchored: boolean;
}

interface DataPacket {
    from: number;
    to: number;
    progress: number;
    speed: number;
}

interface BinaryParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    char: string;
    life: number;
    opacity: number;
}

interface NeuralBackgroundProps {
    color?: string;
    nodeCount?: number;
    lineProbability?: number;
    label?: string;
    scanningLabel?: string;
    className?: string;
    skillNodes?: string[];
    anchors?: { x: number, y: number, label: string }[]; // Coordinate anchors for linking
    interactive?: boolean;
}

export default function NeuralBackground({
    color = '#00E5FF',
    nodeCount = 20,
    lineProbability = 0.25,
    label = 'Neural Net Protocol V2.8 // LINK_SYNC',
    scanningLabel = 'ESTABLISHING_DATA_ANCHORS...',
    className = '',
    skillNodes = [],
    anchors = [],
    interactive = true
}: NeuralBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);
    
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });

    useEffect(() => {
        if (!interactive) return;
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set(e.clientX / innerWidth);
            mouseY.set(e.clientY / innerHeight);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, interactive]);

    const elements = useMemo(() => {
        const nodes: Node[] = [];
        
        // Match skillNodes to anchors or generate random targets
        skillNodes.forEach((name, i) => {
            const anchor = anchors.find(a => a.label.toLowerCase() === name.toLowerCase());
            nodes.push({
                id: i,
                x: anchor ? anchor.x : 20 + Math.random() * 60,
                y: anchor ? anchor.y : 20 + Math.random() * 60,
                targetX: anchor?.x,
                targetY: anchor?.y,
                size: 4 + Math.random() * 2,
                delay: Math.random() * 2,
                speed: 0.2 + Math.random() * 0.5,
                parallaxFactor: anchor ? 0 : 8 + Math.random() * 12, // Anchored nodes don't parallax
                label: name,
                isAnchored: !!anchor
            });
        });

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                id: i + skillNodes.length,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: 1 + Math.random() * 2.5,
                delay: Math.random() * 2,
                speed: 0.5 + Math.random() * 1.5,
                parallaxFactor: 2 + Math.random() * 6,
                isAnchored: false
            });
        }

        const lines: { from: number; to: number; opacity: number }[] = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                if (dist < 25 && Math.random() < lineProbability) {
                    lines.push({ from: i, to: j, opacity: 0.05 + Math.random() * 0.15 });
                }
            }
        }
        return { nodes, lines };
    }, [nodeCount, skillNodes, lineProbability, anchors]);

    useEffect(() => {
        if (!mounted || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;
        const dataPackets: DataPacket[] = [];
        const binaryParticles: BinaryParticle[] = [];

        const render = () => {
            time += 0.01;
            const { width, height } = canvas.getBoundingClientRect();
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            ctx.clearRect(0, 0, width, height);

            const mx = smoothMouseX.get() - 0.5;
            const my = smoothMouseY.get() - 0.5;
            const mouseScreenX = (smoothMouseX.get()) * width;
            const mouseScreenY = (smoothMouseY.get()) * height;

            // Update Data Packets
            if (Math.random() < 0.05 && elements.lines.length > 0) {
                const line = elements.lines[Math.floor(Math.random() * elements.lines.length)];
                dataPackets.push({ from: line.from, to: line.to, progress: 0, speed: 0.01 + Math.random() * 0.02 });
            }

            // Draw Lines
            ctx.lineWidth = 0.5;
            elements.lines.forEach(line => {
                const from = elements.nodes[line.from];
                const to = elements.nodes[line.to];
                
                const fx = (from.x / 100) * width + mx * from.parallaxFactor;
                const fy = (from.y / 100) * height + my * from.parallaxFactor;
                const tx = (to.x / 100) * width + mx * to.parallaxFactor;
                const ty = (to.y / 100) * height + my * to.parallaxFactor;

                ctx.beginPath();
                ctx.moveTo(fx, fy);
                ctx.lineTo(tx, ty);
                ctx.strokeStyle = `${color}${Math.floor(line.opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.stroke();
            });

            // Draw Data Packets
            dataPackets.forEach((packet, i) => {
                const from = elements.nodes[packet.from];
                const to = elements.nodes[packet.to];
                const fx = (from.x / 100) * width + mx * from.parallaxFactor;
                const fy = (from.y / 100) * height + my * from.parallaxFactor;
                const tx = (to.x / 100) * width + mx * to.parallaxFactor;
                const ty = (to.y / 100) * height + my * to.parallaxFactor;

                const px = fx + (tx - fx) * packet.progress;
                const py = fy + (ty - fy) * packet.progress;

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(px, py, 1.2, 0, Math.PI * 2);
                ctx.fill();
                
                packet.progress += packet.speed;
                if (packet.progress >= 1) dataPackets.splice(i, 1);
            });

            // Draw Nodes & Particles
            elements.nodes.forEach(node => {
                const px = (node.x / 100) * width + mx * node.parallaxFactor;
                const py = (node.y / 100) * height + my * node.parallaxFactor;
                const pulse = (Math.sin(time * node.speed + node.delay * 10) + 1) / 2;

                // Subtle link for anchored nodes
                if (node.isAnchored) {
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(px, height);
                    ctx.strokeStyle = `${color}22`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }

                // Node Glow
                const gradient = ctx.createRadialGradient(px, py, 0, px, py, node.size * 4 * (1 + pulse * 0.5));
                gradient.addColorStop(0, `${color}${Math.floor(0.4 * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(1, `${color}00`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(px, py, node.size * 6, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.8;
                ctx.beginPath();
                ctx.arc(px, py, node.size / 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;

                if (node.label) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.font = '700 9px "JetBrains Mono", monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText(node.label.toUpperCase(), px, py + node.size + 15);
                }
                
                // Binary leakage - Subtle
                const distToMouse = Math.hypot(px - mouseScreenX, py - mouseScreenY);
                if (distToMouse < 60 && Math.random() < 0.1) {
                    binaryParticles.push({
                        x: px, y: py,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2 - 1,
                        char: Math.random() > 0.5 ? '1' : '0',
                        life: 1,
                        opacity: 0.5
                    });
                }
            });

            // Clean & Draw Binary Particles
            ctx.font = '7px "JetBrains Mono", monospace';
            binaryParticles.forEach((p, i) => {
                ctx.fillStyle = `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.fillText(p.char, p.x, p.y);
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                p.opacity = p.life * 0.5;
                if (p.life <= 0) binaryParticles.splice(i, 1);
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [mounted, elements, color, smoothMouseX, smoothMouseY]);

    if (!mounted) return null;

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <canvas 
                ref={canvasRef}
                className="w-full h-full opacity-80"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.15))' }}
            />

            <motion.div 
                className="absolute inset-x-0 h-[2px] z-[70] pointer-events-none"
                style={{ 
                    background: `linear-gradient(to right, transparent, ${color}33, ${color}, ${color}33, transparent)`,
                    boxShadow: `0 0 25px 3px ${color}55`
                }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            <div className="absolute inset-0 flex flex-col justify-between p-10 opacity-60 z-[65]">
                <div className="flex justify-between items-start">
                    <div className="font-mono text-[10px] tracking-[0.5em] flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse shadow-[0_0_10px_current]" />
                        {scanningLabel}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="font-mono text-[9px] tracking-[0.3em] opacity-80">CONNECTION: SECURE</div>
                        <div className="font-mono text-[11px] tracking-[0.4em] font-bold text-white pr-5 border-r-4 border-current">
                            LINK_STABILITY: 99.8% {'//'} SYNC_OK
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-between items-end">
                    <div className="font-mono text-[11px] tracking-[0.6em] uppercase font-black text-white flex flex-col gap-2">
                        <div className="h-[2px] w-24 bg-current mb-3" />
                        {label}
                    </div>
                    <div className="font-mono text-[9px] opacity-90 max-w-[200px] text-right space-y-2">
                        <div className="bg-white/5 px-2 py-1 border border-white/10 italic">0x_LINK_SYSTEM_ACTIVE</div>
                        <div className="text-[7px] tracking-[0.4em] opacity-50 font-bold">FOREGROUND_SYNC_LAYER_4.1</div>
                    </div>
                </div>
            </div>
        </div>
    );
}



