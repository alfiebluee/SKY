"use client";

import { useRef, useCallback, forwardRef, useImperativeHandle, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MOCK_INCIDENTS, Incident } from "@/data/mockData";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Dark monochromatic vector style
const MAP_STYLE = "mapbox://styles/mapbox/dark-v11";

function PulseMarker({ incident, onClick }: { incident: Incident; onClick: () => void }) {
    const colors = {
        magma: "#FF6600",
        amber: "#FFB800",
        cyan: "#00F0FF",
    };
    const color = colors[incident.severity] || colors.cyan;
    const pulseRgb = incident.severity === 'magma' ? '255, 102, 0' : incident.severity === 'amber' ? '255, 184, 0' : '0, 240, 255';

    return (
        <Marker
            longitude={incident.location.lng}
            latitude={incident.location.lat}
            anchor="center"
        >
            <div
                className="relative flex items-center justify-center cursor-pointer group"
                onClick={onClick}
                style={{ width: 14, height: 14, '--pulse-rgb': pulseRgb } as any}
            >
                {/* Outer Ring */}
                <div
                    className="absolute rounded-full border border-current opacity-30"
                    style={{
                        width: 14,
                        height: 14,
                        color: color,
                        animation: 'marker-pulse 2.8s ease-in-out infinite'
                    }}
                />
                {/* Inner Ring */}
                <div
                    className="absolute rounded-full border border-current opacity-20"
                    style={{
                        width: 22,
                        height: 22,
                        color: color,
                        animation: 'marker-pulse 2.8s ease-in-out infinite 0.4s'
                    }}
                />
                {/* Core dot */}
                <div
                    className="w-2.5 h-2.5 rounded-full z-10 relative"
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}`,
                    }}
                />
            </div>
        </Marker>
    );
}

export interface MapCanvasHandle {
    flyTo: (lat: number, lng: number) => void;
}

interface MapCanvasProps {
    selectedId: string | null;
    onMarkerClick: (id: string) => void;
}

const MapCanvas = forwardRef<MapCanvasHandle, MapCanvasProps>(
    function MapCanvas({ selectedId, onMarkerClick }, ref) {
        const mapRef = useRef<any>(null);

        useImperativeHandle(ref, () => ({
            flyTo(lat: number, lng: number) {
                mapRef.current?.flyTo({
                    center: [lng, lat],
                    zoom: 10,
                    duration: 2000,
                    essential: true,
                    curve: 1.42,
                    speed: 1.2
                });
            },
        }));

        const onMapLoad = useCallback((e: any) => {
            const map = e.target;

            // ─── Custom Neo-Futurist Wireframe Styling ─────────────────────────────
            // Set background to Void Black if exists
            if (map.getLayer('background')) {
                map.setPaintProperty('background', 'background-color', '#050505');
            }

            // Filter out most layers for a wireframe look
            const layers = map.getStyle().layers;
            layers.forEach((layer: any) => {
                const id = layer.id;

                // Hide textures and buildings
                if (id.includes('land') || id.includes('water') || id.includes('building') || id.includes('park')) {
                    if (layer.type === 'fill') {
                        map.setPaintProperty(id, 'fill-color', '#050505');
                        map.setPaintProperty(id, 'fill-opacity', 1);
                    }
                    if (layer.type === 'line' && (id.includes('admin') || id.includes('boundary'))) {
                        map.setPaintProperty(id, 'line-color', 'rgba(0, 240, 255, 0.15)');
                        map.setPaintProperty(id, 'line-width', 0.5);
                    } else if (id.includes('water')) {
                        map.setPaintProperty(id, 'fill-color', '#020202');
                    } else if (!id.includes('admin')) {
                        map.setLayoutProperty(id, 'visibility', 'none');
                    }
                }

                // Hide roads to keep it minimal wireframe
                if (id.includes('road')) {
                    map.setLayoutProperty(id, 'visibility', 'none');
                }

                // Style labels
                if (layer.type === 'symbol') {
                    map.setPaintProperty(id, 'text-color', 'rgba(255, 255, 255, 0.4)');
                    map.setPaintProperty(id, 'text-halo-color', 'rgba(0, 0, 0, 0.8)');
                    // Note: JetBrains Mono must be uploaded to Mapbox for direct use in style, 
                    // falling back to system webfonts for now.
                }
            });

            // Special handling for country boundaries
            if (map.getLayer('admin-0-boundary')) {
                map.setPaintProperty('admin-0-boundary', 'line-color', 'rgba(0, 240, 255, 0.25)');
                map.setPaintProperty('admin-0-boundary', 'line-width', 1.2);
            }
        }, []);

        if (!MAPBOX_TOKEN) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center glass-card rounded-none">
                    <div className="text-center space-y-3 max-w-xs">
                        <div className="w-12 h-12 rounded-full border border-cyan/30 flex items-center justify-center mx-auto">
                            <svg width="20" height="20" fill="none" stroke="#00F0FF" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25l-4.5-4.5 4.5-4.5M15 3.75l4.5 4.5-4.5 4.5M3 12h18" />
                            </svg>
                        </div>
                        <p className="text-xs font-mono text-white/50 leading-relaxed uppercase tracking-widest">
                            Token Missing
                        </p>
                        <code className="block text-[10px] font-mono text-cyan bg-white/5 px-3 py-2 rounded">
                            NEXT_PUBLIC_MAPBOX_TOKEN
                        </code>
                    </div>
                </div>
            );
        }

        return (
            <Map
                ref={mapRef}
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{ longitude: 35.0, latitude: 31.8, zoom: 6.5 }}
                style={{ width: "100%", height: "100%" }}
                mapStyle={MAP_STYLE}
                attributionControl={false}
                onLoad={onMapLoad}
            >
                {MOCK_INCIDENTS.map(incident => (
                    <PulseMarker
                        key={incident.id}
                        incident={incident}
                        onClick={() => onMarkerClick(incident.id)}
                    />
                ))}
            </Map>
        );
    }
);

export default MapCanvas;
