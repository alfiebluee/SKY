"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ExternalLink, MapPin, Radio } from "lucide-react";
import { Incident } from "@/data/mockData";
import { useRedMode } from "@/context/RedModeContext";
import Image from "next/image";

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

function CountdownTimer({ seconds }: { seconds: number }) {
    const [remaining, setRemaining] = useState(seconds);

    useEffect(() => {
        const t = setInterval(() => setRemaining(s => (s > 0 ? s - 1 : seconds)), 1000);
        return () => clearInterval(t);
    }, [seconds]);

    const pct = ((seconds - remaining) / seconds) * 100;

    return (
        <div className="flex items-center gap-3 bg-magma/10 border border-magma/30 rounded-sm px-3 py-2 mt-2">
            <div className="relative w-8 h-8 shrink-0">
                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,102,0,0.15)" strokeWidth="1.5" />
                    <circle
                        cx="16" cy="16" r="14" fill="none" stroke="#FF6600" strokeWidth="1.5"
                        strokeDasharray={`${88}`}
                        strokeDashoffset={`${88 * (pct / 100)}`}
                        strokeLinecap="square"
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-magma">
                    {remaining}
                </span>
            </div>
            <div>
                <p className="text-[10px] font-mono text-magma uppercase tracking-[0.2em] font-bold">TAKEOVER SECONDS</p>
                <p className="text-[9px] text-magma/60 font-mono tracking-wider">Estimated Impact {remaining}s</p>
            </div>
        </div>
    );
}

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

    function handleClick() {
        onClick();
        onFlyTo(incident.location.lat, incident.location.lng);
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            onClick={handleClick}
            className={`relative glass-card active:scale-[0.99] group overflow-hidden border-l-0
          ${isSelected ? 'bg-white/[0.08] border-white/20' : ''}
          ${redMode && incident.live ? 'ring-1 ring-inset ring-magma/30' : ''}
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
                            <div className="flex items-center gap-1 bg-magma/20 px-1.5 py-0.5 rounded-[1px] border border-magma/30">
                                <span className="w-1 h-1 rounded-full bg-magma animate-pulse" />
                                <span className="text-[8px] font-mono font-bold text-magma tracking-tighter">LIVE</span>
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] font-mono text-white/25 uppercase tabular-nums">{incident.timestamp}</span>
                </div>

                {/* Title + Meta */}
                <div className="space-y-1.5">
                    <h3 className="text-[13px] font-bold text-white leading-[1.4] tracking-tight group-hover:text-cyan transition-colors">
                        {incident.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono tracking-wider">
                        <MapPin size={10} className="opacity-50" />
                        {incident.location.label}
                    </div>
                </div>

                {/* Content: Image (Optional/Minimal) */}
                {incident.media.type === 'image' && (
                    <div className="relative h-28 w-full overflow-hidden rounded-[1px] opacity-40 group-hover:opacity-70 transition-opacity grayscale hover:grayscale-0">
                        <Image
                            src={incident.media.src}
                            alt={incident.title}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
                    </div>
                )}

                {/* Summary */}
                <p className="text-[11px] text-white/50 leading-[1.6] line-clamp-3 font-medium">
                    {incident.summary}
                </p>

                {/* Technical Overlay Features */}
                {incident.countdown && incident.live && (
                    <CountdownTimer seconds={incident.countdown} />
                )}

                {/* Footer Action */}
                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[8px] font-mono text-white/20 uppercase">Confidence</span>
                            <span className={`text-[10px] font-mono font-bold ${textClass} uppercase tracking-widest`}>
                                {incident.severity === 'magma' ? 'High' : incident.severity === 'amber' ? 'Moderate' : 'Verified'}
                            </span>
                        </div>
                    </div>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-sm border border-white/5 text-white/40 hover:text-cyan transition-colors">
                        <ExternalLink size={12} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
