import { useEffect, useRef } from 'react';

function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === rootRef.current) onClose();
  };

  return (
    <div
      ref={rootRef}
      onMouseDown={onBackdropMouseDown}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-[min(1100px,92vw)] max-h-[88vh] overflow-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <button
          aria-label="close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-2 hover:bg-black/5"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
