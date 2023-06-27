import React, { useEffect, useRef, useState } from 'react';

function Timer({ total_time, durationsArray }) {
  // 1 second = 1000 milliseconds.

  //keep interval id in ref, bc it's not needed for rendering. every rerender by time, it sill persists
  const intervalRef = useRef(null);

  //state to render time counting down
  const [time, setTime] = useState(0);

  const [isCounting, setIsCounting] = useState(false);
  // const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const currentWorkoutIndexRef = useRef(0);

  // //update time, if update workout time
  // useEffect(() => {
  //   setCurrentWorkoutIndex(0);
  //   setTime(durationsArray[currentWorkoutIndex]);
  //   return () => clearInterval(intervalRef.current);
  // }, [total_time]);

  // /**
  //  *   useEffect(() => {
  //   if (currentWorkoutIndex >= 0 && currentWorkoutIndex < durationsArray.length) {
  //     setTime(durationsArray[currentWorkoutIndex]);
  //   }
  // }, [currentWorkoutIndex, durationsArray]);
  //  */

  // function handleStart() {
  //   clearInterval(intervalRef.current);
  //   setIsCounting(true);

  //   //check what index it is at
  //   intervalRef.current = setInterval(() => {
  //     setTime((prev) => {
  //       if (prev - 10 >= 0) {
  //         console.log(prev);
  //         return prev - 10;
  //       } else if (prev === 0) {
  //         console.log(`im ready to move to next or might be the end?`);
  //         console.log(`current index ${currentWorkoutIndex}`);
  //         console.log(
  //           `Next workout set to ${durationsArray[currentWorkoutIndex + 1]}`
  //         );
  //         setCurrentWorkoutIndex((prev) => prev + 1);
  //         console.log(`updated index = ${currentWorkoutIndex}`);
  //         return durationsArray[currentWorkoutIndex + 1];
  //       }
  //     });
  //     console.log(`A second passed`);
  //   }, 1000);
  // }
  //update time, if update workout time
  useEffect(() => {
    setTime(durationsArray[currentWorkoutIndexRef.current]);
    return () => clearInterval(intervalRef.current);
  }, [total_time]);

  function handleStart() {
    clearInterval(intervalRef.current);
    setIsCounting(true);
    //check what index it is at
    intervalRef.current = setInterval(() => {
      //the condition is the same with inside , need another condition
      // console.log(`Time ${time}`);
      // console.log(`Index ${currentWorkoutIndexRef.current}`);
      setTime((prev) => {
        if (prev - 10 >= 0) {
          return prev - 10;
        } else if (prev === 0) {
          //if it's the not the last index,
          if (currentWorkoutIndexRef.current < durationsArray.length - 1) {
            console.log(
              `Now ${currentWorkoutIndexRef.current} || Update current Index ${
                currentWorkoutIndexRef.current + 1
              }`
            );
            return prev + durationsArray[currentWorkoutIndexRef.current++];
          }
          //if it's the last index, don't add
          else if (
            currentWorkoutIndexRef.current ===
            durationsArray.length - 1
          ) {
            console.log(`I am the last of routine`);
            return prev + durationsArray[currentWorkoutIndexRef.current];
          }
        }
      });
    }, 1000);
  }

  //handle stop clear interval
  function handlePause() {
    //clear the saved interval id
    clearInterval(intervalRef.current);
    currentWorkoutIndexRef.current = 0;
    setIsCounting(false);
  }
  return (
    <div>
      <h1>{time}</h1>
      {!isCounting && <button onClick={handleStart}>Start</button>}
      {!isCounting && time !== total_time && time !== 0 && (
        <button onClick={handleStart}>Resume</button>
      )}

      <button onClick={handlePause}>Pause</button>

      <button
        onClick={() => {
          clearInterval(intervalRef.current);
          setTime(durationsArray[0]);
        }}>
        Reset
      </button>
    </div>
  );
}

export default Timer;
