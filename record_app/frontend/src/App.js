// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './routes/Login.js';
import SignUp from './routes/SignUp.js';
import Home from './routes/Home.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/' element = {<Home/>}/>  
        <Route path='/Login' element = {<Login/>} />
        <Route path ='/SignUp' element = {<SignUp/>}/>
       </Routes>
    </Router>
   
  );
}

export default App;
