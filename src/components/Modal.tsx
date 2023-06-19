import React from 'react';
import CreateRoutine from './CreateRoutine';

function Modal({ setRoutineModal }) {
  return (
    <>
      <div className="modal">
        <div className="modal-btn-container">
          <button className='modal-close-btn' onClick={() => setRoutineModal(false)}>X</button>
        </div>
        <CreateRoutine></CreateRoutine>
      </div>
      <div className="modal-overlay"></div>
    </>
  );
}

export default Modal;
