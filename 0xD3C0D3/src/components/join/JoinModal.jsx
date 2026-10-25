import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import JoinPanel from './JoinPanel';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), summary, [tabindex]:not([tabindex="-1"])';

// Solo elementos con los que se puede interactuar: lo que hay dentro de un <details> cerrado
// no cuenta (solo su <summary>), aunque el navegador lo mantenga en el árbol de layout.
const isVisible = (el) => {
  const closed = el.closest('details:not([open])');
  if (closed && !(el.tagName === 'SUMMARY' && el.parentElement === closed)) return false;
  return el.getClientRects().length > 0;
};

const getFocusable = (root) => Array.from(root.querySelectorAll(FOCUSABLE)).filter(isVisible);

/**
 * Ventana modal accesible: cierra con Esc o clic fuera, atrapa el foco, bloquea el scroll
 * de la página y devuelve el foco al botón que la abrió.
 */
const JoinModal = ({ open, onClose }) => {
  const dialogRef = useRef(null);

  // Bloqueo de scroll + foco inicial + restaurar foco al cerrar.
  useEffect(() => {
    if (!open) return undefined;

    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // preventScroll: si la ventana es más alta que la pantalla, que empiece mostrando su parte de arriba.
    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [open]);

  // Teclado: Esc cierra y Tab no se sale de la ventana.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const items = getFocusable(dialogRef.current);
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !dialogRef.current.contains(active) || active === dialogRef.current;

      if (e.shiftKey && (active === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/85 backdrop-blur-sm">
      <div
        className="flex min-h-full items-center justify-center p-4 sm:p-6"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-title"
          tabIndex={-1}
          className="join-in w-full max-w-xl outline-none"
        >
          <JoinPanel onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default JoinModal;
