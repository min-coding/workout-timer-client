import { useState, useEffect } from 'react';

function Timer({ durationsArray, workoutNameArray }) {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [nextWorkoutIndex, setNextWorkoutIndex] = useState(1);
  const [timerStarted, setTimerStarted] = useState(false);
  const [firstStarted, setFirstStarted] = useState(false);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    let interval = null;

    if (!firstStarted) {
      setTime(durationsArray[0]);
    }
    /**
     * why are we not setting initial time to durationsArray[0]
     */
    console.log(`Use Effect runs!`);
    if (timerStarted) {
      interval = setInterval(() => {
        console.log(`Counting down time in setInterval! ${time}`);
        setTime((prev) => prev - 10);
      }, 1000);

      if (time <= 0) {
        clearInterval(interval);

        if (currentWorkoutIndex < durationsArray.length - 1) {
          console.log(`Before Current:${currentWorkoutIndex}`);
          setCurrentWorkoutIndex((prevIndex) => prevIndex + 1);
          console.log(`After Current:${currentWorkoutIndex}`);
          // what's actually happening here? why are we using updated nextworkout instead of updated current?
          console.log(`Before : ${nextWorkoutIndex}`);
          setNextWorkoutIndex((prevIndex) => prevIndex + 1);
          console.log(`After Next : ${nextWorkoutIndex}`);
          speakNextWorkout(workoutNameArray[nextWorkoutIndex]);
          setTime(durationsArray[nextWorkoutIndex]);
        } else {
          setTimerStarted(false);
          setSecond(0);
          speakNextWorkout('End of the Workout!');
        }
      } else {
        setMinute(Math.floor(time / 600));
        setSecond(Math.floor((time / 10) % 60));
      }
    }
    return () => clearInterval(interval);
  }, [
    currentWorkoutIndex,
    time,
    durationsArray,
    nextWorkoutIndex,
    timerStarted,
  ]);
  /**
   * time -> to update the render of time every second.
   */

  function handleStart() {
    if (!timerStarted) {
      speakNextWorkout(workoutNameArray[0]);
      // can we remove this?
      // setTime(durationsArray[currentWorkoutIndex]);
      setTimerStarted(true);
      setFirstStarted(true);
    }
  }
  function handlePause() {
    if (timerStarted) {
      setTimerStarted(false);
    }
  }

  function handleResume() {
    if (!timerStarted) {
      setTimerStarted(true);
    }
  }

  //works only end of routine
  function handleReset() {
    if (!timerStarted) {
      setTime(durationsArray[0]);
      setCurrentWorkoutIndex(0);
      setNextWorkoutIndex(1);
      setTimerStarted(false);
      setFirstStarted(false);
    }
  }

  function speakNextWorkout(text) {
    const message = new SpeechSynthesisUtterance(text);
    message.volume = 5;
    message.rate = 0.75;
    message.pitch = -20;

    // Optional: Specify the language and voice
    message.lang = 'en-US';
    message.voice = speechSynthesis.getVoices()[0];

    speechSynthesis.speak(message);
  }

  return (
    <>
      <div className="timer-container">
        {firstStarted && (
          <h2>
            {minute} min {second} sec
          </h2>
        )}
      </div>
      {durationsArray.length === 0 && (
        <button className="timer-btn" disabled>
          Start
        </button>
      )}
      {durationsArray.length !== 0 &&
        !timerStarted &&
        time === durationsArray[0] &&
        currentWorkoutIndex === 0 &&
        !firstStarted && (
          <button className="timer-btn" onClick={handleStart}>
            Start
          </button>
        )}
      {timerStarted && time > 0 && (
        <button className="timer-btn" onClick={handlePause}>
          Pause
        </button>
      )}

      {!timerStarted && time > 0 && firstStarted && (
        <button className="timer-btn" onClick={handleResume}>
          Resume
        </button>
      )}
      {!timerStarted &&
        time <= 0 &&
        currentWorkoutIndex === durationsArray.length - 1 && (
          <button className="timer-btn" onClick={handleReset}>
            Reset
          </button>
        )}
    </>
  );
}

export default Timer;
