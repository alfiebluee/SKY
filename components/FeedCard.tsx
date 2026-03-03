"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ExternalLink, MapPin, Radio, Clock, ChevronRight } from "lucide-react";
import { Incident } from "@/data/mockData";
import { useRedMode } from "@/context/RedModeContext";

const ACCENT_CLASSES = {
    magma: "bg-magma shadow-[0_0_8px_#FF6600]",
    amber: "bg-amber shadow-[0_0_8px_#FFB800]",
    cyan: "bg-cyan shadow-[0_0_8px_#00F0FF]",
};

const TEXT_CLASSES = {
    magma: "text-magma",
    amber: "text-amber",
    cyan: "text-cyan",
};

interface FeedCardProps {
    incident: Incident;
    onFlyTo: (lat: number, lng: number) => void;
    isSelected: boolean;
    onClick: () => void;
}

export function FeedCard({ incident, onFlyTo, isSelected, onClick }: FeedCardProps) {
    const { redMode } = useRedMode();
    const accentClass = ACCENT_CLASSES[incident.severity] || ACCENT_CLASSES.cyan;
    const textClass = TEXT_CLASSES[incident.severity] || TEXT_CLASSES.cyan;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            onClick={onClick}
            className={`relative glass-card active:scale-[0.99] group overflow-hidden border-l-0 cursor-pointer
          ${isSelected ? 'bg-white/[0.08] border-white/20' : ''}
          ${redMode && incident.live ? 'ring-1 ring-inset ring-magma/30 shadow-[0_0_15px_rgba(255,102,0,0.1)]' : ''}
          transition-all duration-300
        `}
        >
            {/* Vertical Progress Accent Strip */}
            <div className={`absolute top-0 left-0 bottom-0 w-[3px] z-10 ${accentClass}`} />

            <div className="p-4 space-y-4">
                {/* Header: Source + Time */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] ${textClass}`}>
                            {incident.source}
                        </span>
                        {incident.verified && (
                            <Shield size={10} className="text-amber/80" />
                        )}
                        {incident.live && (
                            <div className="flex items-center gap-1 bg-magma/20 px-1.5 py-0.5 rounded-[1px] border border-magma/30 animate-pulse">
                                <span className="w-1 h-1 rounded-full bg-magma" />
                                <span className="text-[8px] font-mono font-bold text-magma tracking-tighter">LIVE FEED</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/25 uppercase tabular-nums">
                        <Clock size={10} />
                        {incident.timestamp}
                    </div>
                </div>

                {/* Title + Meta */}
                <div className="space-y-2">
                    <h3 className="text-[14px] font-bold text-white leading-[1.3] tracking-tight group-hover:text-cyan transition-colors">
                        {incident.title}
                    </h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono tracking-wider">
                            <MapPin size={10} className="opacity-50" />
                            {incident.location.label}
                        </div>
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] ${textClass}`}>
                            {incident.type}
                        </span>
                    </div>
                </div>

                {/* Summary (More compact) */}
                <p className="text-[11px] text-white/45 leading-[1.5] line-clamp-2 font-medium">
                    {incident.summary}
                </p>

                {/* Footer: Human Impact Visualization (Mini) */}
                <div className="pt-3 flex items-center justify-between border-t border-white/5 mt-1">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[7px] font-mono text-white/15 uppercase tracking-widest">Casualties</span>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-mono font-bold text-magma/70">{incident.fatalities} KIA</span>
                                <span className="text-[10px] font-mono font-bold text-amber/70">{incident.injuries} WIA</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-white/30 group-hover:text-cyan transition-colors">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Details</span>
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
