import { useState } from "react";
import { useGlobalState, setGlobalUserRecentlyLoggedIn } from "../../auth/global_state";
import './CreditCard.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreditCard = () => {
    const [{user_id}] = useGlobalState('user');
    let navigate = useNavigate();
    // const[user] = useGlobalState('user');
    const [ccn,setCcn] = useState('################');
    const [cvv,setCvv] = useState('');
    const [cardHolderName,setCardHolderName] = useState('card holder full name');
    const [expMonth,setExpMonth] = useState('mm');
    const [expYear,setExpYear] = useState('yy');

    const SubmitCheckout = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8000/checkout/' + user_id )
            .then(function (response) {
                console.log("Submitted checkut");
                console.log(response.data); 
                alert('checkout submitted');
                setGlobalUserRecentlyLoggedIn(true);
                navigate('/Cart');
            })
            .catch(function (error) {
              console.log(error);
            });
    }

    // const YearMonthOptions = (first,last) => { // not needed as template has these
    //     const row = [];
        
    //     for (var i = first; i <= last;i++)
    //     {
    //         row.push( <option value={i}>{i}</option>);
    //     }
    //     return row;
    // }

return (
<div className="container">

    <div className="card-container">

        <div className="front">
            <div className="image">
                <img src={require("./image/chip.png")} alt=""/>
                <img src={require("./image/visa.png")} alt=""/>
            </div>
            <div className="card-number-box">{ccn}</div>
            <div className="flexbox">
                <div className="box">
                    <span>card holder</span>
                    <div className="card-holder-name">{cardHolderName}</div>
                </div>
                <div className="box">
                    <span>expires</span>
                    <div className="expiration">
                        <span className="exp-month">{expMonth + '/'}</span>
                        <span className="exp-year">{expYear}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="back">
            <div className="stripe"></div>
            <div className="box">
                <span></span>
                <div className="cvv-box"></div>
                <img src="image/visa.png" alt=""/>
            </div>
        </div>

    </div>

    <form action="">
        <div className="inputBox">
            <span>card number</span>
            <input type="text" maxLength="16" className="card-number-input" onChange={(e) => setCcn(e.target.value)}/>
        </div>
        <div className="inputBox">
            <span>card holder</span>
            <input onChange={(e) => setCardHolderName(e.target.value)} type="text" className="card-holder-input"/>
        </div>
        <div className="flexbox">
            <div className="inputBox">
                <span>expiration mm</span>
                <select  className="month-input"
                    value={expMonth}
                    onChange={e => setExpMonth(e.target.value)}>
                    <option value="month" >month</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>
            <div className="inputBox">
                <span>expiration yy</span>
                <select  className="year-input"
                value={expYear}
                onChange={e => setExpYear(e.target.value)}>
                    <option value="year" selected disabled>year</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                </select>
            </div>
            <div className="inputBox">
                <span>cvv</span>
                <input value={cvv} onChange={e => setCvv(e.target.value)} type="text" maxLength="4" className="cvv-input"/>
            </div>
        </div>
        <input  onClick={SubmitCheckout} type="submit" value="submit" className="submit-btn"/>
    </form>

</div>   


)

}


export default CreditCard;



{/* <script>

document.querySelector('.card-number-input').oninput = () =>{
    document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

document.querySelector('.card-holder-input').oninput = () =>{
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () =>{
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () =>{
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () =>{
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}

</script> */}