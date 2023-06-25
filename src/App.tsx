import { useState, createContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Plan from './pages/Plan';
import Profile from './pages/Profile';
import axios from 'axios';

export const RoutineContext = createContext();

function App() {
  const [routines, setRoutines] = useState([]);

  return (
    <RoutineContext.Provider value={{ routines, setRoutines }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/plan" element={<Plan></Plan>} />
          <Route path="/plan/:routineId" element={<Plan></Plan>} />
          <Route path="/profile/:userId" element={<Plan></Plan>} />
          {/* <Route path="/signup" element={<Profile></Profile>} /> */}
        </Routes>
      </BrowserRouter>
    </RoutineContext.Provider>
  );
}

export default App;
