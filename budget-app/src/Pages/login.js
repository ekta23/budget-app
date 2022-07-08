import React,{useState} from 'react'
import loginImage from '../images/loginImage.webp'
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const Login = () => {

  let [loginData, setLoginData] = useState({});


  function handleChagne(event) {
    let temp = loginData;
    temp[event.target.name]=event.target.value;

    setLoginData(temp);
  }

  async function loginForm() {
    try{
      let res = await axios.post("http://localhost:5000/login", loginData,{
        headers:{
          "content-type" : "application/json"
        }
      });

      if(res.data.statusCode==200){
        localStorage.setItem("auth", res.data.token);
        window.location.replace("/home");
      }else{
        localStorage.setItem("auth", "");
        NotificationManager.error("Login Failed")
      }
    }catch(err){
      console.log(err);
      NotificationManager.error("Login Failed")
    }
    
  }

    return (
     <div className=" d-flex flex-row signUp">
          
          <img className='imageSignUp align-self-end h-100 mt-3' src={loginImage}></img>

          <div className="signUpDiv d-flex justify-content-center align-items-center">
           <form action="" className="signUpForm d-flex flex-column align-self-center h-100">
        <h2>Login</h2>
        
        <div className="inputContainerLogin">
          <input type="email" name="email" className="input" onChange={(event)=>handleChagne(event)} className="input" aria-describedby="emailHelp" placeholder="Enter email"/>
          <label for="" className="label">Email</label>
        </div>
        
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        
        <div className='inputContainerLogin'>
          <input className="input" type="password" name="password" onChange={(event)=>handleChagne(event)} placeholder="Password"/>
          <label for="" className="label">Password</label>
        </div>

        <p className="align-self-start mb-4 ">Forgot Password</p>
        
        <div className="d-flex flex-column">
        <button type="button" style={{background:"#09663a",widhth:"50%"}} onClick={()=>loginForm()} class="btn btn-primary mb-2">Login</button>
        <button type="button" style={{background:"#212529", widhth:"50%"}} onClick={()=>{window.location.replace("/signup")}} class="btn btn-primary mb-2">Sign Up</button>
        </div>
        {/* <a href='/signup'>Create an Account</a> */}
        </form>
        </div>
      </div>

       

      
    )
}

export default Login
