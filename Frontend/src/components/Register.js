import React,{useState,useContext} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';
import Alert from './Alert';
import * as GlobalUrls from "../GlobalURL"


const Register = () => {

  const [Credentials, setCredentials] = useState({name:"", email:"", password:""});
  const navigate = useNavigate();

    //alert using AlertContext
    const Context = useContext(AlertContext);
    const { showAlert } = Context;

  const handlesumbit = async(e)=>{
    e.preventDefault();
    try {
      //API CALL
      const responce = await fetch(GlobalUrls.Register_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({name:Credentials.name, email:Credentials.email,password:Credentials.password})
      });
      const json = await responce.json();
      console.log(json);

      if(json.success){
        //save the auth token and redirect
        localStorage.setItem("token", json.authToken)
        showAlert("Register Succesfully", "success");
        navigate('/login');

      }else{
        showAlert("Invalide Credentials", "danger")
      }
      //accuerd error 
    } catch (error) {
      console.error(error.message);
    }
  }

  const onchange =(e)=>{
    setCredentials({...Credentials, [e.target.name]: e.target.value})
  }

  return (
    <>
     <div>
        <div className=" authentication container  border border-dark border-2 rounded-4 mt-5 py-5 px-md-5 px-4 col-lg-5 col-md-8 col-11">
          <h3 className="mb-4">CREATE ACCOUNT FOR INOTEDOCAR</h3>
          <Alert/>
          <form onSubmit={handlesumbit}> 
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" onChange={onchange} value={Credentials.name} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address </label>
              <input type="email" className="form-control" id="email" name="email" onChange={onchange} value={Credentials.email} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" onChange={onchange} value={Credentials.password} minLength={8} required/>
            </div>

            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onchange}   minLength={8} required/>
            </div>
            
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="d-flex justify-content-center mt-2 fs-5 fw-bold fst-italic"><p>Alrady have an account ?</p><span><Link to="/login">Login</Link></span></div>
      </div>
    </>
  )
}

export default Register
