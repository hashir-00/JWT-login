import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ authStatus }) => {
  const [user_details, set_userDetails] = useState({
    user_email: "",
    user_password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    set_userDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 async function onSubmit(e){
  e.preventDefault()


  try {
    const response = await fetch("http://localhost:8000/auth/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(user_details)
    })
    const data =await response.json()
    if(response.status !== 200 ){
      return authStatus(false)
    }
    localStorage.setItem("token",JSON.stringify(data.token))
    authStatus(true)
    
  } catch (error) {
    console.log(error)
  }
 }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="user_email"
          placeholder="email"
          value={user_details.user_email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="user_password"
          placeholder="password"
          value={user_details.user_password}
          onChange={handleInputChange}
        />
        <button>Login</button>
      </form>
      <Link to="/register">register</Link>
    </div>
  );
};

export default Login;
