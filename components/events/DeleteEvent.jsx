import React from 'react';
import Modal from '../ui/Modal';

export default function DeleteEvent({ onStopDelete, onDelete, loadingDelete }) {
  return (
    <Modal onClose={() => onStopDelete()}>
      <h2>Are you sure?</h2>
      <p>
        Do you really want to delete this event? This action cannot be undone.
      </p>
      <div className="form-actions">
        <>
          <button onClick={() => onStopDelete()} className="button-text">
            Cancel
          </button>
          <button
            onClick={() => onDelete()}
            className="button"
            disabled={loadingDelete}
          >
            {loadingDelete ? 'Deleting, please wait...' : 'Delete'}
          </button>
        </>
      </div>
    </Modal>
  );
}
