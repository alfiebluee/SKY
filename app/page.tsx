"use client";

import { useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { MOCK_INCIDENTS } from "@/data/mockData";
import { FeedCard } from "@/components/FeedCard";
import { ImpactTray } from "@/components/ImpactTray";
import { NewsTicker } from "@/components/NewsTicker";
import { StatusBar } from "@/components/StatusBar";
import { useRedMode } from "@/context/RedModeContext";
import { MapCanvasHandle } from "@/components/MapCanvas";
import { motion } from "framer-motion";

// Dynamically import map to avoid SSR issues with mapbox-gl
const MapCanvas = dynamic(() => import("@/components/MapCanvas"), { ssr: false });

export default function DashboardPage() {
    const { redMode } = useRedMode();
    const mapRef = useRef<MapCanvasHandle>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleFlyTo = useCallback((lat: number, lng: number) => {
        mapRef.current?.flyTo(lat, lng);
    }, []);

    const handleSelectIncident = useCallback((id: string) => {
        setSelectedId(id);
    }, []);

    return (
        <div
            className={`h-screen flex flex-col bg-void overflow-hidden transition-all duration-500
        ${redMode ? "ring-1 ring-inset ring-magma/30" : ""}`}
        >
            {/* Top bar */}
            <StatusBar />

            {/* Bento body */}
            <div className="flex flex-1 overflow-hidden gap-2 p-2">

                {/* Pane B — Story Pulse (30% left) */}
                <div className="w-[30%] min-w-[280px] flex flex-col gap-2 overflow-hidden">
                    {/* Label */}
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-1 h-1 rounded-full bg-cyan animate-pulse" />
                        <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/30 font-bold">
                            Story Pulse
                        </span>
                        <span className="text-[9px] font-mono text-white/15 ml-auto">
                            {MOCK_INCIDENTS.length} incidents
                        </span>
                    </div>

                    {/* Scrollable feed */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                        {MOCK_INCIDENTS.map(incident => (
                            <FeedCard
                                key={incident.id}
                                incident={incident}
                                onFlyTo={handleFlyTo}
                                isSelected={selectedId === incident.id}
                                onClick={() => handleSelectIncident(incident.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right column — Map + Impact Tray */}
                <div className="flex-1 flex flex-col gap-2 min-w-0">

                    {/* Pane A — Live Canvas (70% map) */}
                    <div className="flex-1 relative glass-card overflow-hidden min-h-0">
                        {/* Map label overlay */}
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 glass-card px-2.5 py-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${redMode ? "bg-magma animate-pulse" : "bg-cyan"}`} />
                            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/50 font-bold">
                                Live Canvas
                            </span>
                        </div>
                        {/* Active incident count */}
                        <div className="absolute top-3 right-3 z-10 glass-card px-2.5 py-1.5 flex items-center gap-2">
                            <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">Active</span>
                            <span className="text-xs font-mono font-bold text-magma">
                                {MOCK_INCIDENTS.filter(i => i.live).length}
                            </span>
                        </div>

                        <MapCanvas
                            ref={mapRef}
                            selectedId={selectedId}
                            onMarkerClick={handleSelectIncident}
                        />
                    </div>

                    {/* Pane C — Human Impact Tray */}
                    <div className="shrink-0">
                        <div className="flex items-center gap-2 px-1 mb-1.5">
                            <div className="w-1 h-1 rounded-full bg-magma" />
                            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/30 font-bold">
                                Human Impact Tray
                            </span>
                        </div>
                        <ImpactTray />
                    </div>
                </div>
            </div>

            {/* News Ticker */}
            <NewsTicker />
        </div>
    );
}
