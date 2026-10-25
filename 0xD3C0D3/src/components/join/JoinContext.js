import { createContext, useContext } from 'react';

export const JoinContext = createContext(null);

/** Abre y cierra la ventana "Únete" desde cualquier componente. */
export function useJoin() {
  const ctx = useContext(JoinContext);
  if (!ctx) throw new Error('useJoin debe usarse dentro de <JoinProvider>.');
  return ctx;
}
