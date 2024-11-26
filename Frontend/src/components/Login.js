import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";
import Alert from "./Alert";
import * as GlobalUrls from "../GlobalURL"
const Login = () => {
  const [Credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  //alert using AlertContext
  const Context = useContext(AlertContext);
  const { showAlert } = Context;

  const handlesumbit = async (e) => {
    e.preventDefault();
    try {
      //API CALL
      const responce = await fetch(GlobalUrls.LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Credentials.email,
          password: Credentials.password,
        }),
      });
      const json = await responce.json();
      console.log(json);

      if (json.success) {
        //save the auth token and redirect
        localStorage.setItem("token", json.authToken);
           navigate("/");
        showAlert("Login Successfully", "success")
      } else {
        showAlert("Invalide Credentials", "danger")
      }
      //accuerd error
    } catch (error) {
      console.error(error.message);
    }
  };

  const onchange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  return (
    <>

      <div>
        <div className="authentication container border border-3 rounded-4 border-dark mt-5 py-5 px-md-5 px-4 col-lg-5 col-md-8 col-11">
          <h3 className="mb-4">LOGIN WITH RIGHT CREDENTIAL</h3>
           <Alert/>
          <form onSubmit={handlesumbit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address{" "}
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onchange}
                value={Credentials.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={onchange}
                value={Credentials.password}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>     
          </form>
        </div>
        <div className="d-flex justify-content-center mt-5 fs-5 fw-bold fst-italic"><p>Dont have an account ?</p><span><Link to="/Register">Register</Link></span></div>
      </div>
    </>
  );
};

export default Login;
