"use client";

import { SUMMARY_STATS } from "@/data/mockData";
import { motion } from "framer-motion";
import { useRedMode } from "@/context/RedModeContext";

function HeartbeatLine() {
    const path = "M0,20 L30,20 L40,5 L50,35 L60,20 L70,20 L80,8 L90,32 L100,20 L130,20 L140,2 L150,38 L160,20 L200,20";

    return (
        <div className="w-full overflow-hidden h-10 relative">
            <svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none" className="opacity-60">
                <motion.path
                    d={path}
                    fill="none"
                    stroke="#FF6600"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 0.5 }}
                />
                {/* Dimmer repeat for ambient glow */}
                <path d={path} fill="none" stroke="#FF6600" strokeWidth="4" strokeLinecap="round" opacity="0.07" />
            </svg>
        </div>
    );
}

function SilhouetteBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
    const pct = Math.min((value / max) * 100, 100);
    const count = Math.round(pct / 10); // 0-10 filled blocks
    const blocks = Array.from({ length: 10 });

    return (
        <div className="flex-1 space-y-2 min-w-0">
            <div className="flex justify-between items-baseline">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">{label}</span>
                <span className={`text-xs font-mono font-bold`} style={{ color }}>{value.toLocaleString()}</span>
            </div>
            <div className="flex gap-0.5">
                {blocks.map((_, i) => (
                    <div
                        key={i}
                        className="h-5 w-2 rounded-sm transition-all duration-500"
                        style={{
                            background: i < count ? color : "rgba(255,255,255,0.05)",
                            opacity: i < count ? (1 - (i / count) * 0.3) : 1,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export function ImpactTray() {
    const { redMode } = useRedMode();

    return (
        <div className={`glass-card p-4 space-y-4 ${redMode ? "red-mode-border" : ""}`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-magma animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 font-bold">
                        Human Impact — Regional Overview
                    </span>
                </div>
                <span className="text-[9px] font-mono text-white/20">Updated 22:14 UTC</span>
            </div>

            {/* Heartbeat line */}
            <HeartbeatLine />

            {/* Stats grid */}
            <div className="flex gap-6 flex-wrap">
                <SilhouetteBar label="Total Fatalities" value={SUMMARY_STATS.totalCasualties} max={50000} color="#FF6600" />
                <SilhouetteBar label="Injured" value={SUMMARY_STATS.totalInjured} max={100000} color="#FFB800" />
                <SilhouetteBar label="Displaced" value={SUMMARY_STATS.totalDisplaced} max={2000000} color="#00F0FF" />
            </div>

            {/* Quick counters */}
            <div className="flex gap-6 pt-1">
                {[
                    { label: "Active Fronts", value: SUMMARY_STATS.activeFronts, color: "text-[#FF6600]" },
                    { label: "Alerts Today", value: SUMMARY_STATS.alertsToday, color: "text-[#FFB800]" },
                    { label: "Interceptions", value: SUMMARY_STATS.interceptionsToday, color: "text-[#00F0FF]" },
                ].map(stat => (
                    <div key={stat.label} className="flex flex-col gap-0.5">
                        <span className={`text-lg font-mono font-bold ${stat.color}`}>{stat.value}</span>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/30">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
