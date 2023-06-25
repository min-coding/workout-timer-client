import React from 'react';
import CreateRoutine from './CreateRoutine';
import CreateWorkout from './CreateWorkout';
import EditProfile from './EditProfile';

function Modal({ setModalForm, modalForm }) {
  let modalContent = null;

  //set modal content
  if (modalForm === 'routine') {
    modalContent = <CreateRoutine setModalForm={setModalForm}></CreateRoutine>;
  } else if (modalForm === 'workout') {
    modalContent = <CreateWorkout setModalForm={setModalForm}></CreateWorkout>;
  } else if (modalForm === 'profile') {
    modalContent = <EditProfile setModalForm={setModalForm}></EditProfile>;
  }

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
        {modalContent}
      </div>
    </>
  );
}

export default Modal;
