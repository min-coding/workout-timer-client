import React from 'react';
import CreateRoutine from './CreateRoutine';

//get children component as a create routine and create workout
function Modal({ setRoutineModal }) {
  return (
    <>
      <div className="modal">
        <div className="button-container">
          <button onClick={() => setRoutineModal(false)}>X</button>
        </div>
        <CreateRoutine></CreateRoutine>
      </div>
      <div className="modal-overlay"></div>
    </>
  );
}

export default Modal;
