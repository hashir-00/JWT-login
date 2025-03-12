import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({authStatus}) => {
  const [registerForm, setRegisterForm] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = async(e)=>{
    e.preventDefault()
    try {
        const response =await fetch('http://localhost:8000/auth/register',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(registerForm)
        })
        const data = await response.json()
        if(response.status !== 200){
          return authStatus(false)
        }
        localStorage.setItem("token",data.token)
        authStatus(true)
    } catch (error) {
        console.log(error)
    }

  }

  return (
    <form onSubmit={onSubmit}>
     
    <div className="text-center form-control-sm text-uppercase form-group row justify-content-center">
      <h1>Register</h1>

       <div className="col-sm-12 col-lg-12 px-5 pt-5">
          <label htmlFor="Username" className="text-primary -">
            Username
          </label>
          <input
            type="text"
            name="user_name"
            value={registerForm.user_name}
            placeholder="Username"
            onChange={handleInputChange}
            className="form-control my-3"
          />
        </div>

        <div className="col-sm-12 col-lg-12 px-5">
          {" "}
          <label htmlFor="Email" className="text-primary ">
            Email
          </label>
          <input
            type="text"
            name="user_email"
            value={registerForm.user_email}
            placeholder="Email"
            onChange={handleInputChange}
            className="form-control my-3 "
          />
        </div>

        <div className="col-sm-12 col-lg-12 px-5">
          <label htmlFor="password" className="text-primary">
            Password
          </label>
          <input
            type="password"
            name="user_password"
            value={registerForm.user_password}
            placeholder="Password"
            onChange={handleInputChange}
            className="form-control my-3"
          />
        </div>
        <button className="  row align-items-center col-sm-2 col-lg-2 btn btn-success btn-sm  ">
            Register
        </button>
   
    </div> <Link className="row align-items-center col-sm-2 col-lg-2 btn btn-success btn-sm  " to="/login">Login</Link>
    </form>
  );
};

export default Register;
