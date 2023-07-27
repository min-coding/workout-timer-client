import { useContext } from 'react';
import { RoutineContext, WorkoutType } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';
import Workout from './Workout';

interface RoutineProps {
  routine_name: string;
  routine_id: number;
  total_time: number;
  workouts: WorkoutType[];
  setIsActive: React.Dispatch<React.SetStateAction<number | null>>;
  setModalForm: React.Dispatch<React.SetStateAction<string | null>>;
}

function Routine({
  routine_name,
  routine_id,
  total_time,
  workouts,
  setModalForm,
  setIsActive,
}: RoutineProps) {
  const { routines, setRoutines } = useContext(RoutineContext);

  //workout duration array
  const durationsArray = workouts.map((workout) => workout.duration);
  const workoutNameArray = workouts.map((workout) => workout.workout_name);

  const navigate = useNavigate();

  async function deleteRoutine(routineId: number) {
    try {
      const { data } = await axios.delete(
        `https://workout-timer-server-production.up.railway.app/api/routines/${routineId}`,
        {
          withCredentials: true,
        }
      );
      if (data) {
        const updatedRoutines = routines?.filter(
          (routine) => routine.routine_id !== routineId
        );
        setRoutines(updatedRoutines);
        if (routines && routines.length > 0) {
          navigate(`/plan/${routines[routines.length - 2].routine_id}`);
          setIsActive(routines[routines.length - 2].routine_id);
        } else navigate('/plan');
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
          <span
            className="icon-button-container"
            onClick={() => deleteRoutine(routine_id)}>
            🗑
          </span>
          <span
            className="icon-button-container"
            onClick={() => {
              setModalForm('editRoutine');
              navigate(`/plan/${routine_id}`);
            }}>
            ✏️
          </span>
        </div>

        <Timer
          durationsArray={durationsArray}
          workoutNameArray={workoutNameArray}
        />
      </div>

      <p className="content-sub-header">Total time {total_time / 10} seconds</p>
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

export default Routine;
