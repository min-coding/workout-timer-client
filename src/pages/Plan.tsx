import React, { useEffect, useState } from 'react';
import Form from '../components/SigninForm';
import data from '../data/routinedata.json';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Content from '../components/Content';
import Modal from '../components/Modal';
import axios from 'axios';

function Plan() {
  const [isActive, setIsActive] = useState(0);
  const [isHovered, setIsHovered] = useState(0);
  const [modalForm,setModalForm] =useState(null)
  
  function handleSidebar(routineId) {
    setIsActive(routineId)
    setIsHovered(routineId)
  }

  return (
    <div className="container">
      <Topbar></Topbar>
      <Sidebar
        chooseRoutine={handleSidebar}
        isActive={isActive}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        setModalForm={setModalForm}></Sidebar>
      {data.map((routine) => {
        const { routine_name, routine_id, total_time, workouts } = routine;
        if (routine_id === isActive) {
          return (
            <Content
              key={routine_id}
              routine_name={routine_name}
              total_time={total_time}
              workouts={workouts}
              setModalForm={setModalForm}></Content>
          );
        }
      })}
      {modalForm !== null ? (
        <Modal setModalForm={setModalForm} modalForm={modalForm}></Modal>
      ) : (
        ''
      )}
      {modalForm ? <div className="modal-overlay"></div> : ''}
    </div>
  );
}

export default Plan;
