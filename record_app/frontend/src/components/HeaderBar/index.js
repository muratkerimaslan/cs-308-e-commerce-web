
import { Link, useLocation, } from "react-router-dom";
import './HeaderBar.css'
import { useState } from "react";
import { useGlobalState } from "../../auth/global_state";

const HeaderBar = ({home_search_term , setHomeSearchTerm} ) => { // home search term isn't used right now, as we only set its value, to pass to listview, we don't use its value inside headerbar
    const [{username}] = useGlobalState('user');
    const [{user_id}] = useGlobalState('user');
    const [{numItems}] = useGlobalState('cart'); // from cart
    const [barSearchTerm, setBarSearchTerm] = useState('');

    let current_adress = useLocation(); // to check if we are in cart page or not, to display checkout page
    console.log("location = ");
    console.log(current_adress);
    // console.log(username);
    // console.log("Cart items = ");
    // console.log(cartNumItems2);
    const searchSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
        console.log(barSearchTerm);
        setHomeSearchTerm( barSearchTerm);
        setBarSearchTerm(''); // clears the field;
        
    }

    //genres:
    const genres = ["Fiction","Fantasy","Adventure","Science Fiction","Classic"];

    // const flushSearches = (e) => // breaks the Login and Cart Global states somehow
    // {
    //     // e.preventDefault();
    //     // setHomeSearchTerm( '' );
    //     // setBarSearchTerm( '' );
    // }

    const GenreListItems = genres.map(
        (genre) => {
            let address = "/Genres/" + genre;
            
            return(<li> 
                <Link to = {address}   > {genre} </Link> 
            </li>
        )
            }
    )


    return(
        
        <div>
        <ul className="header-bar" >
            <li> <Link to='/'> Home </Link></li>
            { GenreListItems}
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
                (current_adress.pathname === '/Cart') ?    // if is in CartPage
                <li>  
                  <Link to = {(username === '') ? '/Login' : '/Checkout' }> Checkout</Link><br/>
                  <p style={{color:'rgb(17, 71, 121)', fontWeight:'600'}}> subtotal ({numItems} items) </p>
                </li>  : 
                // else
                <>                 
                <li>
                    <Link to = '/Cart'> MyCart</Link><br/>
                    <p style={{color:'rgb(17, 71, 121)', fontWeight:'600'}}> subtotal ({numItems} items) </p>
                </li>  
                </>
            }
            

            {
                (user_id !== '' && user_id <= 2) ? 
                <>
                    <li> Product Manager {username} </li>
                    <li> <Link to='/ProductManagerPage'> Manage Product </Link></li>
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