import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { setGlobalUsername, setGlobalEmail} from "../../auth/global_state";

import axios from 'axios';

// Styles
import './SignUp.css'

function SignUpForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [password2, setPassword2] = useState('')
    const navigate = useNavigate();
    const handleDB = (name, password,email) => {
      axios.post('http://localhost:8000/users/create/', {
        name: name,
        password: password,
        email : email
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      alert("success")
    }




    const onSubmit = (e) => {
        e.preventDefault()
         // alert('Please add a task')     
         if (!username || !email || !password || !password2){
             alert("please fill in all of the information")
             return
         }
         else if (password != password2){
             
             console.log(password)
             console.log(password2)
             alert("Passwords do not match")
         }
         else
            console.log("submission confirmed")
            handleDB(username,password,email);
            setGlobalUsername(username);
            setGlobalEmail("123@gmail.com");
            navigate("/");
         //alert("submit")
        }
      
    return(
        <div className="login-wrapper">
          <h1>Please Sign Up</h1>
          <form onSubmit={onSubmit}>
            <label className="login-label">
              <p>Username</p>
              <input type="text" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className="login-label">
              <p>E-mail</p>
              <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="login-label">
              <p>Password</p>
              <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label className="login-label">
              <p>Password Confirmation</p>
              <input type="password" onChange={(e) => setPassword2(e.target.value)} />
            </label>
            <div>
              <button type="submit" onClick={onSubmit}> Submit </button>
            </div>
          </form>

        <nav>
          <Link to ='/Login'> Already have an account? Go to Login Page </Link>
        </nav>


        </div>
      )
}

export default SignUpForm;
