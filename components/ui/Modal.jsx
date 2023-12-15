import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  // Vérifier si le code s'exécute côté client
  if (typeof document === 'undefined') {
    return null;
  }

  const portalRoot = document.getElementById('modal');

  if (!portalRoot) {
    return null;
  }

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close(); // needed to avoid error being thrown
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    portalRoot
  );
}
