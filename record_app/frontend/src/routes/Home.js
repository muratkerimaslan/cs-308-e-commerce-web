
import HeaderBar from "../components/HeaderBar";
import ListView from "../components/ListView";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//added the comment to test git push 2
const Home = ({genre_target="All"}) => {
    //console.log("url params:");
    const { genre } = useParams();
    //console.log(genre);

    const [homeSearchTerm, setHomeSearchTerm] = useState('');
    
    useEffect(() =>{   // fixing problems related to listview not re rendering
        setHomeSearchTerm('');
    },[genre] )

    //console.log("Home search term");
    //console.log(homeSearchTerm);
    if (genre !== undefined)
    {
        //console.log("genre filter exists");
        genre_target = genre; // change the prop passed down to ListVeiw
    } 
    return(
        <>

            {/* <HeaderBar Hsearch_term={searchTerm} /> */}
            <HeaderBar home_search_term={homeSearchTerm} setHomeSearchTerm={setHomeSearchTerm} />

            <ListView Lgenre_target={genre_target} Lsearch_term = {homeSearchTerm} />
        </>
    )
}


export default Home;