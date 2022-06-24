
import { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { useGlobalState } from "../auth/global_state";




const SaleStatsPage = () => {

    const [firstStat,setFirstStat] = useState({interval_revenue:0,interval_profit:0});
    const [secondStat,setSecondStat] = useState({interval_revenue:0,interval_profit:0});

    const [firstDate,setFirstDate] = useState(0);
    const [secondDate,setSecondDate] = useState(0);


    const [submissionCount, setSubmissionCount] = useState(1);
    const [{username}] = useGlobalState('user');
    //path('getRevenueByDate/<str:pk>'
    const handleDBGetRevenue = (days,XorY) => { // not using useEffect as it will only be called inside IF block
        axios.get('http://localhost:8000/getRevenueByDate/' + days )
        .then(function (response) {
            console.log("handleDBGetRevenue called");
            console.log("response.data=");
            console.log(response.data.at(0))
            if ( XorY === 'X'){
                setFirstStat(response.data.at(0));
            }
            else{
                setSecondStat(response.data.at(0));
            }
            
            setSubmissionCount(prev => prev+1);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // useEffect( () => {

    //     handleDBGetRevenue();
        
    // },[submissionCount])

    return(
        <>
            <HeaderBar/>
            <div style={{marginLeft:'40px'}}>
                <h1> Hello {username}</h1>
                <h3> Sales Income Calculator</h3>
                <h4> Calculate revenue between a period, (between last X and last Y days) </h4>
                <form>
                    <label>
                    <p>Between Last X days:</p>
                    <input type="number"   style={{color:'red'  }} onChange={e => {
                    
                    setFirstDate( e.target.value)}} />
                    
                    </label>
                    <label>
                    <p>and Y days</p>
                    <input type="number"   style={{color:'red'  }} onChange={e => {
                        if( (parseInt(e.target.value)) > (parseInt(firstDate)))
                        {
                            alert('Y must be smaller than X');
                        }
                        else{
                            setSecondDate( e.target.value)}}
                        }
                        />
                    </label>
                    
                    <div>
                        <button type="submit" onClick={(e) => {e.preventDefault(); handleDBGetRevenue(firstDate,'X');handleDBGetRevenue(secondDate,'Y');   }}
                        >Calculate and Show Income Statistics</button>
                    </div>
                </form>
                <p> {Object.keys(firstStat)} </p>
                <h3> Between  {new Date(Date.now() - ((86400 * 1000) * firstDate)).toISOString().slice(0,10)} and {new Date(Date.now() - ( (86400*1000) * secondDate )).toISOString().slice(0,10)} :  </h3>
                <h4> Revenue------------&gt;      :{parseFloat(firstStat.interval_revenue) - parseFloat(secondStat.interval_revenue)}</h4>
                <h4> Cost of Items Sold----&gt; : {(parseFloat(firstStat.interval_revenue) - parseFloat(secondStat.interval_revenue)) - (parseFloat(firstStat.interval_profit) - parseFloat(secondStat.interval_profit)) }</h4>
                <h4> Net Income From Sales: {parseFloat(firstStat.interval_profit) - parseFloat(secondStat.interval_profit)}</h4>
            </div>
            
            
        </>

    )
}


export default SaleStatsPage;