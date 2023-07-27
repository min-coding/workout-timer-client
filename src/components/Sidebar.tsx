import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RoutineContext } from '../App';

interface SidebarProps {
  chooseRoutine: (routineId: number) => void;
  isActive: number | null;
  isHovered: number | null;
  setIsHovered: React.Dispatch<React.SetStateAction<number | null>>;
  setModalForm: React.Dispatch<React.SetStateAction<string | null>>;
}

function Sidebar({
  chooseRoutine,
  isActive,
  isHovered,
  setIsHovered,
  setModalForm,
}: SidebarProps) {
  //call routine lists and save it and render here , if there's no routine suggest creating routine
  const { routines } = useContext(RoutineContext);
  return (
    <div className="sidebar-container">
      <div className="routine-list">
        {routines?.map((routine) => {
          const { routine_id, routine_name } = routine;
          return (
            <Link key={routine_id} to={`/plan/${routine_id}`}>
              <div
                key={routine_id}
                className={`routine-link-container ${
                  isHovered === routine.routine_id ? 'hovered' : ''
                }`}
                onMouseOver={() => {
                  setIsHovered(routine_id);
                }}
                onMouseLeave={() => {
                  setIsHovered(0);
                }}
                onClick={() => chooseRoutine(routine_id)}>
                <p
                  className={
                    isActive === routine.routine_id ? 'active' : 'inactive'
                  }>
                  {routine_name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="sidebar button-container">
        <button
          className="routine-create-btn"
          onClick={() => {
            setModalForm('createRoutine');
          }}>
          Create new routine
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
