import HeaderBar from "../components/HeaderBar";
import { useEffect, useState } from "react";
import axios from "axios";



const ManageRefundsPage = () => {

    const [orders, setOrders] = useState([]);
    const [orderClickCount, setOrderClickCount] = useState(0);
    //    path('getOrders/<str:pk>/', views.getOrders),

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




    const refund = (order) => {
        
        axios.get('http://localhost:8000/refund/' + order.order_id, { 
        })
        .then(function (response) {
            console.log("REFUND GET REQUEST");
            console.log("res data=",response.data);
            setOrderClickCount(orderClickCount+1);
            alert("The order is refunded");
        })
        .catch(function (error) {
            console.log(error);   
        });
    }

 
    const orderButton = (order) => {     
        if (order.status === 'Refund Request'){
            return (
                <button onClick={ (e) => {
                    e.preventDefault();
                    refund(order);
                    
                } }> Refund </button>
            )
        }
        else if (order.status === 'Refunded'){
            return (
                <>
                    <p style={{color:'green'}}> Refunded</p>
                </>
            )
        }
        else{
            return(<></>)
        }
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


export default ManageRefundsPage;