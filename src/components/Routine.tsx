import React, { useContext, useEffect, useState } from 'react';
import data from '../data/routinedata.json';
import { RoutineContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import trashIcon from '../assets/delete-svgrepo-com.svg';
import editIcon from '../assets/edit-svgrepo-com.svg';
import Timer from './Timer';
import Workout from './Workout';

function Routine({
  routine_name,
  routine_id,
  total_time,
  workouts,
  setModalForm,
}) {
  //translate total_time into minutes seconds
  const { routines, setRoutines } = useContext(RoutineContext);

  //workout duration array
  const durationsArray = workouts.map((workout) => workout.duration);
  const workoutNameArray = workouts.map((workout) => workout.workout_name);

  const navigate = useNavigate();

  async function deleteRoutine(routineId) {
    try {
      const { data } = await axios.delete(
        `https://localhost:8080/api/routines/${routineId}`,
        {
          withCredentials: true,
        }
      );
      if (data) {
        const updatedRoutines = routines.filter(
          (routine) => routine.routine_id !== routineId
        );
        setRoutines(updatedRoutines);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="content-container">
      <div className="content-header">
        <div>
          <h3>{routine_name}</h3>
          <button
            className="icon-button"
            onClick={() => deleteRoutine(routine_id)}>
            <img src={trashIcon} alt="deleteIcon"></img>
          </button>
          <button
            className="icon-button"
            onClick={() => {
              setModalForm('editRoutine');
              navigate(`/plan/${routine_id}`);
            }}>
            <img src={editIcon} alt="editIcon"></img>
          </button>
        </div>

        <Timer
          durationsArray={durationsArray}
          workoutNameArray={workoutNameArray}
        />
      </div>

      <p className="content-sub-header">Total time {total_time} minutes</p>
      <div className="content-table-container">
        {workouts &&
          workouts.map((workout) => (
            <Workout
              key={workout.workout_id}
              workout_id={workout.workout_id}
              workout_name={workout.workout_name}
              duration={workout.duration}
              setModalForm={setModalForm}
              routine_id={routine_id}
            />
          ))}
        <div className="content-btn-container">
          <button
            className="content-create-btn"
            onClick={() => {
              setModalForm('createWorkout');
              navigate(`/plan/${routine_id}`);
            }}>
            Create workout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Routine;
