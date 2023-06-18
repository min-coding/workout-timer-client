import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import data from '../data/routinedata.json';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Content from '../components/Content';

function Plan() {
  const [isActive, setIsActive] = useState(0);

  function handleSidebar(routineId) {
    setIsActive(routineId);
  }

  return (
    <div className="container">
      <Topbar></Topbar>
      <Sidebar chooseRoutine={handleSidebar} isActive={isActive}></Sidebar>
      {data.map((routine) => {
        const { routine_name, routine_id, total_time, workouts } = routine;
        if (routine_id === isActive) {
          return (
            <Content
              key={routine_id}
              routine_name={routine_name}
              total_time={total_time}
              workouts={workouts}></Content>
          );
        }
      })}
    </div>
  );
}

export default Plan;
/**
 * Always fetch user info and routine 1 as a default.
 *
 */
