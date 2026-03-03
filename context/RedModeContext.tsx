"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RedModeContextType {
    redMode: boolean;
    toggleRedMode: () => void;
}

const RedModeContext = createContext<RedModeContextType>({
    redMode: false,
    toggleRedMode: () => { },
});

export function RedModeProvider({ children }: { children: ReactNode }) {
    const [redMode, setRedMode] = useState(false);

    return (
        <RedModeContext.Provider value={{ redMode, toggleRedMode: () => setRedMode(v => !v) }}>
            {children}
        </RedModeContext.Provider>
    );
}

export function useRedMode() {
    return useContext(RedModeContext);
}
