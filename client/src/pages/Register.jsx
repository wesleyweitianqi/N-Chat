import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import './Register.scss';
import Logo from '../doc/logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/apiRoutes';
function Register() {
  const [val, setVal] =useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const navigate= useNavigate();

  const toastOption = {
    position: "bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable: true,
    theme: "dark",
  }

  const valValidate =() => {
    const {username, email, password, confirmPassword} = val;
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be the same.", toastOption);
      return false;
    } else if (username.length < 3) {
      toast.error('Username shold be greater than 3 characters', toastOption)
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters", toastOption)
      return false;
    } else if (email === "") {
      toast.error("email cannot be empty", toastOption);
      return false;
    }
    return true;
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    if (valValidate()) {
    const {username, email, password } = val;
      axios.post(registerRoute, {username, email, password}).then(res => {
        if(res.data.status) {
          localStorage.setItem("currentUser", JSON.stringify(res.data.user))
          navigate("/")
        } 
        if(!res.data.statue) {
          toast.error(res.data.msg, toastOption)
        }  
      })
    }   
  };
  const changeHandler = (e) => {
    e.preventDefault();
    setVal({...val, [e.target.name]: e.target.value})
  }

  useEffect(()=> {
    if(localStorage.getItem('currentUser')) {
      navigate('/')
    }
  })
  return (
    <>
      <FormContainer>
        <form onSubmit={(e)=>submitHandler(e)}>
          <div className='brand'>
            <img src={Logo} alt="logo" />
            <h1>Happy Chat</h1>
          </div>
          <input type="text" placeholder='Username' name="username" onChange={e=>changeHandler(e)} />
          <input type="email" placeholder='Email' name="email" onChange={e=>changeHandler(e)} />
          <input type="password" placeholder='Password' name="password" onChange={e=>changeHandler(e)} />
          <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={e=>changeHandler(e)} />
          <button type="submit">Register</button>
          <span>already have an account? <Link to='/login'>Login</Link> </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height:100vh;
  display: flex;
  flex-direction:column;
  justify-content: center;
  gap: 1rem;
  align-item: center;
  background-color: white;
  .brand {
    
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    width:40vw;
    margin:auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #788fc676;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: #0d0a0a;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register

