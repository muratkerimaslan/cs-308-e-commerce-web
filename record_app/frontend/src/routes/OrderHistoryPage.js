import { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { useGlobalState } from "../auth/global_state";



const OrderHistoryPage = () => {

    const [orderHistory,setOrderHistory] = useState(''); 
    const [{user_id}] = useGlobalState('user')
    
    //    path('getOrders/<str:pk>/', views.getOrders),

    const handleDBLoadUserOrderHistory = () => { // not using useEffect as it will only be called inside IF block
        axios.get('http://localhost:8000/getOrders/' + user_id )
        .then(function (response) {
            console.log("handDBloaduseOrderHistory");
            console.log(response.data);
            setOrderHistory('ffff');
            console.log('history = ');
            console.log(orderHistory);
        })
        .catch(function (error) {
          console.log(error);
        });
}
    useEffect( () => {
        if (user_id !== '')
        {
            handleDBLoadUserOrderHistory();
        }

    }, [] )


    

//     const userHistoryItems = Array.from(wishlist.Items.entries()).map((entry) => {
//         const [key , val] = entry; // key = bookId, val = {book object , qty : 2}
//         console.log('')
//         return(
//             <li key = {val.book.book_id}>
//                 <div className="my-cart-item">        
                
//                     <img
//                         alt = "URL not found"
//                         src = {val.book.image_link}   
//                         width="200"
//                         height="320"                
//                     />
//                     <h3 className="title">{val.book.title}</h3>            

//                 <div className="descriptions">
//                     <h3 style={{display:'inline-block'}}> price :</h3>

//                     {   

                    
//                         (parseFloat(val.book.discount_rate)) > 0 ? <h3 style={{ display:'inline-block', textDecoration:'line-through', 
//                                 textDecorationThickness:'2px', textDecorationColor:'red'}} > {val.book.original_price} $</h3>
//                         :
//                         <>
//                         </>
                      
//                     }
//                     <h3 style={{display:'inline-block',paddingLeft:'8px'}}> {val.book.price} $ </h3>
//                     <h4>rating = {val.book.rating}</h4>
//                     <h4>{val.book.genre}</h4>
//                     <br/>
//                     <AddToCartButton book={val.book} msg={"update quantity"} init_qty={val.qty} />
//                     <AddToWishlistButton  book = {val.book} init_is_in_wishlist={true} />
//                 </div>
//                 </div>
//             </li>
//         )
// })

    return(
        <>
            <HeaderBar/>
            
        </>

    )
}


export default OrderHistoryPage;