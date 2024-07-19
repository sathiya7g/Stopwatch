// Stopwatch.jsx
import React, { useState, useRef } from 'react';
import './App.css';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef();

  const startPauseTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };
  

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const pad = (num, size) => ('000' + num).slice(size * -1);
    const milliseconds = pad(time % 1000, 3);
    const seconds = pad(Math.floor((time / 1000) % 60), 2);
    const minutes = pad(Math.floor((time / (1000 * 60)) % 60), 2);
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="time">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={startPauseTimer}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer} disabled={isRunning}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;