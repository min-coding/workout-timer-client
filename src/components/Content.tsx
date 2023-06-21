import React, { useState } from 'react';

import data from '../data/routinedata.json';

function Content({ routine_name, total_time, workouts, setModalForm }) {
  //translate total_time into minutes seconds
  return (
    <div className="content-container">
      <div className="content-header">
        <h1>{routine_name}</h1>
        <div>The timer button</div>
      </div>
      <h2 className="content-sub-header">Total time {total_time} minutes</h2>
      <div className="content-table-container">
        {workouts &&
          workouts.map((workout) => {
            const { workout_id, workout_name, duration } = workout;
            return (
              <div className="content-workout-container" key={workout_id}>
                <div>{workout_name}</div>
                <div>{duration}</div>
              </div>
            );
          })}
      </div>
      <div className="content-btn-container">
        <button
          className="content-create-btn"
          onClick={() => setModalForm('workout')}>
          Create workout
        </button>
      </div>
    </div>
  );
}

export default Content;
