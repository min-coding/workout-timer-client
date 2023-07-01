import React, { useEffect, useRef, useState } from 'react';

function Timer({
  duration,
  index,
  currentTimerIndex,
  setCurrentTimerIndex,
  workoutCount,
  durationsArray,
}) {
  //keep interval id in ref, bc it's not needed for rendering. every rerender by time, it sill persists
  const intervalRef = useRef(null);

  //state to render time counting down
  const [time, setTime] = useState(duration);

  function startTimer() {
    clearInterval(intervalRef.current);

    //countdown by setting new Time every 1 second
    intervalRef.current = setInterval(() => {
      if (time > 0) {
        setTime((prev) => {
          if (prev > 10) return prev - 10;
          else if (prev <= 10) {
            clearInterval(intervalRef.current);
            console.log('Times up');
            return 0;
          }
        });
      }
    }, 1000);
  }

  function handleStart() {
    console.log('Start!');
    startTimer();
  }

  function handlePause() {
    console.log('Pause!');
    clearInterval(intervalRef.current);
  }

  function handleReset() {
    console.log('Reset to 1st interval!!');
    clearInterval(intervalRef.current);
    setTime(duration);
  }

  return (
    <div>
      <h1>{time}</h1>

      <button onClick={handleStart}>Start</button>

      <button onClick={handlePause}>Pause</button>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Timer;
