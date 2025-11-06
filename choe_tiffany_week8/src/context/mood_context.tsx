import { SFSymbol } from 'expo-symbols';
import React, { createContext, useContext, useRef, useState } from 'react';

export type Mood = 'happy' | 'sad' | 'angry' | 'relaxed' | 'stressed' | 'tired' | 'excited';

export type MoodEntry = {
    id: number;
    date: Date;   
    mood: Mood;
    note?: string;
};

export const moodOptions: Record<Mood, SFSymbol> = {
    happy: 'face.smiling',
    excited: 'party.popper.fill', 
    sad: 'cloud.rain.fill',
    angry: 'flame.fill',
    relaxed: 'leaf.fill',
    stressed: 'exclamationmark.triangle.fill',
    tired: 'bed.double.fill',
};

export const moodColors: Record<Mood, string> = {

    happy:   '#F59E0B', 
    excited: '#A855F7', 
    sad:     '#3B82F6', 
    angry:   '#EF4444', 
    relaxed: '#10B981', 
    stressed:'#F97316', 
    tired:   '#6B7280', 
};


type MoodCtx = {
    moods: MoodEntry[];
    addMood: (entry: MoodEntry) => void;
};

const MoodContext = createContext<MoodCtx | null>(null);


export function MoodProvider({ children }: { children: React.ReactNode }) {
    const id = useRef(0);
    const [moods, setMoods] = useState<MoodEntry[]>([]);

    const addMood: MoodCtx['addMood'] = (entry: Omit<MoodEntry, 'id'>) => {
        setMoods(prev => [...prev, { ...entry, id: id.current++ }]);
    };

    return (
        <MoodContext.Provider value={{ moods, addMood }}>
        {children}
        </MoodContext.Provider>
    );
}

export function useMoods() {
    const ctx = useContext(MoodContext);
    if (!ctx) throw new Error('useMoods must be used within MoodProvider');
    return ctx;
}
