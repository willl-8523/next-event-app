import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  const portalRoot = document.getElementById('modal');

  if (!portalRoot) {
    console.error(
      "Le portail root avec l'ID 'portal-root' n'a pas été trouvé."
    );
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
    <dialog className="modal" ref={dialog} onClick={onClose}>
      {children}
    </dialog>,
    portalRoot
  );
}
