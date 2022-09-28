import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Link, useNavigate} from "react-router-dom";
import './Register.scss';
import Logo from '../doc/logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/apiRoutes';

function Login() {
  const [val, setVal] =useState({
    username: "",
    password: "",  
  })
  const navigate = useNavigate();

  const toastOption = {
    position: "bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable: true,
    theme: "dark",
  }

  const valValidate =() => {
    const {username, password} = val;
    if (password ==="" ) {
      toast.error("password is required", toastOption);
      return false;
    } else if (username.length ==="") {
      toast.error('Username sis required', toastOption)
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters", toastOption)
      return false;
    }
    return true;
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    if (valValidate()) {
    const {username, password } = val;
      axios.post(loginRoute, {username, password}).then(res => {
        if (res.data.status) {
          console.log(res.data)
          localStorage.setItem("username", JSON.stringify(res.data.user1))
          navigate("/setAvatar")
        }
        if (!res.data.status) {
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
    if(localStorage.getItem("username")) {
      navigate("/setAvatar")
    }
  }, []);

  return (
    <>
      <FormContainer>
        <form onSubmit={(e)=>submitHandler(e)}>
          <div className='brand'>
            <img src={Logo} alt="logo" />
            <h1>Happy Chat</h1>
          </div>
          <input type="text" placeholder='Username' name="username" onChange={e=>changeHandler(e)} />
          <input type="password" placeholder='Password' name="password" onChange={e=>changeHandler(e)} />
          <button type="submit">Login</button>
          <span>dont have an account? <Link to='/register'>Register</Link> </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height:100vh;
  width:100vw;
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

export default Login


