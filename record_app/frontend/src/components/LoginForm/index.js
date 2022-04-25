import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './LoginForm.css';
import axios from 'axios';
import { setGlobalUsername, setGlobalEmail, useGlobalState } from "../../auth/global_state";



const LoginForm = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const handleDB = (name, password) => {
      axios.post('http://localhost:8000/authenticate', {
        name: name,
        password: password,
      })
      .then(function (response) {
        console.log(response.data[0].is_authenticated);
        if (response.data[0].is_authenticated === true){ //Correct ID and Password
          setGlobalUsername(name);
          setGlobalEmail("123@gmail.com");
          navigate("/");
        }
        else{
          console.log("noluyo");
        }
          
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }

    const onSubmitLogin = (e) => {
        e.preventDefault()
        console.log("onSubmitLogin Called");
        if (!username) {
          alert('Please write username');
          return;
        }
        if (!password)
        {
            alert('Password can not be empty');
            return;
        }
        handleDB(username, password);
        
        return;
    
      }
    
    return (
<div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Enter Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Enter Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit" onClick={onSubmitLogin}>Sign in</button>
        </div>
      </form>
      <div>

        <nav>
          <Link to ='/SignUp'> Don't have an account? Go to Sign up Page </Link>
        </nav>
      </div>
      
    </div>
    )



}

export default LoginForm