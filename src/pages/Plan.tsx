import React, { useContext, useState, useEffect } from 'react';
import Form from '../components/SigninForm';
import data from '../data/routinedata.json';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Content from '../components/Content';
import Modal from '../components/Modal';
import axios from 'axios';
import { RoutineContext } from '../App';
import { useLocation, useParams } from 'react-router-dom';

function Plan() {
  const { routines, setRoutines } = useContext(RoutineContext);
  const [isActive, setIsActive] = useState(0);
  const [isHovered, setIsHovered] = useState(0);
  const [modalForm, setModalForm] = useState(null);
  const { routineId } = useParams();

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const { data } = await axios.get(
          'https://localhost:8080/api/routines/',
          { withCredentials: true }
        );
        setRoutines(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRoutines();
  }, [routineId]);
  /**fetch routine runs when first render, after update form, we navigate back to main page (update routineId)
   * so the page rerender and show results. In this case, that means everytime after we setRoutine,
   * we need to navigate back to main for useEffect to automatically updated and render updated state.
   * the state itself is already updated in the component, basically we use it to 
   * 1. fetch initial data
   * 2. automatically update state, so it doesnt have to wait for next render
   *
   */


  function handleSidebar(routineId) {
    setIsActive(routineId);
    // setIsHovered(routineId);
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
      {isActive ? (
        routines.map((routine) => {
          const { routine_name, routine_id, total_time, workouts } = routine;
          if (routine_id === isActive) {
            return (
              <Content
                key={routine_id}
                routine_id={routine_id}
                routine_name={routine_name}
                total_time={total_time}
                workouts={workouts}
                setModalForm={setModalForm}></Content>
            );
          }
        })
      ) : (
        <h1>You have no routine yet. Please create your routine!</h1>
      )}
      {modalForm && (
        <Modal
          setModalForm={setModalForm}
          // chooseRoutine={handleSidebar}
          modalForm={modalForm}></Modal>
      )}
      {modalForm && <div className="modal-overlay"></div>}
    </div>
  );
}

export default Plan;
