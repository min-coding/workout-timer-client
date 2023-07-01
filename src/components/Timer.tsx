import { useState, useEffect } from 'react';

function Timer({ durationsArray, workoutNameArray }) {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [time, setTime] = useState(
    durationsArray.length > 0 ? durationsArray[0] : 0
  );
  const [nextWorkoutIndex, setNextWorkoutIndex] = useState(1);
  const [timerStarted, setTimerStarted] = useState(false);
  const [firstStarted, setFirstStarted] = useState(false);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    let interval = null;

    if (timerStarted) {
      interval = setInterval(() => {
        setTime((prev) => prev - 10);
        if (time / 10 >= 60) {
          setMinute(Math.floor(time / 10 / 60));
          setSecond((time / 10) % 60);
        } else if (time / 10 < 60 && time !== 0) {
          setMinute(0);
          setSecond(time / 10);
        }
      }, 1000);

      if (time === 0) {
        clearInterval(interval);

        if (currentWorkoutIndex < durationsArray.length - 1) {
          setCurrentWorkoutIndex((prevIndex) => prevIndex + 1);
          setNextWorkoutIndex((prevIndex) => prevIndex + 1);
          speakNextWorkout(workoutNameArray[nextWorkoutIndex]);
          setTime(durationsArray[nextWorkoutIndex]);
        } else {
          setTimerStarted(false);
          setSecond((prev) => prev - 1);
          speakNextWorkout('End of the Workout!');
          console.log(`All done!`);
        }
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

  function handleStart() {
    if (!timerStarted) {
      speakNextWorkout(workoutNameArray[0]);
      setTime(durationsArray[currentWorkoutIndex]);
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
      {durationsArray.length === 0 && <button disabled>Start</button>}
      {!timerStarted &&
        time === durationsArray[0] &&
        currentWorkoutIndex === 0 &&
        !firstStarted && <button onClick={handleStart}>Start</button>}
      {timerStarted && time > 0 && <button onClick={handlePause}>Pause</button>}

      {!timerStarted && time > 0 && firstStarted && (
        <button onClick={handleResume}>Resume</button>
      )}
      {!timerStarted &&
        time === 0 &&
        currentWorkoutIndex === durationsArray.length - 1 && (
          <button onClick={handleReset}>Reset</button>
        )}
    </>
  );
}

export default Timer;
