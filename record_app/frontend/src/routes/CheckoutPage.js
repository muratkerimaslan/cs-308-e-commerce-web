// import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../auth/global_state";
import CartList from "../components/CartList";
// import { useEffect } from "react";
import HeaderBar from "../components/HeaderBar";

const CheckoutPage = () => {

    const[user] = useGlobalState('user');

    const qtyOptions = (first,last) => {
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
            <h2> 
                Enter your credit card info below 
            </h2>
            <form>
                <label>
                    <p>Credit Card Number</p>
                    <input type="text"  />
                </label>
                <label>
                    <p>Security Code</p>
                    <input type="text" />
                </label>
                <label>
                    <p> Expiration Date <br/> <br/>
                        <small> month</small>
                        <small> year</small>
                    </p>

                    <select
                        value={11}
                        > 
                            {qtyOptions(1,12)}
                    </select>
                    &nbsp;&nbsp;&nbsp; {/* to make space*/}
                    <select
                        value={11}
                        > 
                            {qtyOptions(22,40)}
                    </select>
                </label>
                <div>
                    <button type="submit" >Sign in</button>
                </div>
        </form>
            
        </>
    )
}


export default CheckoutPage;


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