"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { MOCK_INCIDENTS, Incident } from "@/data/mockData";
import { FeedCard } from "@/components/FeedCard";
import { ImpactTray } from "@/components/ImpactTray";
import { NewsTicker } from "@/components/NewsTicker";
import { StatusBar } from "@/components/StatusBar";
import { IncidentDetail } from "@/components/IncidentDetail";
import { EmergencyTakeover } from "@/components/EmergencyTakeover";
import { useRedMode } from "@/context/RedModeContext";
import { MapCanvasHandle } from "@/components/MapCanvas";

// Dynamically import map to avoid SSR issues with mapbox-gl
const MapCanvas = dynamic(() => import("@/components/MapCanvas"), { ssr: false });

export default function DashboardPage() {
    const { redMode } = useRedMode();
    const mapRef = useRef<MapCanvasHandle>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // Active Red Alert state (Simulation)
    const [activeAlert, setActiveAlert] = useState<Incident | null>(null);

    // Initial check for a live alert with a countdown
    useEffect(() => {
        const liveAlert = MOCK_INCIDENTS.find(inc => inc.live && inc.countdown);
        if (liveAlert && redMode) {
            setActiveAlert(liveAlert);
        } else {
            setActiveAlert(null);
        }
    }, [redMode]);

    const handleFlyTo = useCallback((lat: number, lng: number) => {
        mapRef.current?.flyTo(lat, lng);
    }, []);

    const handleSelectIncident = useCallback((id: string) => {
        const incident = MOCK_INCIDENTS.find(inc => inc.id === id);
        if (incident) {
            setSelectedId(id);
            setIsDetailOpen(true);
            handleFlyTo(incident.location.lat, incident.location.lng);
        }
    }, [handleFlyTo]);

    const selectedIncident = MOCK_INCIDENTS.find(inc => inc.id === selectedId) || null;

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
                <div className="w-[30%] min-w-[320px] max-w-[400px] flex flex-col gap-2 overflow-hidden">
                    {/* Label */}
                    <div className="flex items-center gap-2 px-1 mb-1">
                        <div className="w-1 h-1 rounded-full bg-cyan animate-pulse" />
                        <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/30 font-bold">
                            Story Pulse Feed
                        </span>
                        <div className="h-px flex-1 bg-white/5 ml-2" />
                        <span className="text-[9px] font-mono text-white/15 ml-auto uppercase tracking-widest">
                            {MOCK_INCIDENTS.length} Intel Targets
                        </span>
                    </div>

                    {/* Scrollable feed */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
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

                    {/* Pane A — Live Map (Top) */}
                    <div className="flex-[3] relative glass-card overflow-hidden min-h-0 border-white/5">
                        {/* Map label overlay */}
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2.5 glass-card px-3 py-2 bg-void/80 backdrop-blur-md border border-white/10">
                            <div className={`w-1.5 h-1.5 rounded-full ${redMode ? "bg-magma shadow-[0_0_8px_#FF6600] animate-pulse" : "bg-cyan shadow-[0_0_8px_#00F0FF]"}`} />
                            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/60 font-bold">
                                Live Area Canvas
                            </span>
                        </div>

                        {/* Active incident count indicator */}
                        <div className="absolute top-4 right-4 z-10 glass-card px-3 py-2 flex items-center gap-3 bg-void/80 backdrop-blur-md border border-white/10">
                            <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] font-bold">Priority Alerts</span>
                            <div className="w-px h-3 bg-white/10" />
                            <span className="text-xs font-mono font-bold text-magma">
                                {MOCK_INCIDENTS.filter(i => i.severity === 'magma').length}
                            </span>
                        </div>

                        <MapCanvas
                            ref={mapRef}
                            selectedId={selectedId}
                            onMarkerClick={handleSelectIncident}
                        />
                    </div>

                    {/* Pane C — Regional Stats (Bottom) */}
                    <div className="flex-1 shrink-0 max-h-[30%]">
                        <div className="flex items-center gap-2 px-1 mb-2">
                            <div className="w-1 h-1 rounded-full bg-magma" />
                            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/30 font-bold">
                                Human Impact Summary
                            </span>
                            <div className="h-px flex-1 bg-white/5 ml-2" />
                        </div>
                        <ImpactTray />
                    </div>
                </div>
            </div>

            {/* News Ticker */}
            <NewsTicker />

            {/* Red Alert Takeover Overlay */}
            <EmergencyTakeover
                activeAlert={activeAlert}
                onDismiss={() => setActiveAlert(null)}
            />

            {/* Drill-down Detail Panel */}
            <IncidentDetail
                incident={selectedIncident}
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
            />
        </div>
    );
}
