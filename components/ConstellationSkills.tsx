'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// The nodes
const nodes = [
    { id: 'next', label: 'Next.js', x: 200, y: 50, level: 90 },
    { id: 'ts', label: 'TypeScript', x: 320, y: 120, level: 85 },
    { id: 'react', label: 'React', x: 80, y: 120, level: 92 },
    { id: 'py', label: 'Python', x: 120, y: 240, level: 88 },
    { id: 'ai', label: 'AI/ML', x: 280, y: 240, level: 80 },
    { id: 'framer', label: 'Framer', x: 200, y: 300, level: 85 },
];

// The connections (edges)
const edges = [
    { source: 'react', target: 'next' },
    { source: 'next', target: 'ts' },
    { source: 'react', target: 'ts' },
    { source: 'react', target: 'py' },
    { source: 'ts', target: 'ai' },
    { source: 'py', target: 'framer' },
    { source: 'ai', target: 'framer' },
    { source: 'py', target: 'next' },
    { source: 'ai', target: 'next' },
];

export default function ConstellationSkills() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    return (
        <div className="relative w-full aspect-square md:aspect-auto md:h-[400px] bg-black/40 rounded-3xl border border-white/[0.06] backdrop-blur-xl overflow-hidden group flex items-center justify-center">
            
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-[#FF9100]/5 opacity-50 pointer-events-none transition-opacity duration-700 group-hover:opacity-100" />
            
            <svg 
                viewBox="0 0 400 350" 
                className="w-full h-full max-w-[400px] overflow-visible"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0,229,255,0.1))' }}
            >
                {/* Edges */}
                {edges.map((edge, i) => {
                    const sourceNode = nodes.find(n => n.id === edge.source)!;
                    const targetNode = nodes.find(n => n.id === edge.target)!;
                    
                    const isHovered = hoveredNode === sourceNode.id || hoveredNode === targetNode.id;
                    const isFaded = hoveredNode && !isHovered;

                    return (
                        <g key={`edge-${i}`}>
                            {/* Base Line */}
                            <motion.line
                                x1={sourceNode.x}
                                y1={sourceNode.y}
                                x2={targetNode.x}
                                y2={targetNode.y}
                                stroke="url(#edge-gradient)"
                                strokeWidth="1"
                                className={`transition-opacity duration-500 ease-in-out ${isFaded ? 'opacity-10' : (isHovered ? 'opacity-100' : 'opacity-30')}`}
                            />
                            {/* Data Flow Line */}
                            <motion.line
                                x1={sourceNode.x}
                                y1={sourceNode.y}
                                x2={targetNode.x}
                                y2={targetNode.y}
                                stroke="#00E5FF"
                                strokeWidth="1.5"
                                strokeDasharray="4 20"
                                initial={{ strokeDashoffset: 0 }}
                                animate={{ strokeDashoffset: -24 }}
                                transition={{ duration: 1.5 + (i * 0.2), repeat: Infinity, ease: 'linear' }}
                                className={`transition-opacity duration-500 ease-in-out ${isFaded ? 'opacity-0' : (isHovered ? 'opacity-100' : 'opacity-[0.15]')}`}
                            />
                        </g>
                    );
                })}

                {/* Nodes */}
                {nodes.map((node, i) => {
                    const isHovered = hoveredNode === node.id;
                    const isFaded = hoveredNode && !isHovered;
                    
                    // Simple offset for a floating effect
                    const driftY = i % 2 === 0 ? [0, -5, 0] : [0, 5, 0];

                    return (
                        <motion.g
                            key={node.id}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            animate={{ y: driftY }}
                            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                            className={`cursor-crosshair transition-opacity duration-500 ${isFaded ? 'opacity-20' : 'opacity-100'}`}
                            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                        >
                            {/* Outer Glow Halo */}
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r={isHovered ? 24 : 16}
                                fill="url(#node-glow)"
                                className="transition-all duration-300"
                            />
                            
                            {/* Core Star */}
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={isHovered ? 6 : 4}
                                fill="#fff"
                                className="transition-all duration-300"
                            />

                            {/* Outer Ring representing skill level */}
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r={isHovered ? 14 : 10}
                                fill="none"
                                stroke={isHovered ? "#FF9100" : "#00E5FF"}
                                strokeWidth="1.5"
                                strokeDasharray={`${(node.level / 100) * (2 * Math.PI * (isHovered ? 14 : 10))} 1000`}
                                strokeDashoffset={25}
                                className="transition-all duration-500 origin-center -rotate-90 origin-[cx_cy]"
                            />

                            {/* Label */}
                            <text
                                x={node.x}
                                y={node.y + 35}
                                textAnchor="middle"
                                fill="white"
                                className={`text-[10px] font-display font-medium tracking-widest uppercase transition-all duration-300 ${isHovered ? 'opacity-100 fill-[#FF9100]' : 'opacity-60'}`}
                                style={{ textShadow: isHovered ? '0 0 10px rgba(255, 145, 0, 0.8)' : 'none' }}
                            >
                                {node.label}
                            </text>
                            
                            {/* Hover info */}
                            {isHovered && (
                                <text
                                    x={node.x}
                                    y={node.y + 50}
                                    textAnchor="middle"
                                    fill="#00E5FF"
                                    className="text-[8px] font-body tracking-wider"
                                >
                                    PROFICIENCY: {node.level}%
                                </text>
                            )}
                        </motion.g>
                    );
                })}

                <defs>
                    <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
                        <stop offset="100%" stopColor="#FF9100" stopOpacity="0.5" />
                    </linearGradient>
                    <radialGradient id="node-glow">
                        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>
            
            <div className="absolute bottom-4 left-6 pointer-events-none">
                <span className="text-[9px] text-white/30 tracking-[0.2em] uppercase font-body">Neural Net Protocol v1.4</span>
            </div>
            
            {/* The interactive indicator */}
            <div className="absolute top-4 right-4 flex gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
                </span>
            </div>
        </div>
    );
}
