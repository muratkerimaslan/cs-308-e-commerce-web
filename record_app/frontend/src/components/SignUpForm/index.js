import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { setGlobalUserId,setGlobalUsername, setGlobalUserEmail} from "../../auth/global_state";

import axios from 'axios';

// Styles
import './SignUp.css'

function SignUpForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [password2, setPassword2] = useState('')
    const navigate = useNavigate();

    const handleDB = (name, password,email,e) => {
      let response_success = false;
      axios.post('http://localhost:8000/users/create/', {
        name: name,
        password: password,
        email : email
      })
      .then(function (response) {
        // console.log(response);
        response_success = true;
        console.log("signup response_success = " +  response_success);
        if (response_success)
          {
            alert("signup successful");
            if (response_success){
              onSubmitLogin(e);
            // setGlobalUsername(username);
            // setGlobalUserEmail("123@gmail.com");
            }
            else{
              alert("signup succesful, but authenticating account login failed");
              console.log("signup ok but login = " + response_success);
              navigate("/");
          }
        }
        else
          {
            alert("signup failed ");
          }
       
      })
      .catch(function (error) {
        console.log(error);
        console.log("signup post error");
        
      });

      return;
      
    }

    const onSubmit = async(e) => {
      e.preventDefault()
       // alert('Please add a task')     
       if (!username || !email || !password || !password2){
           alert("please fill in all of the information")
           return
       }
       else if (password !== password2){
           
           console.log(password)
           console.log(password2)
           alert("Passwords do not match")
       }
       else
          console.log("submitted signup request");
          handleDB(username,password,email,e);
          // let res_success = handleDB(username,password,email,e);
          // if (res_success){
          //   onSubmitLogin(e);
          // // setGlobalUsername(username);
          // // setGlobalUserEmail("123@gmail.com");
          // navigate("/Cart");}
          // else{
          //   console.log("signup + login = " + res_success);
          //   navigate("/");
          // }
       //alert("submit")
      }

    // const handleDBLogin = (name, password) => { // helper's helper
    //   axios.post('http://localhost:8000/authenticate', {
    //     name: name,
    //     password: password,
    //   })
    //   .then(function (response) {
    //     console.log(response.data[0].is_authenticated);
    //     if (response.data[0].is_authenticated === true){ //Correct ID and Password
    //       setGlobalUsername(name);
    //       setGlobalUserEmail("123@gmail.com");
    //       navigate("/Cart");
    //     }
    //     else{
    //       console.log("noluyo");
    //     }
          
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
      
    // }

    const handleDBLogin = (name, password) => { // helper copied from loginform
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
        }
          
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }
    const onSubmitLogin = (e) => { // helper
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
      handleDBLogin(username, password);
      
      return;
  
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
