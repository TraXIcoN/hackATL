import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AuthService from "../auth.service";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function RegisterChoice() {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    loadUsers();
    componentDidMount();
  }, []);

  // Function that discovers the ID of the last user, assigning that value to the variable lastUser
  let lastUser = 0;
  dataUsers.map((data, index) => {
    if (data.iduser > lastUser) {
      lastUser = data.iduser;
      console.log(data.iduser);
      console.log(lastUser);
    }
  });

  // Reload until the first count
  const reloadCount = sessionStorage.getItem("reloadCount");
  function componentDidMount() {
    if (reloadCount < 2) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  }

  function loadUsers() {
    const url = "http://localhost:3000/utilizadores/";
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataUsers(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  // Assigning lastUser to local storage
  AuthService.setCurrentUserId(lastUser);

  // User choice to be a buyer
  function chooseBuyer() {
    const baseUrl = "http://localhost:3000/ligacao/create";
    const dataPost = {
      utilizadoreIduser: lastUser,
      tipoutilizadoreCode: "C",
    };
    axios
      .post(baseUrl, dataPost)
      .then((response) => {
        if (response.data.success === true) {
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
  }

  // User choice to be a seller
  function chooseSeller() {
    const baseUrl = "http://localhost:3000/ligacao/create";
    const dataPost = {
      utilizadoreIduser: lastUser,
      tipoutilizadoreCode: "V",
    };
    axios
      .post(baseUrl, dataPost)
      .then((response) => {
        if (response.data.success === true) {
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
    console.log(dataPost);
  }

  return (
    <div>
      <div className="wrapper">
        <section className="login-content">
          <div className="row m-0 align-items-center bg-white vh-100">
            <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
              <img
                src="image/auth/4.png"
                className="img-fluid gradient-main animated-scaleX"
                alt="images"
              />
            </div>
            <div className="col-md-6">
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <div className="card card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                    <div className="card-body">
                      <a
                        href="../../dashboard/index.html"
                        className="navbar-brand d-flex align-items-center mb-3"
                      >
                        {/*Logo start*/}
                        {/*logo End*/}
                        {/*Logo start*/}
                        {/*logo End*/}
                      </a>
                      <h2 className="mb-2 text-center">
                        What is your profile?
                      </h2>
                      <p className="text-center">
                        Choose whether you want to buy or sell!
                      </p>
                      <form>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <Link
                                type="submit"
                                onClick={() => chooseBuyer()}
                                to="/registarcomprador"
                              >
                                <img
                                  src="image/auth/comprador.png"
                                  className="img-fluid gradient-main animated-scaleX"
                                  alt="images"
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <Link
                                type="submit"
                                onClick={() => chooseSeller()}
                                to="/registarvendedor"
                              >
                                <img
                                  src="image/auth/vendedor.png"
                                  className="img-fluid gradient-main animated-scaleX"
                                  alt="images"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="sign-bg sign-bg-right">
                  <svg
                    width={280}
                    height={230}
                    viewBox="0 0 421 359"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.05">
                      <rect
                        x="-15.0845"
                        y="154.773"
                        width={543}
                        height={77.5714}
                        rx="38.7857"
                        transform="rotate(-45 -15.0845 154.773)"
                        fill="#3A57E8"
                      />
                      <rect
                        x="149.47"
                        y="319.328"
                        width={543}
                        height={77.5714}
                        rx="38.7857"
                        transform="rotate(-45 149.47 319.328)"
                        fill="#3A57E8"
                      />
                      <rect
                        x="203.936"
                        y="99.543"
                        width={310.286}
                        height={77.5714}
                        rx="38.7857"
                        transform="rotate(45 203.936 99.543)"
                        fill="#3A57E8"
                      />
                      <rect
                        x="204.316"
                        y="-229.172"
                        width={543}
                        height={77.5714}
                        rx="38.7857"
                        transform="rotate(45 204.316 -229.172)"
                        fill="#3A57E8"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
