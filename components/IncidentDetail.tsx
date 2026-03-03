"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Incident } from '@/data/mockData';
import { MapPin, Clock, ShieldCheck, ExternalLink, Activity, Info, AlertOctagon, Share2 } from 'lucide-react';
import Image from 'next/image';

interface IncidentDetailProps {
    incident: Incident | null;
    isOpen: boolean;
    onClose: () => void;
}

const SEVERITY_COLORS = {
    magma: "#FF6600",
    amber: "#FFB800",
    cyan: "#00F0FF",
};

export function IncidentDetail({ incident, isOpen, onClose }: IncidentDetailProps) {
    if (!incident) return null;

    const color = SEVERITY_COLORS[incident.severity];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-end md:p-4 pointer-events-none">
                    {/* Backdrop for mobile */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto md:hidden"
                    />

                    <motion.div
                        initial={{ x: "100%", opacity: 0.5 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="w-full max-w-lg h-full md:h-[calc(100vh-2rem)] bg-void/95 border-l md:border border-white/10 shadow-2xl pointer-events-auto overflow-y-auto slide-shadow glass-card rounded-none md:rounded-lg"
                    >
                        {/* Header Image */}
                        <div className="relative h-64 w-full bg-charcoal group overflow-hidden">
                            <Image
                                src={incident.media.src}
                                alt={incident.title}
                                fill
                                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/70 flex items-center justify-center hover:bg-black hover:text-white transition-all z-20"
                            >
                                ✕
                            </button>

                            {/* Verification Badge */}
                            <div className="absolute bottom-4 left-6 flex items-center gap-2">
                                <div className={`px-2 py-1 rounded-[1px] text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 
                                    ${incident.verified ? 'bg-amber/20 border border-amber/40 text-amber' : 'bg-white/10 border border-white/20 text-white/50'}`}>
                                    {incident.verified ? <ShieldCheck size={12} /> : <Info size={12} />}
                                    {incident.verified ? 'Verified Intelligence' : 'Provisional Report'}
                                </div>
                                {incident.live && (
                                    <div className="bg-magma px-2 py-1 rounded-[1px] text-[10px] font-mono font-bold text-white uppercase tracking-widest animate-pulse">
                                        Live Feed
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Title & Metadata */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-white/30 font-mono text-[11px] uppercase tracking-[0.2em]">
                                    <span className="flex items-center gap-1.5"><Clock size={12} /> {incident.timestamp}</span>
                                    <span>·</span>
                                    <span className="flex items-center gap-1.5">{incident.source}</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
                                    {incident.title}
                                </h2>
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold" style={{ color }}>{incident.type}</span>
                                </div>
                            </div>

                            {/* Section 1: Threat Mapping */}
                            <div className="space-y-4 p-5 bg-white/5 border border-white/5 rounded-[2px]">
                                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
                                    <MapPin size={12} /> Geospatial Coordinates
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[9px] text-white/20 uppercase font-mono mb-1">Target Zone</p>
                                        <p className="text-sm font-bold text-white">{incident.location.label}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] text-white/20 uppercase font-mono mb-1">Precision Lat/Lng</p>
                                        <p className="text-sm font-mono text-cyan/70">{incident.location.lat.toFixed(4)}N, {incident.location.lng.toFixed(4)}E</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Summary */}
                            <div className="space-y-3">
                                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/30">Intelligence Summary</h3>
                                <p className="text-white/70 leading-relaxed tracking-wide text-[15px]">
                                    {incident.summary}
                                </p>
                            </div>

                            {/* Section 3: Human Impact Visualizer */}
                            <div className="space-y-5">
                                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
                                    <Activity size={12} /> Human Impact Assessment
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[11px] font-mono text-white/50">
                                            <span>Casualty Distribution (Killed / Injured)</span>
                                            <span className="text-white font-bold tracking-widest">{incident.fatalities + incident.injuries} TOTAL</span>
                                        </div>
                                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/5">
                                            <div
                                                className="h-full bg-magma transition-all duration-1000"
                                                style={{ width: `${(incident.fatalities / (incident.fatalities + incident.injuries || 1)) * 100}%` }}
                                            />
                                            <div
                                                className="h-full bg-amber transition-all duration-1000"
                                                style={{ width: `${(incident.injuries / (incident.fatalities + incident.injuries || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-10">
                                        <div>
                                            <p className="text-[9px] text-magma uppercase font-mono mb-0.5 tracking-widest font-bold">● Fatalities</p>
                                            <p className="text-2xl font-mono font-bold text-white leading-none">{incident.fatalities}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-amber uppercase font-mono mb-0.5 tracking-widest font-bold">● Injuries</p>
                                            <p className="text-2xl font-mono font-bold text-white leading-none">{incident.injuries}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-cyan uppercase font-mono mb-0.5 tracking-widest font-bold">● Displaced</p>
                                            <p className="text-2xl font-mono font-bold text-white leading-none">{incident.displaced || '0'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: Physical Infrastructure */}
                            {incident.infrastructureStatus && (
                                <div className="space-y-3 p-5 bg-magma/5 border border-magma/10 rounded-[2px]">
                                    <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-magma/60 flex items-center gap-2">
                                        <AlertOctagon size={12} /> Infrastructure Status
                                    </h3>
                                    <p className="text-[13px] text-white/80 leading-relaxed font-medium">
                                        {incident.infrastructureStatus}
                                    </p>
                                </div>
                            )}

                            {/* Section 5: Official Response */}
                            {incident.governmentStatement && (
                                <div className="space-y-4 py-8 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                                            <ShieldCheck size={16} />
                                        </div>
                                        <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-white/50">Government Statement</h3>
                                    </div>
                                    <blockquote className="text-[14px] text-white/60 italic leading-relaxed border-l-2 border-white/10 pl-6 py-2 tracking-wide">
                                        {incident.governmentStatement}
                                    </blockquote>
                                </div>
                            )}

                            {/* Footer Actions */}
                            <div className="pt-8 flex items-center gap-3 border-t border-white/5">
                                <button className="flex-1 h-12 bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono font-bold uppercase tracking-widest hover:bg-cyan/20 transition-all flex items-center justify-center gap-2 rounded-sm group">
                                    Target Documentation <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                                <button className="w-12 h-12 bg-white/5 border border-white/10 text-white/40 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all rounded-sm">
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
