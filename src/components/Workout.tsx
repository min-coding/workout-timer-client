import React, { useContext } from 'react';
import trashIcon from '../assets/delete-svgrepo-com.svg';
import editIcon from '../assets/edit-svgrepo-com.svg';
import axios from 'axios';
import { RoutineContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Workout({
  workout_id,
  workout_name,
  duration,
  setModalForm,
  routine_id,
}) {
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
        //since when we delete we're not changing routes, the useEffect set routine wouldn't run to refresh updated state, so we set it here.
        await setRoutines(updatedRoutines);
      }
    } catch (error) {
      console.log(error);
    }
  }
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
}

export default Workout;
