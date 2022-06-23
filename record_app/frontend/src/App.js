// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './routes/Login.js';
import SignUp from './routes/SignUp.js';
import Home from './routes/Home.js';
import CartPage from './routes/CartPage';
import BookPage from './routes/BookPage';
import CheckoutPage from './routes/CheckoutPage';
import ManageCommentsPage from './routes/ManageCommentsPage';
import ManageProductsPage from './routes/ManageProductsPage';
import WishlistPage from './routes/WishlistPage';
import OrderHistoryPage from './routes/OrderHistoryPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/' element = {<Home/>}/>  
        <Route path='/Login' element = {<Login/>} />
        <Route path ='/SignUp' element = {<SignUp/>}/>
        <Route path ='/Cart' element = {<CartPage/>}/>
        <Route path ='/ManageCommentsPage' element = {<ManageCommentsPage/>}/>
        <Route path ='/Wishlist' element = {<WishlistPage/>}/>
        <Route path ='/ManageProductsPage' element = {<ManageProductsPage/>}/>
        <Route path ='/OrderHistoryPage' element = {<OrderHistoryPage/>}/>
        <Route path="Book">
          <Route path=":bookId" element={<BookPage />} />
        </Route>
        {/* <Route path = 'Genres/:genre' element={<Home/>} /> */}
        <Route path="Genres">
          <Route path=":genre" element={<Home />} />
        </Route>
        <Route path='/Checkout' element={<CheckoutPage/>}   />
       </Routes>
    </Router>
   
  );
}

export default App;
