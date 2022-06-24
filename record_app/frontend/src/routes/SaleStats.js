
<<<<<<< HEAD


import HeaderBar from "../components/HeaderBar";
=======
import { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { useGlobalState } from "../auth/global_state";

>>>>>>> merge_branch_esalter



const SaleStatsPage = () => {
<<<<<<< HEAD


=======
    const [stats, setStats] = useState();
    const days = 30;
    //path('getRevenueByDate/<str:pk>'
    const handleDBGetRevenue = () => { // not using useEffect as it will only be called inside IF block
        axios.get('http://localhost:8000/getRevenueByDate/' + days )
        .then(function (response) {
            console.log("handleDBGetRevenue called");
            console.log("response.data=", response.data);
            setStats(response.data);
            console.log('stats=' , stats);
            
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect( () => {

        handleDBGetRevenue();
        

    },[])
>>>>>>> merge_branch_esalter

    return(
        <>
            <HeaderBar/>
            
        </>

    )
}


export default SaleStatsPage;