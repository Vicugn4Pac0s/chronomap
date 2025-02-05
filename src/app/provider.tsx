'use client';

import { SessionProvider } from 'next-auth/react';
import { MapProvider } from 'react-map-gl';
import { ReactNode } from 'react';

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <MapProvider>
        {children}
      </MapProvider>
    </SessionProvider>
  );
}