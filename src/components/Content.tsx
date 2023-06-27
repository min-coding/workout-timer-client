import React, { useContext, useState } from 'react';
import data from '../data/routinedata.json';
import { RoutineContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import trashIcon from '../assets/delete-svgrepo-com.svg';
import editIcon from '../assets/edit-svgrepo-com.svg';
import Timer from './Timer';

function Content({
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

  const navigate = useNavigate();

  async function deleteWorkout(workoutId) {
    try {
      const { data } = await axios.delete(
        `https://localhost:8080/api/workouts/${workoutId}`,
        { withCredentials: true }
      );

      if (data) {
        const updatedRoutines = routines.map((routine) => {
          if (routine.routine_id === routine_id) {
            // Remove workout from routine
            const updatedWorkouts = routine.workouts.filter(
              (workout) => workout.workout_id !== workoutId
            );

            // Calculate updated total_time
            const updatedTotalTime = updatedWorkouts.reduce(
              (total, workout) => total + workout.duration,
              0
            );

            // Return updated routine with updated total_time
            return {
              ...routine,
              workouts: updatedWorkouts,
              total_time: updatedTotalTime,
            };
          }
          return routine;
        });
        //since when we delete we're not changing routes, the useEffect set routine wouldn't run to refresh updated state, so we set it here.
        await setRoutines(updatedRoutines);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
        <Timer total_time={total_time} durationsArray={durationsArray}></Timer>
        <div>The timer button</div>
      </div>

      <h2 className="content-sub-header">Total time {total_time} minutes</h2>
      <div className="content-table-container">
        {workouts &&
          workouts.map((workout) => {
            const { workout_id, workout_name, duration } = workout;
            return (
              <div className="content-workout-container" key={workout_id}>
                <div className="trash-icon-container">
                  <button
                    className="icon-button"
                    onClick={() => deleteWorkout(workout_id)}>
                    <img src={trashIcon} alt="deleteIcon"></img>
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => {
                      setModalForm('editWorkout');
                      navigate(`/workout/${workout_id}`);
                    }}>
                    <img src={editIcon} alt="editIcon"></img>
                  </button>
                </div>
                <div>{workout_name}</div>
                <div>{duration}</div>
              </div>
            );
          })}
      </div>
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
  );
}

export default Content;
