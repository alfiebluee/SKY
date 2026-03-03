export type Severity = 'magma' | 'amber' | 'cyan';

export interface MediaItem {
    type: 'image' | 'video';
    src: string;
    thumb?: string;
}

export interface Incident {
    id: string;
    title: string;
    location: { lat: number; lng: number; label: string };
    severity: Severity;
    verified: boolean;
    live: boolean;
    source: string;
    sourceSeal?: string; // URL to official seal image
    timestamp: string;
    injuries: number;
    fatalities: number;
    displaced: number;
    media: MediaItem;
    summary: string;
    countdown?: number; // seconds for Take Cover
}

export const MOCK_INCIDENTS: Incident[] = [
    {
        id: 'inc-001',
        title: 'Rocket Barrage — Northern Border',
        location: { lat: 33.07, lng: 35.48, label: 'Northern Israel' },
        severity: 'magma',
        verified: true,
        live: true,
        source: 'Pikud HaOref',
        timestamp: '22:14 UTC',
        injuries: 12,
        fatalities: 2,
        displaced: 340,
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&q=80',
        },
        summary: 'Multiple projectiles launched toward northern communities. Red Alert active across 14 towns. Residents advised to take cover immediately.',
        countdown: 45,
    },
    {
        id: 'inc-002',
        title: 'IDF Airstrike — Khan Yunis',
        location: { lat: 31.34, lng: 34.3, label: 'Khan Yunis, Gaza' },
        severity: 'magma',
        verified: true,
        live: true,
        source: 'IDF Spokesperson',
        timestamp: '22:08 UTC',
        injuries: 34,
        fatalities: 8,
        displaced: 1200,
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1561541178-f46f8f58d24f?w=800&q=80',
        },
        summary: 'Precision strikes on military infrastructure. Civilian evacuation corridors remain open on Route 10.',
    },
    {
        id: 'inc-003',
        title: 'Drone Intercept — Tel Aviv Corridor',
        location: { lat: 32.08, lng: 34.78, label: 'Tel Aviv' },
        severity: 'amber',
        verified: true,
        live: false,
        source: 'Haaretz Military Correspondent',
        timestamp: '21:47 UTC',
        injuries: 3,
        fatalities: 0,
        displaced: 0,
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1519529096168-db3a4c6e1765?w=800&q=80',
        },
        summary: 'Iron Dome battery successfully intercepted inbound UAV. No ground impact. All clear issued after 11-minute alert.',
    },
    {
        id: 'inc-004',
        title: 'Humanitarian Convoy — Kerem Shalom',
        location: { lat: 31.22, lng: 34.27, label: 'Kerem Shalom Crossing' },
        severity: 'cyan',
        verified: true,
        live: false,
        source: 'COGAT',
        timestamp: '20:30 UTC',
        injuries: 0,
        fatalities: 0,
        displaced: 0,
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
        },
        summary: '112 aid trucks cleared for entry. Medical supplies and food for 340,000 people processed. UN escorts confirmed.',
    },
    {
        id: 'inc-005',
        title: 'Artillery Exchange — Rafah Border Zone',
        location: { lat: 31.28, lng: 34.24, label: 'Rafah' },
        severity: 'magma',
        verified: false,
        live: true,
        source: 'Reuters Gaza Bureau',
        timestamp: '22:01 UTC',
        injuries: 21,
        fatalities: 5,
        displaced: 870,
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80',
        },
        summary: 'Ongoing exchange of heavy fire along the southern perimeter. Multiple structure collapses reported.',
    },
    {
        id: 'inc-006',
        title: 'Hostage Negotiation Update — Qatar',
        location: { lat: 25.29, lng: 51.53, label: 'Doha, Qatar' },
        severity: 'cyan',
        verified: true,
        live: false,
        source: 'Prime Minister Office',
        timestamp: '19:55 UTC',
        injuries: 0,
        fatalities: 0,
        displaced: 0,
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1596436893028-44acbba63ea9?w=800&q=80',
        },
        summary: 'Third round of ceasefire talks concluded. Qatar mediators report "positive movement" on phased hostage release framework.',
    },
];

export const MOCK_NEWS_ITEMS = [
    { id: 1, source: 'AP', text: 'UN Security Council convenes emergency session — vote on ceasefire framework expected Thursday' },
    { id: 2, source: 'Reuters', text: 'Israel Army Radio: Iron Dome batteries repositioned to cover northern belt after Hezbollah threat escalation' },
    { id: 3, source: 'Al Jazeera', text: 'Gaza Health Ministry: 40% of hospitals operating at reduced capacity due to fuel shortages' },
    { id: 4, source: 'Times of Israel', text: 'IDF Chief of Staff briefs War Cabinet on operational readiness for potential multi-front scenario' },
    { id: 5, source: 'BBC', text: 'UK announces additional £30m humanitarian package; calls for "immediate and sustained" pauses in fighting' },
    { id: 6, source: 'Haaretz', text: 'Northern evacuation drill scheduled for Galilee region communities — emergency alert systems test planned' },
    { id: 7, source: 'WSJ', text: 'Egypt reopens Rafah crossing for medical evacuations; 48 critically wounded civilians transferred' },
    { id: 8, source: 'CNN', text: 'US Secretary of State arrives Tel Aviv for unannounced visit; ceasefire timeline key agenda item' },
];

export const SUMMARY_STATS = {
    totalCasualties: 38412,
    totalInjured: 89230,
    totalDisplaced: 1840000,
    activeFronts: 3,
    alertsToday: 47,
    interceptionsToday: 31,
};
