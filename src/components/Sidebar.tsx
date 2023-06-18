import React from 'react';
import data from '../data/routinedata.json';

function Sidebar({ chooseRoutine, isActive }) {
  //call routine lists and save it and render here , if there's no routine suggest creating routine
  return (
    <div className="sidebar-container">
      {data.map((routine) => {
        const { routine_id, routine_name } = routine;
        return (
          <div key={routine_id} onClick={() => chooseRoutine(routine_id)}>
            <p className={isActive === routine.routine_id ? 'active' : ''}>
              {routine_name}
            </p>
          </div>
        );
      })}

      <button>Create new routine</button>
    </div>
  );
}

export default Sidebar;
