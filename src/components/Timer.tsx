import { useState, useEffect } from 'react';

function Timer({
  durationsArray,
  workoutNameArray,
}: {
  durationsArray: number[];
  workoutNameArray: string[];
}) {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [nextWorkoutIndex, setNextWorkoutIndex] = useState<number>(1);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [firstStarted, setFirstStarted] = useState<boolean>(false);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!firstStarted) {
      setTime(durationsArray[0]);
    }
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
          setNextWorkoutIndex((prevIndex) => prevIndex + 1);
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
  }, [time, durationsArray, timerStarted]);

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

  function handleReset() {
    if (!timerStarted) {
      setTime(durationsArray[0]);
      setCurrentWorkoutIndex(0);
      setNextWorkoutIndex(1);
      setTimerStarted(false);
      setFirstStarted(false);
    }
  }

  function speakNextWorkout(text: string) {
    const message = new SpeechSynthesisUtterance(text);
    message.volume = 5;
    message.rate = 0.75;
    message.pitch = -20;
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
