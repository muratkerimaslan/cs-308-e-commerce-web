import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './LoginForm.css';
import axios from 'axios';
import { setGlobalUsername, setGlobalUserEmail, setGlobalUserId } from "../../auth/global_state";



const LoginForm = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const handleDB = (name, password) => {
      axios.post('http://localhost:8000/authenticate', {
        name: name,
        password: password,
      })
      .then(function (response) { // probably response.data[0] = {is_authenticated and user_id};
        console.log(response.data[0].is_authenticated);
        console.log(response.data[0].user_id);
        if (response.data[0].is_authenticated === true){ //Correct ID and Password
          setGlobalUsername(name);
          setGlobalUserEmail("123@gmail.com");
          setGlobalUserId(response.data[0].user_id);
          navigate("/Cart");
        }
        else{
          console.log("noluyo");
          alert("Login Failed");
        }
          
      })
      .catch(function (error) {
        console.log(error);
        alert("Login Failed Error");
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