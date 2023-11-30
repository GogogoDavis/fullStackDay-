import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { Home } from './components/home';

function App() {

  return (


    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>
  );
}

export default App;
