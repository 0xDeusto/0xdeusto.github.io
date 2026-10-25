import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/api';

// Se pide una sola vez por visita, aunque el modal se abra varias veces.
let cached = null;

/** Número de miembros del Discord, o null si todavía no se sabe (o la API no responde). */
export function useMemberCount() {
  const [count, setCount] = useState(cached);

  useEffect(() => {
    if (cached !== null) return undefined;
    const controller = new AbortController();

    fetch(API_ENDPOINTS.members, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const n = Number(data?.member_count);
        if (Number.isFinite(n) && n > 0) {
          cached = n;
          setCount(n);
        }
      })
      .catch(() => {
        /* sin contador no pasa nada: simplemente no se muestra */
      });

    return () => controller.abort();
  }, []);

  return count;
}
