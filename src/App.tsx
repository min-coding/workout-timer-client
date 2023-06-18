import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Plan from './pages/Plan';
import Profile from './pages/Profile';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/Plan" element={<Plan></Plan>} />
        <Route path="/signup" element={<Profile></Profile>} />
        <Route path="/profile" element={<Profile></Profile>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
