import React from 'react';
import CreateRoutine from './CreateRoutine';
import CreateWorkout from './CreateWorkout';
import EditProfile from './EditProfile';
import EditRoutine from './EditRoutine';
import EditWorkout from './EditWorkout';

function Modal({ setModalForm, modalForm }) {
  let modalContent = null;

  //set modal content
  if (modalForm === 'createRoutine') {
    modalContent = <CreateRoutine setModalForm={setModalForm}></CreateRoutine>;
  } else if (modalForm === 'createWorkout') {
    modalContent = <CreateWorkout setModalForm={setModalForm}></CreateWorkout>;
  } else if (modalForm === 'editProfile') {
    modalContent = <EditProfile setModalForm={setModalForm}></EditProfile>;
  } else if (modalForm === 'editRoutine') {
    modalContent = <EditRoutine setModalForm={setModalForm}></EditRoutine>;
  } else if (modalForm === 'editWorkout') {
    modalContent = <EditWorkout setModalForm={setModalForm}></EditWorkout>;
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
