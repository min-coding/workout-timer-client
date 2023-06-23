import React, { useContext, useState } from 'react';
import data from '../data/routinedata.json';
import { RoutineContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Content({
  routine_name,
  routine_id,
  total_time,
  workouts,
  setModalForm,
}) {
  //translate total_time into minutes seconds
  const { routines, setRoutines } = useContext(RoutineContext);
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

      await  setRoutines(updatedRoutines);
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
        <h1>{routine_name}</h1>
        <button onClick={() => deleteRoutine(routine_id)}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.1 3C11.1 2.17157 11.7716 1.5 12.6 1.5H23.4C24.2284 1.5 24.9 2.17157 24.9 3C24.9 3.82843 24.2284 4.5 23.4 4.5H12.6C11.7716 4.5 11.1 3.82843 11.1 3ZM1.5 8.4C1.5 7.57157 2.17157 6.9 3 6.9H33C33.8284 6.9 34.5 7.57157 34.5 8.4C34.5 9.22843 33.8284 9.9 33 9.9H30.9V27.6C30.9 31.4284 27.8284 34.5 24 34.5H12C8.14476 34.5 5.09999 31.4014 5.09999 27.45V9.9H3C2.17157 9.9 1.5 9.22843 1.5 8.4ZM8.09999 9.9V27.45C8.09999 29.7986 9.85523 31.5 12 31.5H24C26.1716 31.5 27.9 29.7716 27.9 27.6V9.9H8.09999ZM13.95 13.8C14.7784 13.8 15.45 14.4716 15.45 15.3V26.25C15.45 27.0784 14.7784 27.75 13.95 27.75C13.1216 27.75 12.45 27.0784 12.45 26.25V15.3C12.45 14.4716 13.1216 13.8 13.95 13.8ZM22.05 13.8C22.8784 13.8 23.55 14.4716 23.55 15.3V26.25C23.55 27.0784 22.8784 27.75 22.05 27.75C21.2216 27.75 20.55 27.0784 20.55 26.25V15.3C20.55 14.4716 21.2216 13.8 22.05 13.8Z"
              fill="black"
            />
          </svg>
        </button>
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
                  <button onClick={() => deleteWorkout(workout_id)}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.1 3C11.1 2.17157 11.7716 1.5 12.6 1.5H23.4C24.2284 1.5 24.9 2.17157 24.9 3C24.9 3.82843 24.2284 4.5 23.4 4.5H12.6C11.7716 4.5 11.1 3.82843 11.1 3ZM1.5 8.4C1.5 7.57157 2.17157 6.9 3 6.9H33C33.8284 6.9 34.5 7.57157 34.5 8.4C34.5 9.22843 33.8284 9.9 33 9.9H30.9V27.6C30.9 31.4284 27.8284 34.5 24 34.5H12C8.14476 34.5 5.09999 31.4014 5.09999 27.45V9.9H3C2.17157 9.9 1.5 9.22843 1.5 8.4ZM8.09999 9.9V27.45C8.09999 29.7986 9.85523 31.5 12 31.5H24C26.1716 31.5 27.9 29.7716 27.9 27.6V9.9H8.09999ZM13.95 13.8C14.7784 13.8 15.45 14.4716 15.45 15.3V26.25C15.45 27.0784 14.7784 27.75 13.95 27.75C13.1216 27.75 12.45 27.0784 12.45 26.25V15.3C12.45 14.4716 13.1216 13.8 13.95 13.8ZM22.05 13.8C22.8784 13.8 23.55 14.4716 23.55 15.3V26.25C23.55 27.0784 22.8784 27.75 22.05 27.75C21.2216 27.75 20.55 27.0784 20.55 26.25V15.3C20.55 14.4716 21.2216 13.8 22.05 13.8Z"
                        fill="black"
                      />
                    </svg>
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
            setModalForm('workout');
            navigate(`/plan/${routine_id}`);
          }}>
          Create workout
        </button>
      </div>
    </div>
  );
}

export default Content;

/**
 * 1. get the duration of that workout before delete
 * 2. save it
 * 3. updateTime = routine.total_time - thatWorkoutDuration
 *
 * or call workouts again to update?
 */
