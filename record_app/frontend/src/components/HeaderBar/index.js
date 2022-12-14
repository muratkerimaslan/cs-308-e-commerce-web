
import { Link, useLocation, } from "react-router-dom";
import './HeaderBar.css'
import { useState } from "react";
import axios from "axios";
import { setGlobalWishlistAddBook, useGlobalState } from "../../auth/global_state";
import { useEffect } from "react";


const HeaderBar = ({home_search_term , setHomeSearchTerm} ) => { // home search term isn't used right now, as we only set its value, to pass to listview, we don't use its value inside headerbar
    const [{username}] = useGlobalState('user');
    const [{user_id}] = useGlobalState('user');
    const [{numCartItems}] = useGlobalState('cart'); // from cart
    const [{numWishlistItems}] = useGlobalState('wishlist'); // from cart
    // const [{numCartItems}] = useGlobalState('cart'); // from order history
    // console.log('Numwish = ' + numWishlistItems);
    const [barSearchTerm, setBarSearchTerm] = useState('');
    const [newGenres, setNewGenres] = useState([]);

    let current_adress = useLocation(); // to check if we are in cart page or not, to display checkout page
    // console.log("location = ");
    // console.log(current_adress);
    // console.log(username);
    // console.log("Cart items = ");
    // console.log(cartNumItems2);

    const handleDBLoadWishlistBook = (bookId) => { // helper for loadwishlist and set frontend Global inside this because of async nature of axiso get
        axios.get('http://localhost:8000/books/' + bookId)
        .then(function (response) {
        // setLoadedBooksDict((prev) => ({...prev, bookId:response.data }));
        setGlobalWishlistAddBook(response.data);
        })
        .catch(function (error) {
        console.log(error);
        });
}


    const handleDBGetGenres = () => { // helper for loadwishlist and set frontend Global inside this because of async nature of axiso get
        axios.get('http://localhost:8000/getAllGenres')
        .then(function (response) {
        // setLoadedBooksDict((prev) => ({...prev, bookId:response.data }));
        setNewGenres(response.data);
        console.log("newGenres:");
        console.log(newGenres);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const handleDBLoadUserWishlist = () => { // not using useEffect as it will only be called inside IF block
        axios.get('http://localhost:8000/getWishlistItems/' + user_id )
        .then(function (response) {
            //console.log("handDBloaduserWishlist");
            //console.log(response.data); 
            for (const wishlistItem of response.data) { // response.data = cartItems {book:2 , amount: 1}  => book_id; other fields in cartItem is useless
                handleDBLoadWishlistBook(wishlistItem.book) // carItem.book = bookID; not the book object for some reason 
            }
        })
        .catch(function (error) {
          console.log(error);
        });
}
    useEffect( () => {
        handleDBGetGenres();
        if (user_id !== '')
        {
            handleDBLoadUserWishlist();
        }

    }, [] )





    const searchSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
        console.log(barSearchTerm);
        setHomeSearchTerm( barSearchTerm);
        setBarSearchTerm(''); // clears the field;
        
    }

    //genres:
    const genres = ["Fiction","Fantasy","Science Fiction","Classic"];

    // const flushSearches = (e) => // breaks the Login and Cart Global states somehow
    // {
    //     // e.preventDefault();
    //     // setHomeSearchTerm( '' );
    //     // setBarSearchTerm( '' );
    // }



    const GenreListItems = genres.map(
        (genre) => {
            let address = "/Genres/" + genre;
            
            return(
            <li> 
                <Link to = {address} > {genre} </Link> 
            </li>
            )
        }
    )

    const DropDownGenres = newGenres.map((genre) => {

        if (genres.includes(genre)){
            return (<></>)
        }
            let address = "/Genres/" + genre;
            return (<Link to = {address} > {genre} </Link> )


    })


/*         <div class="dropdown">
        <button class="dropbtn">Dropdown</button>
        <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div>
        </div> */

    return(
        
        <div>
        <ul className="header-bar" >
            <li> <Link to='/'> Home </Link></li>
            { GenreListItems}

            <div class="dropdown">
                <button class="dropbtn">Other</button>
                <div class="dropdown-content">
                        {DropDownGenres}
                </div>
            </div>

            <li>
               
    <               form onSubmit={searchSubmit}>
    
                        {/* <label className="search-bar"> */}
                        {/* <label htmlFor="search-bar"> Search Bar </label><br/> */}
                        <input value={barSearchTerm} type="text" id="search-bar" placeholder="Search" onChange={(e) => setBarSearchTerm(e.target.value) }/>
                    </form>
                
            </li>

            {
                (username !== "") ? <li> Welcome {username} </li> :                
                <> 
                    <li> <Link to='/Login'> Login </Link></li>
                    <li> <Link to ='/SignUp'> SignUp </Link> </li>
                </>
            }
            {
                (current_adress.pathname === '/Cart' && numCartItems > 0) ?    // if is in CartPage
                <li>  
                  <Link to = {(username === '') ? '/Login' : '/Checkout' }> Checkout</Link><br/>
                  <p style={{color:'rgb(17, 71, 121)', fontWeight:'600'}}> subtotal ({numCartItems} items) </p>
                </li>  :
                // else
                <>                 
                <li>
                    <Link to = '/Cart'> MyCart</Link><br/>
                    <p style={{color:'rgb(17, 71, 121)', fontWeight:'600'}}> subtotal ({numCartItems} items) </p>
                </li>  
                </>
            }
            {
                (user_id !== '') ?
                <>
                    <li> 
                        <Link to='/Wishlist'> Wishlist </Link>
                        <p style={{color:'rgb(17, 71, 121)', fontWeight:'600'}}> ({numWishlistItems} items in discount) </p>
                    </li>
                    <li>
                        <Link to = '/OrderHistoryPage'> Order History</Link><br/>
                    </li>  
                </>
                :
                <>
                </>
               
            }

            {
                (user_id !== '' && user_id <= 15) ?  // product manager ##??id = 14 15
                <>
                    <li style={{color:'red' , fontWeight:'600'}}> (Product Manager {username} =&gt;) </li>
                    <li> <Link to='/ManageCommentsPage' style={{color:'red'}}> Manage Comments </Link></li>
                    <li> <Link to='/ManageProductsPage' style={{color:'red'}}> Manage Products </Link></li>
                    <li> <Link to='/ManageDeliveriesPage' style={{color:'red'}}> Manage Deliveries </Link></li>

                </>              
                :
                <></>
            }

            {

                (user_id !== '' && user_id > 15 && user_id <= 17) ?  // sales manager  ##??id = 16 17
                <>
                    <li style={{color:'blue' , fontWeight:'600'}}> (Sales Manager {username} =&gt;) </li>
                    <li> <Link to='/ManagePricesPage' style={{color:'blue'}}> Manage Prices </Link></li>
                    <li> <Link to='/ManageRefundsPage' style={{color:'blue'}}> Manage Refunds </Link></li>
                    <li> <Link to='/SaleStatsPage' style={{color:'blue'}}> Sale Statistics </Link></li>
                </>              
                :
                <></>

            }

        </ul>
        </div>


    )





}

export default HeaderBar


//   {/* <label className="search-bar"> */}
//   <label for="search-bar"> Search Bar </label><br/>
//   <input type="text" id="search-bar"/>