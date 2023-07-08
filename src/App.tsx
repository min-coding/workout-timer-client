import { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Plan from './pages/Plan';
import Home from './pages/Home';
import Signup from './pages/Signup';

interface Workout {
  workout_id: number;
  workout_name: string;
  duration: number;
  created_at: string;
  updated_at: string;
}

interface Routine {
  routine_id: number;
  routine_name: string;
  total_time: number;
  workouts: Workout[];
}

interface RoutineContext {
  routines: Routine[] | undefined;
  setRoutines: React.Dispatch<React.SetStateAction<Routine[] | undefined>>;
}

export const RoutineContext = createContext<RoutineContext>(
  {} as RoutineContext
);
function App() {
  const [routines, setRoutines] = useState<Routine[] | undefined>([]);
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
