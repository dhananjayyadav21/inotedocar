import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as GlobalUrls from "../GlobalURL"

const Userdetails = () => {
  //navigate page
  const navigate = useNavigate();

  useEffect(() => {
    //if user note login
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [user, setUser] = useState({ name: "", email: "", Date: "", id: "" });

  //get user from db ==============================================================================================
  const getUser = async () => {
    //API CALL
    try {
      const responce = await fetch(GlobalUrls.GETUSER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await responce.json();
      setUser({
        name: json.name,
        email: json.email,
        Date: json.Date,
        id: json._id,
      });
      console.log(json);
      //if accured error
    } catch (err) {
      console.log(err);
    }
  };

  //handle handleonchange function of the form
  const handleonchange = (e) => {};

  //handle delete coinfirmation
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleDelete = () => {
    ref.current.click();
  };

  const handleSavChanges = () => {
    localStorage.removeItem("token");
    refClose.current.click();
    navigate("/login");
  };

  return (
    <>
      <div className="container-md-fluid  row d-flex py-5 px-md-5 px-3 justify-content-center">
        <div className="userdetail-container  border border-3 rounded-4 shadow col-md-7 col-11 py-5 px-md-4 px-3 my-3">
          <h2 className="text-start fw-bold mb-4">Your Profile </h2>

          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={user.name}
                onChange={handleonchange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handleonchange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                User id
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={user.id}
                onChange={handleonchange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Date" className="form-label">
                Join Date
              </label>
              <input
                type="tel"
                className="form-control"
                id="Date"
                name="Date"
                value={user.Date}
                onChange={handleonchange}
                required
              />
            </div>
          </form>
        </div>

        <div
          class="modal fade "
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabindex="-1"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="deleteacount modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel">
                  Delete Account
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                You will lose access to your iNoteDocar account
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavChanges}
                  type="button"
                  className="btn btn-danger"
                >
                  Yes Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <a
          ref={ref}
          class="btn btn-primary d-none"
          data-bs-toggle="modal"
          href="#exampleModalToggle"
          role="button"
        >
          Open first modal
        </a>

        <div className=" col-md-4 col-12 my-5">
          <div className="deleteacount-container container shadow border border-3 rounded-4 py-3 px-3">
            <h6 className="fw-bold mb-4">Delete Account</h6>
            <p>
              You will lose access to your iNoteDocar account once your deletion
              request has been submitted.
            </p>
            <div className="mt-4 modal-footer">
              <button className="btn btn-danger " onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdetails;
