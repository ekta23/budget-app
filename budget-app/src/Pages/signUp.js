import React,{useState} from 'react'
import { NotificationManager } from 'react-notifications';
import loginImage from '../images/loginImage.webp'
import axios from 'axios';

const SignUp = () => {
    const [createAcc,setCreateAcc]=useState({});

    function validateData() {
      if(!createAcc?.name || createAcc.name===""){
        NotificationManager.error("name field should not be empty")
        return false;
      }else if(!createAcc?.email || createAcc.email===""){
        NotificationManager.error("email field should not be empty")
        return false;
      }else if(!createAcc?.age || createAcc.age===0){
        NotificationManager.error("age field should not be empty")
        return false;
      }else if(!createAcc?.password || createAcc.password===""){
        NotificationManager.error("password field should not be empty")
        return false;
      }else if(!createAcc?.gender || createAcc.gender===""){
        NotificationManager.error("gender field should be selected")
        return false;
      }else if(!createAcc?.cnfrm_password || createAcc.cnfrm_password===""){
        NotificationManager.error("password field should not be empty")
        return false;
      }else if(createAcc?.password.length<4){
        console.log(createAcc.password.length);
        NotificationManager.error("password should contain atleast 5 charachters")
        return false;
      }

      if(createAcc?.password !== createAcc?.cnfrm_password){
        NotificationManager.error("password should match with confirm password")
        return false;
      }

      // not saving the cnfrm password
      delete createAcc.cnfrm_password;


      return true;
    }

    async function signUpForm() {
      if(validateData()){
        let res = await axios.post("http://localhost:5000/register", createAcc,{
          headers:{
            "content-type" : "application/json"
          }
        });

        if(res.data.statusCode==200){
          NotificationManager.success("signed up successsfully")
          window.location.replace("/");
        }else{
          NotificationManager.error("Something went wrong")
        }
      }
  }
    function handleChange(event){
      let temp=createAcc;
      temp[event.target.name]=event.target.value;
      setCreateAcc(temp);
     
      

    }
    return (
        <div className=" d-flex flex-row signUp">
          
          <img className='imageSignUp align-self-end h-100 mt-3' src={loginImage}></img>

          <div className="signUpDiv d-flex justify-content-center align-items-center">
            <form action="" className="signUpForm d-flex flex-column align-self-center h-100">
              <h2 className="title">Sign Up</h2>
              <div className="inputContainer">
                <input type="text" name="name" className="input" placeholder="a" onChange={(event)=>handleChange(event)}/>
                <label for="" className="label">Name</label>
              </div>

              <div className="inputContainer">
                <input type="text" name="email" className="input" placeholder="a" onChange={(event)=>handleChange(event)}/>
                <label for="" className="label">Email</label>
              </div>

              <div class="inputContainer">
                <input type="number" name="age" className="input" placeholder="a" onChange={(event)=>handleChange(event)}/>
                <label for="" className="label">Age</label>
              </div>

          

              <div class="mb-4 d-flex align-items-center">
                <div className="m-2"style={{color:"#09663a",fontWeight:"bold"}}>Gender</div>
                <div className="m-2">
                  <input type="radio" name="gender" value="0" onChange={(event)=>handleChange(event)}/>
                  <label>Female</label>
                </div>
                <div className="m-2">
                  <input  type="radio" name="gender" value="1" onChange={(event)=>handleChange(event)}/>
                  <label>Male</label>
                </div>
              </div>

              <div className="inputContainer">
                <input type="password" name="password" className="input" placeholder="password" onChange={(event)=>handleChange(event)}/>
                <label for="" className="label">Password</label>
              </div>

              <div className="inputContainer">
                <input type="password" name="cnfrm_password" className="input" placeholder="confirm password" onChange={(event)=>handleChange(event)}/>
                <label for="" className="label">Confirm Password</label>
              </div>

              <input type="button" className="submitBtn" onClick={signUpForm} value="Sign up"/>
        </form>
        </div>
        


      </div>
            
        
    )
}

export default SignUp
