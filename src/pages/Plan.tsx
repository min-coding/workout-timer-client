import { useContext, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Modal from '../components/Modal';
import axios from 'axios';
import { RoutineContext } from '../App';
import { useParams } from 'react-router-dom';
import Routine from '../components/Routine';

function Plan() {
  const { routines, setRoutines } = useContext(RoutineContext);
  const [isActive, setIsActive] = useState<number | null>(0);
  const [isHovered, setIsHovered] = useState<number | null>(0);
  const [modalForm, setModalForm] = useState<string | null>(null);
  const { routineId, workoutId } = useParams<{
    routineId?: string;
    workoutId?: string;
  }>();
  let showRoutine = null;

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
  }, [routineId, workoutId]);

  function handleSidebar(routineId: number) {
    setIsActive(routineId);
  }

  if (routines) {
    if (routines.length === 0) {
      showRoutine = (
        <div className="content-container">
          <h1>You have no routine yet. Please create your routine!</h1>
        </div>
      );
    } else if (!isActive && routines.length >= 0) {
      showRoutine = (
        <Routine
          key={routines[0].routine_id}
          routine_id={routines[0].routine_id}
          routine_name={routines[0].routine_name}
          total_time={routines[0].total_time}
          workouts={routines[0].workouts}
          setIsActive={setIsActive}
          setModalForm={setModalForm}></Routine>
      );
    } else if (isActive && routines.length >= 0) {
      showRoutine = routines.map((routine) => {
        const { routine_name, routine_id, total_time, workouts } = routine;
        if (routine_id === isActive) {
          return (
            <Routine
              key={routine_id}
              routine_id={routine_id}
              routine_name={routine_name}
              total_time={total_time}
              workouts={workouts}
              setIsActive={setIsActive}
              setModalForm={setModalForm}></Routine>
          );
        }
      });
    }
  }

  return (
    <div className="container">
      <Topbar setModalForm={setModalForm}></Topbar>
      <Sidebar
        chooseRoutine={handleSidebar}
        isActive={isActive}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        setModalForm={setModalForm}></Sidebar>
      {showRoutine}
      {modalForm && (
        <Modal
          setModalForm={setModalForm}
          modalForm={modalForm}
          setIsActive={setIsActive}></Modal>
      )}
      {modalForm && <div className="modal-overlay"></div>}
    </div>
  );
}

export default Plan;
