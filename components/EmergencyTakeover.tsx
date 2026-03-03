"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Incident } from '@/data/mockData';

interface EmergencyTakeoverProps {
    activeAlert: Incident | null;
    onDismiss: () => void;
}

export const EmergencyTakeover: React.FC<EmergencyTakeoverProps> = ({ activeAlert, onDismiss }) => {
    if (!activeAlert) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md"
            >
                {/* Pulsing Red Border Glow */}
                <div className="absolute inset-0 border-[4px] border-magma/60 animate-pulse opacity-40 pointer-events-none" />

                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="relative w-full max-w-2xl p-8 mx-4 bg-[#0A0A0A]/95 border border-magma/50 rounded-2xl shadow-[0_0_80px_rgba(255,102,0,0.4)] glass-card"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <span className="flex h-4 w-4 rounded-full bg-magma animate-ping" />
                            <h2 className="text-2xl font-bold tracking-[0.2em] text-magma uppercase font-mono">Imminent Threat Detected</h2>
                        </div>
                        <button
                            onClick={onDismiss}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"
                            aria-label="Dismiss alert"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Main Content: The Countdown */}
                    <div className="text-center py-12 border-y border-white/5">
                        <p className="text-white/40 uppercase text-[10px] font-mono tracking-[0.4em] mb-4">Estimated Time to Shelter</p>
                        <div className="text-9xl font-black text-white font-mono tabular-nums leading-none">
                            {activeAlert.countdown}<span className="text-2xl ml-2 font-bold opacity-30">SEC</span>
                        </div>
                    </div>

                    {/* Location & Impact */}
                    <div className="grid grid-cols-2 gap-10 mt-10">
                        <div>
                            <p className="text-[10px] text-white/30 uppercase font-mono tracking-widest mb-1">Target Zone</p>
                            <p className="text-xl font-bold text-white tracking-tight">{activeAlert.location.label}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-white/30 uppercase font-mono tracking-widest mb-1">Threat Type</p>
                            <p className="text-xl font-bold text-magma tracking-tight uppercase">{activeAlert.type}</p>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-10 pt-6 border-t border-white/5">
                        <div className="p-5 bg-magma/10 rounded-sm border border-magma/30 text-magma text-sm font-medium tracking-tight leading-relaxed italic">
                            "Official Instruction: Move to a protected space immediately and remain there for 10 minutes or until the all-clear is issued."
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
