"use client";

import { useRedMode } from "@/context/RedModeContext";
import { AlertTriangle, Radio, Clock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

function LiveClock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toUTCString().slice(17, 25) + " UTC");
        };
        update();
        const t = setInterval(update, 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <span className="font-mono text-[11px] text-white/50 tabular-nums tracking-wider">{time}</span>
    );
}

export function StatusBar() {
    const { redMode, toggleRedMode } = useRedMode();

    return (
        <div
            className={`h-12 flex items-center justify-between px-6 border-b bg-void/95 backdrop-blur-xl transition-all duration-500 shrink-0 z-50
        ${redMode ? "border-magma/40 shadow-[0_0_20px_rgba(255,102,0,0.05)]" : "border-white/5"}`}
        >
            {/* Left: Branding */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${redMode ? "bg-magma shadow-[0_0_8px_#FF6600]" : "bg-cyan shadow-[0_0_8px_#00F0FF]"} animate-pulse`} />
                    <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold tracking-[0.4em] uppercase text-white leading-none">
                            SKY
                        </span>
                        <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em] mt-0.5">
                            Situational Awareness
                        </span>
                    </div>
                </div>

                <div className="w-px h-5 bg-white/10 mx-2" />

                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-sm border border-white/5">
                    <Radio size={12} className={redMode ? "text-magma" : "text-cyan opacity-80"} />
                    <span className={`text-[9px] font-mono uppercase tracking-[0.2em] font-bold ${redMode ? "text-magma" : "text-white/40"}`}>
                        {redMode ? "RED ALERT SYSTEM" : "Live Stream Active"}
                    </span>
                </div>
            </div>

            {/* Center: System Details */}
            <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Clock size={12} className="text-white/20" />
                    <LiveClock />
                </div>
                <div className="flex items-center gap-2 text-[9px] font-mono text-white/20 uppercase tracking-widest border-l border-white/5 pl-6">
                    <span className="text-white/40">Region</span>
                    <span className="text-white/70">Middle East / Levant</span>
                </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleRedMode}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-sm border text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]
                    ${redMode
                            ? "bg-magma/20 border-magma text-magma shadow-[0_0_15px_rgba(255,102,0,0.15)]"
                            : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white/80"
                        }`}
                >
                    <AlertTriangle size={12} />
                    {redMode ? "DEACTIVATE RED" : "Red Mode"}
                </button>

                <div className="w-px h-5 bg-white/10" />

                <div className="w-8 h-8 rounded-sm bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan cursor-help opacity-60 hover:opacity-100 transition-opacity">
                    <ShieldCheck size={16} />
                </div>
            </div>
        </div>
    );
}
