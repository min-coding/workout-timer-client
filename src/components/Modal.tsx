import React from 'react';
import CreateRoutine from './CreateRoutine';
import CreateWorkout from './CreateWorkout';

function Modal({ setModalForm, modalForm }) {
  console.log(modalForm);
  return (
    <>
      <div className="modal">
        <div className="modal-btn-container">
          <button
            className="modal-close-btn"
            onClick={() => setModalForm(null)}>
            X
          </button>
        </div>
        {modalForm === 'routine' ? (
          <CreateRoutine></CreateRoutine>
        ) : (
          <CreateWorkout></CreateWorkout>
        )}
      </div>
    </>
  );
}

export default Modal;
/**
 * Routine
 *  <>
      <div className="modal">
        <div className="modal-btn-container">
          <button className='modal-close-btn' onClick={() => setRoutineModal(false)}>X</button>
        </div>
        <CreateRoutine></CreateRoutine>
      </div>
    </>
 * 
    Workout

    <>
      <div className="modal">
        <div className="modal-btn-container">
          <button className='modal-close-btn' onClick={() => setWorkoutModal(false)}>X</button>
        </div>
        <CreateWorkout></CreateWorkout>
      </div>
    </>
 */
