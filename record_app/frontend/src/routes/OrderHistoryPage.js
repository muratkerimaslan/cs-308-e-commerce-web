import { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { useGlobalState } from "../auth/global_state";
import "../components/ListView/ListView.css"



const OrderHistoryPage = () => {

    const [orderHistory, setOrderHistory] = useState([]);
    const [orderClickCount, setOrderClickCount] = useState(0);
    const [{user_id}] = useGlobalState('user')
    
    //    path('getOrders/<str:pk>/', views.getOrders),

    const handleDBLoadUserOrderHistory = () => { // not using useEffect as it will only be called inside IF block
        axios.get('http://localhost:8000/getOrders/' + user_id )
        .then(function (response) {
            console.log("handDBloaduseOrderHistory called");
            console.log("response.data=", response.data);
            setOrderHistory(response.data);
            console.log('history=' , orderHistory);
            
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

    },[orderClickCount])

    const orderButtonClick = (order, sta) => {
        axios.post('http://localhost:8000/updateOrderStatus/' + order.order_id, {
            status: sta
          })
          .then(function (response) {
            console.log("orderbutton response = " ,  response);
            alert("Your request has been acknowledged")
            setOrderClickCount(orderClickCount+1);
          })
          .catch(function (error) {
            console.log(error);   
          });
    }

        
    


    
    const orderButton = (order) => {
        if (order.status === 'Processing' || order.status === 'In-transit')
        {
            return(
            <button onClick={(e) => {
                e.preventDefault();
                orderButtonClick(order,'Refund Request');
                
                axios.get('http://localhost:8000/refund/' + order.order_id, { 
                    })
                    .then(function (response) {
                        console.log("REFUND GET REQUEST");
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);   
                    });

                orderButtonClick(order, "Cancelled");
            }}> Cancel Order </button>
            )
        }
        else if (order.status === 'Delivered'){
            return (
            <button onClick={ (e) => {
                e.preventDefault();
                orderButtonClick(order,'Refund Request');
            } }
            > Ask for Refund </button>
            )
        }
        else if (order.status === 'Cancelled'){ // delete this one before final, just for test purposes
            return (
            <button onClick={ (e) => {
                e.preventDefault();
                orderButtonClick(order,'Delivered');
            } }
            > Re-order </button>
            )
        }
   
        else if (order.status === 'Refund Request'){
            return (
                <>
                <p style={{color:'red'}}> Refund request in review</p>
                </>
            )
        }
        else if (order.status === 'Refunded')
        {
            <p style={{color:'green'}} > Your money has been refunded  </p>
        }
        else{
            return(<></>)
        }

           
        
    }

    const useOrderHistory = orderHistory.map((order) => {
        console.log("order:",order);
        return(
            <div>         
                <li className="order-container">
                    <div>        
                       
                        <p>Order ID: {order.order_id}</p>
                        <p>Status: {order.status}</p>
                        <p>Total Amount: {order.total}$</p>
                        <h5>Date: {order.date.slice(0,10)}</h5>
                        <h5>Time: {order.date.slice(11,16)}</h5>
                        {orderButton(order)}
                       
                                  
                    </div>
                </li>
            </div>
        )
    })



    

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
            <ul className="order-container">
                {useOrderHistory}
            </ul>
            
        </>

    )
}


export default OrderHistoryPage;