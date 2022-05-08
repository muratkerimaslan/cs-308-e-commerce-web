

// import { Link } from "react-router-dom";
import { setGlobalUserRecentlyLoggedIn,setGlobalCartRemoveBook,useGlobalState, } from "../../auth/global_state";
import axios from "axios";
import AddToCartButton from "../AddToCartButton";
const CartList = () => {
    const [cart] = useGlobalState('cart');
    const [user] = useGlobalState('user');
    console.log("user == " );
    console.log(user);
    console.log("cart = ");
    console.log(cart);
    // if (user.username === ""){ // not signedin;
    //     console.log("cart without checking backend = ");
    //     console.log(cart);
    // }
    if (cart.numItems === 0 ){
        console.log("CART is empty");
        
    }
    if (user.username !== "" && user.recently_logged_in === true) // logging in and checking cart for the first time
    {
        setGlobalUserRecentlyLoggedIn(false); // set recent_logged_in field to false;

        //flush cart;
        console.log("flushing cart");
        for (const [cur_key, cur_value] of Object.entries(cart.Items_Id)) {
            console.log("cur_item");
            console.log(cur_key);
            // console.log(cur_value);
            setGlobalCartRemoveBook(cur_key); // chec
          }
        // use effect downlaod new
    }
    // useEffect(() => {
        //     const handleDB = () => {
        //         const res = axios.get('http://localhost:8000/books')
        //         .then(function (response) {
        //           setBooks(response.data);
        //         })
        //         .catch(function (error) {
        //           console.log(error);
        //         });
        //     }
        //     handleDB();
        // }, []);
    
    console.log("user == " );
    console.log(user);
    // path('getCartItems/<str:pk>/', views.getCartItems),
    // path('addCartItem/<str:pk>', views.addCartItem),
    // path('deleteCartItem/<str:b_pk>/<str:u_pk>', views.deleteCartItem),
    const handleDBDeleteFromCart = (bookId) => {
        axios.delete('http://localhost:8000/deleteCartItem/' + bookId + '/' + user.user_id )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const RemoveFromCart = (e,book_id) => { // add to cart is in addtocartbutton component
        e.preventDefault();
        setGlobalCartRemoveBook(book_id);
        handleDBDeleteFromCart(book_id);

    }
   
    const CartListItems2 = Array.from(cart.Items.entries()).map((entry) => {
        const [key , val] = entry; // key = bookId, val = {book object , qty : 2}
        return(
            <li>
                <div>   
                <p> id : {key}</p> 
                <p> title : {val.book.title}</p> 
                {
                    
                    (val.qty) > 1 ? <p> price : {val.book.price} * {val.qty} =  {parseInt(val.book.price) * parseInt(val.qty)}</p>
                    : <p> price : {val.book.price} </p>
                }
                
                <p> num : {val.qty}</p>
                </div>
                <AddToCartButton book={val.book} msg={"update quantity"} init_qty={val.qty} />
                <button type="submit" onClick={ (e) => RemoveFromCart(e,key) } >
                    remove
                </button>
            </li>)
}
    )
    return(
        <>
            <h1>
                This is cart List:
            </h1>
            <br/>
            <h2>
                total_num = 
                {cart.numItems}
                <br/>
                <ul>
                    {CartListItems2}
                </ul>
              
            </h2>
         
        </>
    )

}

export default CartList;


  /* <button onClick={ (e) =>  setCartNew({book_id : 123},9)  }>
                addnewID
            </button>
            <button onClick={ (e) =>  setCartNew({book_id : 324},1)  }>
                addnewID
            </button>
            <button onClick={ (e) =>  setCartNew({book_id : 234},2)  }>
                addnewID
            </button>
            <button onClick={ (e) =>  setCartNew({book_id : 345},3)  }>
                addnewID
            </button> */


    // const [my_cartItems2] = useGlobalState('cartItems2');
    // const [cartNumItems2] = useGlobalState('cartNumItems2');
    // const [c] = useGlobalState('count');
    // console.log(cartNumItems2);
    // console.log("cartitems2 = ");
    // console.log(my_cartItems2);
    // setCartItems2New(456,5);
    // setCartItems2New(123,3);
    // console.log(my_cartItems2);


     // function my_button (e){
    //     // e.preventDefault();
    //     // setCartItems2New(8988,2);
    //     countUp();
    //     console.log(my_cartItems2);
    // }

     // const listItems = Object.entries(my_cartItems2).map( ([key,val]) =>
    // (
    //     <li>
    //         id : {key} qty: {val}
    //     </li>
    // )
    // )

    //   {/* id = 
    //             {Object.keys(my_cartItems2)[0]}
    //             <br/>
    //             num =
    //             {my_cartItems2[323]}
    //             <br/> */}



//     const CartListItems2 = Object.entries(cart.Items).map( ([key,val]) =>
//     (
//         <li>
//             <div>
//             {/* Array.from(myHashMap.entries()).map((entry) => {
//     const [key, value] = entry;
//     return (<MyComponent myKey={key} myValue={value} />); */}
// }   
                
//             <p> id : {key.book_id}</p> 
//             <p> num : {val}</p>
//             </div>
           
//         </li>
//     )