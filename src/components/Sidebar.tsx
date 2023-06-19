import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../data/routinedata.json';

function Sidebar({
  chooseRoutine,
  isActive,
  setRoutineModal,
  isHovered,
  setIsHovered,
}) {
  //call routine lists and save it and render here , if there's no routine suggest creating routine
  return (
    <div className="sidebar-container">
      <div className="routine-list">
        {data.map((routine) => {
          const { routine_id, routine_name } = routine;
          return (
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
              <Link
                to={`/plan/${routine_id}`}
                className={isActive === routine.routine_id ? 'active' : ''}>
                {routine_name}
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <button className='routine-create-btn'
          onClick={() => {
            setRoutineModal(true);
          }}>
          Create new routine
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
