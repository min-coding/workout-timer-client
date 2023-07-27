import React, { SetStateAction, useContext } from 'react';
import axios from 'axios';
import { RoutineContext } from '../App';
import { useNavigate } from 'react-router-dom';

interface WorkoutProps {
  workout_id: number;
  workout_name: string;
  duration: number;
  setModalForm: React.Dispatch<SetStateAction<string | null>>;
  routine_id: number;
}

function Workout({
  workout_id,
  workout_name,
  duration,
  setModalForm,
  routine_id,
}: WorkoutProps) {
  const { routines, setRoutines } = useContext(RoutineContext);
  const navigate = useNavigate();

  async function deleteWorkout(workoutId: number) {
    try {
      const { data } = await axios.delete(
        `https://workout-timer-server-production.up.railway.app/api/workouts/${workoutId}`,
        { withCredentials: true }
      );

      if (data) {
        const updatedRoutines = routines?.map((routine) => {
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
        <span
          className="icon-button-container"
          onClick={() => deleteWorkout(workout_id)}>
          🗑
        </span>

        <span
          className="icon-button-container"
          onClick={() => {
            setModalForm('editWorkout');
            navigate(`/workout/${workout_id}`);
          }}>
          ✏️
        </span>
      </div>
      <div>
        <p>{workout_name}</p>
      </div>
      <div>
        <p>{duration / 10} seconds</p>
      </div>
    </div>
  );
}

export default Workout;
