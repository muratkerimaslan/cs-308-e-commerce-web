
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
    const [homeSortCriteria, setHomeSortCriteria] = useState('');
    const [bookCount, setBookCount] = useState(0);
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
             {/* sort option */}
            <div style={{marginBottom:'5px'}}> 
                <p style={{display:'inline-block' , marginLeft:'30px',marginTop:'3px'}}>{bookCount} product(s)</p>
                
                <div style={{display:'inline-block' , float:'right', marginRight:'30px',}}> 
                    <p style={{ float:'left' , color:'black',marginRight:'8px',marginTop:'3px' }} > Sort Criteria: </p>
                    <div style={{float:'left' }}> 
                        <select  style={{ background:'white'}}
                            
                            onChange={e => setHomeSortCriteria(e.target.value)}>
                                {/* <option value="sort 2criteria" selected disabled>{sortCriteria}</option> */}
                                <option value="Select">Select</option>
                                <option value="Price: Low to High">Price: Low to High</option>
                                <option value="Price: High to Low">Price: Hight to Low</option>
                                <option value="Avg. User Ratings">Avg. User Ratings</option>
                            
                        </select>
                    </div>
                </div>
            </div>

            <ListView Lgenre_target={genre_target} Lsearch_term = {homeSearchTerm} sortCriteria={homeSortCriteria} setHomeBookCount = {setBookCount} />
        </>
    )
}


export default Home;