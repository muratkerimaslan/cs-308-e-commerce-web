// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './routes/Login.js';
import SignUp from './routes/SignUp.js';
import Home from './routes/Home.js';
import CartPage from './routes/CartPage';
import BookPage from './routes/BookPage';
import ProductManagerPage from './routes/ProductManagerPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/' element = {<Home/>}/>  
        <Route path='/Login' element = {<Login/>} />
        <Route path ='/SignUp' element = {<SignUp/>}/>
        <Route path ='/Cart' element = {<CartPage/>}/>
        <Route path ='/ProductManagerPage' element = {<ProductManagerPage/>}/>
        <Route path="Book">
          <Route path=":bookId" element={<BookPage />} />
        </Route>
        {/* <Route path = 'Genres/:genre' element={<Home/>} /> */}
        <Route exact path="Genres">
          <Route path=":genre" element={<Home />} />
        </Route>
       </Routes>
    </Router>
   
  );
}

export default App;