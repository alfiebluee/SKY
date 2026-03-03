import type { Metadata } from "next";
import "./globals.css";
import { RedModeProvider } from "@/context/RedModeContext";

export const metadata: Metadata = {
    title: "SKY — Intelligence Feed",
    description: "Neo-futurist conflict intelligence dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-void text-white antialiased overflow-hidden">
                <RedModeProvider>
                    {children}
                </RedModeProvider>
            </body>
        </html>
    );
}
