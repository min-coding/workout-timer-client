import React from 'react';
import CreateRoutine from './CreateRoutine';
import CreateWorkout from './CreateWorkout';

function Modal({ setModalForm, modalForm }) {
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
          <CreateRoutine setModalForm={setModalForm}></CreateRoutine>
        ) : (
          <CreateWorkout setModalForm={setModalForm}></CreateWorkout>
        )}
      </div>
    </>
  );
}

export default Modal;
