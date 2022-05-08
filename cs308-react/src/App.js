import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUpForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/Home';

function App() {
  const User = 5;
  return (

    <Router>  
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/SignUp' element={<SignUp />}/>
        </Routes>
    </Router>
  );
}

export default App;
