"use client";

import { useRedMode } from "@/context/RedModeContext";
import { MOCK_NEWS_ITEMS } from "@/data/mockData";

export function NewsTicker() {
    const { redMode } = useRedMode();
    const doubled = [...MOCK_NEWS_ITEMS, ...MOCK_NEWS_ITEMS]; // Seamless loop

    return (
        <div
            className={`h-8 border-t border-white/5 bg-[#050505]/80 backdrop-blur-sm flex items-center overflow-hidden relative transition-all duration-500
        ${redMode ? "border-[#FF6600]/30" : ""}`}
        >
            {/* Label */}
            <div className={`shrink-0 px-3 border-r border-white/10 h-full flex items-center gap-2 z-10 bg-void
        ${redMode ? "border-magma/30" : ""}`}>
                <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${redMode ? "text-[#FF6600]" : "text-white/30"}`}>
                    LIVE FEED
                </span>
            </div>

            {/* Scrolling track */}
            <div className="overflow-hidden flex-1">
                <div
                    className="ticker-track"
                    style={{ animationDuration: redMode ? "30s" : "50s" }}
                >
                    {doubled.map((item, i) => (
                        <span
                            key={i}
                            className={`inline-flex items-center gap-2 px-6 text-[11px] font-mono transition-all duration-500
                ${redMode ? "text-white/90" : "text-white/40"}`}
                        >
                            <span className={`text-[9px] font-bold uppercase ${redMode ? "text-[#FF6600]" : "text-white/25"}`}>
                                {item.source}
                            </span>
                            {item.text}
                            <span className="text-white/10 mx-2">·</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Left fade */}
            <div className="absolute left-[80px] top-0 bottom-0 w-8 bg-gradient-to-r from-void to-transparent pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-void to-transparent pointer-events-none" />
        </div>
    );
}
