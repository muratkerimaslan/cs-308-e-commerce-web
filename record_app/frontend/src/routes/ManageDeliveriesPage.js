import HeaderBar from "../components/HeaderBar";
import { useEffect, useState } from "react";

import axios from "axios";
import { useGlobalState } from "../auth/global_state";



const ManageDeliveriesPage = () => {
    const [orders, setOrders] = useState([]);
    const [orderClickCount, setOrderClickCount] = useState(0);


    const handleDBAllOrders = () => { // not using useEffect as it will only be called inside IF block
        axios.get('http://localhost:8000/getOrder30/')
        .then(function (response) {
            console.log("handDBAllOrders called");
            console.log("response.data=", response.data);
            setOrders(response.data);
            console.log('orders=' , orders);
            
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect( () => {

        handleDBAllOrders();
        
    },[orderClickCount])

    const orderButton = (order) => {     
        if (order.status === 'In-transit'){
            return (
                <button onClick={ (e) => {
                    e.preventDefault();
                    setStatus(order, "Delivered");
                    
                } }> Deliver Order </button>
            )
        }
        else if (order.status === 'Processing'){
            return (
                <button onClick={ (e) => {
                    e.preventDefault();
                    setStatus(order, "In-transit");
                    
                } }> Send Cargo </button>
            )
        }
        else if (order.status === "Delivered"){
            return(
                <>
                    <p style={{color:'green'}}>The order has been delivered</p>
                </>
            )
        }
        else if (order.status === "Refund Request"){
            return(
                <>
                    <p style={{color:'red'}}>Refund request in review </p>
                </>
            )
        }
        else if (order.status === "Refunded"){
            return(
                <>
                    <p style={{color:'green'}}>Refunded </p>
                </>
            )
        }
        else
            return (<></>)
    }


    const setStatus = (order, sta) => {
        axios.post('http://localhost:8000/updateOrderStatus/' + order.order_id, {      
            status: sta,
          })
        .then(function (response) {
            console.log("DELIVERED POST REQUEST");
            console.log("res data=",response.data);
            setOrderClickCount(orderClickCount+1);
        })
        .catch(function (error) {
            console.log(error);   
        });
    }



    const useOrders = orders.map((order) => {
        // console.log("order:",order);
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

    return(
        <>
            <HeaderBar/>
            <ul className="order-container">
                {useOrders}
            </ul>
            
        </>

    )
}


export default ManageDeliveriesPage;