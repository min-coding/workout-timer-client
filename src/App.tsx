import { useState, createContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Plan from './pages/Plan';
import Profile from './pages/Profile';
import axios from 'axios';
import Home from './pages/Home';
import Signup from './pages/Signup';

export const RoutineContext = createContext();

function App() {
  const [routines, setRoutines] = useState([]);

  return (
    <RoutineContext.Provider value={{ routines, setRoutines }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/signin" element={<SignIn></SignIn>} />
          <Route path="/plan" element={<Plan></Plan>} />
          <Route path="/plan/:routineId" element={<Plan></Plan>} />
          <Route path="/profile/:userId" element={<Plan></Plan>} />
          <Route path="/workout/:workoutId" element={<Plan></Plan>} />
          <Route path="/signup" element={<Signup></Signup>} />
        </Routes>
      </BrowserRouter>
    </RoutineContext.Provider>
  );
}

export default App;
