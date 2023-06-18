import React, { useState } from 'react';
import data from '../data/routinedata.json';

function Content({ routine_name, total_time, workouts }) {
  //translate total_time into minutes seconds
  return (
    <div className="content-container">
      <div className="content-header">
        <h1>{routine_name}</h1>
        <div>The button</div>
      </div>
      <h2 className="sub-header">Total time {total_time} minutes</h2>
      <div className="table-container">
        {workouts.map((workout) => {
          const { workout_id, workout_name } = workout;
          return (
            <div className="workout-container" key={workout_id}>
              <p>{workout_name}</p>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <button>new workout</button>
      </div>
    </div>
  );
}

export default Content;

/**
 * {data.map((routine) => {
        const { routine_id, routine_name, total_time, workouts } = routine;
        if (routine_id === 1) {
          return (
            <>
              <p>name : {routine_name}</p>
              <p>Total time: {total_time}</p>
              {workouts.map((workout) => {
                return (
                  <>
                    <p>{workout.workout_name}</p>
                    <p>{workout.workout_id}</p>
                  </>
                );
              })}
            </>
          );
        }
      })}
 */
