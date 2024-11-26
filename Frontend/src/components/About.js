import React from "react";

const About = () => {
  return (
    <>
      <div className="container my-5">
        <section className="hero-section text-center ">
          <h1 className="hero-title">Welcome to iNoteDocar</h1>
          <p className="hero-description fw-bold">
            Your personal cloud-based notebook. Create, edit, and manage your
            notes securely from anywhere.
          </p>
        </section>
      </div>

      <div>
        <section className="features-section container">
          <h2 className="features-title text-center my-4">Why Choose iNoteDocar?</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card feature-card">
                <div className="card-body">
                  <i className="feature-icon bi bi-cloud"></i>
                  <h5 className="card-title mt-3">Cloud Storage</h5>
                  <p className="card-text">
                    Access your notes from any device with secure cloud
                    synchronization.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card feature-card">
                <div className="card-body">
                  <i className="feature-icon bi bi-pencil-square"></i>
                  <h5 className="card-title mt-3">Easy Note Management</h5>
                  <p className="card-text">
                    Create, edit, and delete your notes effortlessly with a
                    user-friendly interface.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card feature-card">
                <div className="card-body">
                  <i className="feature-icon bi bi-lock-fill"></i>
                  <h5 className="card-title mt-3">Secure Authentication</h5>
                  <p className="card-text">
                    Your notes are protected with modern authentication methods
                    and encryption.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
             
            </div>

            <div className="col-md-4 mb-4">
              <div className="card feature-card">
                <div className="card-body">
                  <i className="feature-icon bi bi-lock-fill"></i>
                  <h5 className="card-title mt-3">User Details</h5>
                  <p className="card-text">
                    Show user details.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default About;
