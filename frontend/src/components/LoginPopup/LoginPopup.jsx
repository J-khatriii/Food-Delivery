import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {
  const { url, setToken } = useContext(StoreContext)

  const [currentState, setCurrentState] = useState("Login")

  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  });

  const onChangeHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
  }

  // useEffect(()=>{
  //   console.log(data)
  // },[data])


  const validateResponse = (response) => {
    return response && response.data && typeof response.data.token === "string";
  };
  

  const onLogin = async (event) =>{
    event.preventDefault()
    
    
    let newUrl = url;
    if(currentState==="Login"){
      newUrl+='/api/user/login'
    }
    else{
      newUrl+='/api/user/register'
    }

    const response = await axios.post(newUrl,data)
    console.log("API Response:", response);
    try{
      console.log("Sending data:", data); // Log form data
      console.log("API URL:", newUrl); // Log constructed URL
      if(validateResponse){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
      }
      else{
        alert(response.data.message || "An error occurred. Please try again.");
      }
    }
    catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Failed to connect to the server.");
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, i agree to the terms of use and pricvacy policy.</p>
        </div>
        <button type='submit'>{currentState==="Sign Up"?"Create Account":"Login"}</button>
        {currentState==="Login"?<p>Create a new account?  <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>:<p>Already have a account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>}
        
      </form>
    </div>
  )
}

export default LoginPopup
