
import { Link } from "react-router-dom";
import './HeaderBar.css'
import { setGlobalUsername, setGlobalEmail, useGlobalState } from "../../auth/global_state";

const HeaderBar = () => {
    const [{username, email}] = useGlobalState('user');
    console.log(username);
    const searchSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
    }




    return(
        
        <div>
        <ul className="header-bar" >
            <li>
                <form onSubmit={searchSubmit}>
                    <label className="search-bar">
                    <input type="text"/>
                    </label>
                </form>
            </li>

            {
                (username !== "") ? <li> Hello {username} </li> :                
                <> 
                    <li> <Link to='/Login'> Login </Link></li>
                    <li> <Link to ='SignUp'> SignUp </Link> </li>
                </>
            }

        </ul>
        </div>


    )





}

export default HeaderBar