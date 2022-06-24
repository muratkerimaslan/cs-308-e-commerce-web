// import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../auth/global_state";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
import HeaderBar from "../components/HeaderBar";
import CreditCard from "../components/CreditCard";

const CheckoutPage = () => {

    const[user] = useGlobalState('user');
    const [ccn,setCcn] = useState();
    const [ccv,setCcv] = useState();
    const [expMonth,setExpMonth] = useState();
    const [expYear,setExpYear] = useState();
    const [adress, setAdress] = useState('');



    const YearMonthOptions = (first,last) => {
        const row = [];
        
        for (var i = first; i <= last;i++)
        {
            row.push( <option value={i}>{i}</option>);
        }
        return row;
    }

    return(
        <>
            <HeaderBar/>
            <h1>
                You are at checkout page {user.username !== '' ? user.username : 'you need to login'};
            </h1>
            <form>
                <label>
                <h2>Enter the delivery adress:</h2>
                <input type="text"  placeholder = "Your adress"  style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setAdress(e.target.value) } />
                </label>
                       
                      
            </form>

            <h3> 
                Enter your credit card info below to buy the products you added to your cart 
            </h3>
            <CreditCard delivery_adress={adress} />
            
        </>
    )
}


export default CheckoutPage;
// {/* <form>
//                 <label>
//                     <p>Credit Card Number</p>
//                     <input type="text"  />
//                 </label>
//                 <label>
//                     <p>Security Code</p>
//                     <input type="text" />
//                 </label>
//                 <label>
//                     <br/> <br/>
//                     <h3> Expiration Date <br/> <br/>
//                         <small> month</small>
//                         <small> year</small>
//                     </h3>

//                     <select
//                         value={expMonth}
                        
//                         > 
//                             {YearMonthOptions(1,12)}
//                     </select>
//                     &nbsp;&nbsp;&nbsp; {/* to make space*/}
//                     <select
//                         value={expYear}
//                         > 
//                             {YearMonthOptions(22,40)}
//                     </select>
//                 </label>
//                 <div>
//                     <button type="submit" >Submit</button>
//                 </div>
//             </form> */}
   // <select
    //value={qty}
    //onChange={e => setQty(e.target.value) }> 
    //    {qtyOptions(book.stock_amount)}
    //    {/* list of  <option value={i}>{i}</option> */} 
    //</select>


    // THESE RESULT IN BAD USER EXPERIENCE, AS YOU CAN NOT GO BACK WITHOUT LOGGING IN, 
      // let navigate = useNavigate();

    // useEffect( () => {
    //     console.log("should go to login")
    //     if(user.username === ''){

    //       navigate("/Login")
    //     }
    //     else{
    //         console.log("Okay you can checkout ");
    //     }
    //   }, []); 

  // if (user.username === '')  // error : You should call navigate() in a React.useEffect(), not when your component is first rendered.
    // {
    //     console.log("sohuld navigate to login");
    //     navigate('/Login');
    // }