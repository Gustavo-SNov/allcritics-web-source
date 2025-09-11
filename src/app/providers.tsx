"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

// Você pode adicionar outros provedores aqui no futuro (Tema, React Query, etc.)
export function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}