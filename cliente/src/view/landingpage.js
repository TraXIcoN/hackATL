import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthService from "./auth.service";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../css/paginaprincipal.css";

export default function LandingPage() {
  const [dataUsers, setDataUsers] = useState([]);
  const [dataOffers, setDataOffers] = useState([]);

  // Variable that retrieves the ID of the user who logged in and assigns it to the getCurrentUserId() function of AuthService
  const currentUser = AuthService.getCurrentUserId();

  useEffect(() => {
    loadUsers();
    loadOffers();
  }, []);

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

  function loadOffers() {
    const url = "http://localhost:3000/ofertas/";
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataOffers(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  // Variables and function that dictate the number of ads, number of sales, and number of users
  var ads = 0;
  var salesCount = 0;
  var usersCount = 0;
  function landingPageData() {
    dataUsers.map((data) => {
      usersCount++;
      salesCount = salesCount + data.nCompras;
    });
    dataOffers.map((dataO) => {
      ads++;
    });
    return {
      ads: ads,
      salesCount: salesCount,
      usersCount: usersCount,
    };
  }
  const data = landingPageData();
  ads = data.ads;
  salesCount = data.salesCount;
  usersCount = data.usersCount;

  return (
    <div>
      <div className="fundo rounded-bottom-circle">
        <div className="container">
          <nav className="navbar ">
            <div className="container-fluid d-flex justify-content-between m-5">
              <img
                className="img-fluid"
                style={{ width: "80px" }}
                src="image/logo.png"
              />
              <form className="d-flex " role="search">
                <Link
                  className="btn btn-outline-dark me-2"
                  to={`/iniciarsessao`}
                >
                  Sign In
                </Link>
                <Link className="btn btn-primary" to="/registar">
                  Register
                </Link>
              </form>
            </div>
          </nav>
        </div>
        <div className=" text-center pt-2 pb-5">
          <div className="card-body">
            <h1 className="card-title mb-4">
              Sale and Purchase of
              <br />
              Energy Surplus
            </h1>
            <div className="mb-5"></div>
          </div>
        </div>
      </div>
      <div className="container text-center  mt-5">
        <div className="row d-flex justify-content-evenly">
          <div className="col-3 ">
            <div className="card text-center justify-content-center fundo mb-3">
              <div className="card-body">
                <i
                  className="fa-solid fa-coins p-2 rounded"
                  style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
                />
                <h5 className="card-title pt-1" style={{ color: "#000000" }}>
                  {salesCount}
                </h5>
                <p className="card-text" style={{ color: "#000000" }}>
                  Number of Sales
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card text-center mb-3 fundo">
              <div className="card-body">
                <i
                  className="fa-solid fa-arrow-trend-up p-2 rounded"
                  style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
                />
                <h5 className="card-title pt-1" style={{ color: "#000000" }}>
                  {ads}
                </h5>
                <p className="card-text" style={{ color: "#000000" }}>
                  Ads
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card text-center mb-3 fundo">
              <div className="card-body">
                <i
                  className="fa-regular fa-user p-2 rounded"
                  style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
                />
                <h5 className="card-title pt-1" style={{ color: "#000000" }}>
                  {usersCount}
                </h5>
                <p className="card-text" style={{ color: "#000000" }}>
                  Users
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container  d-flex justify-content-around my-5">
          <div className="col-5">
            <h3>How does energy surplus work?</h3>
            <p>
              Energy surplus occurs when a solar energy installation produces
              more electricity than is consumed at the moment. This excess
              energy is sent to the distributor's electrical grid, and the owner
              of the installation is compensated for this excess production in
              energy credits.
            </p>
            <p>
              They can be used to reduce the electricity bill during times of
              low solar production. In some cases, the surplus can also be
              stored in batteries for later use.
            </p>
          </div>
          <div className="col-4">
            <img className="img-fluid" src="image/a2.gif" />
          </div>
        </div>
      </div>
      <div className="fundo">
        <div className="container  py-5">
          <div className="text-center">
            <h2 className="mb-1 fw-semibold">Sell your surplus</h2>
            <p>
              Produced more energy than you consume? Don't let your energy
              surplus go to waste!
              <br />
              <br />
              On our platform, you can easily and securely sell your energy
              surplus to other
              <br />
              <br />
              consumers and producers of renewable energy.
            </p>
          </div>
          <div className="row justify-content-evenly my-4 ">
            <div className="col-4">
              <div className="row ">
                <div className="col-1 me-3">
                  <i
                    className="fa-sharp fa-solid fa-lightbulb p-2  rounded fs-4"
                    style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
                  />
                </div>
                <div className="col-10">
                  <h6 className="fw-bold">Have a source of energy</h6>
                  <p>
                    Don't rely on fluctuations in energy prices anymore and
                    create your own source of energy. To sell your surplus, you
                    need to have a power source of up to 350 watts.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <img className="img-fluid" src="image/a1.gif" />
            </div>
          </div>
          <div className="row justify-content-evenly my-4">
            <div className="col-3">
              <img className="img-fluid" src="image/a4.gif" />
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-1 me-3">
                  <i
                    className="fa-solid fa-clipboard-check p-2 rounded fs-4"
                    style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
                  />
                </div>
                <div className="col-10">
                  <h6 className="mb-1 fw-bold">
                    Register the panels with DGEG
                  </h6>
                  <p>
                    You need to register your solar panels with the General
                    Directorate of Energy and Geology (DGEG). It is a legal
                    requirement and ensures that your installation complies with
                    safety and quality standards.
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-evenly my-4">
              <div className="col-4">
                <div className="row">
                  <div className="col-1 me-3">
                    <i
                      className="fa-sharp fa-regular fa-file-lines p-2 rounded fs-4"
                      style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
                    />
                  </div>
                  <div className="col-10">
                    <h6 className="mb-1 fw-bold">
                      Request a Certificate of Electricity Production (CPE)
                    </h6>
                    <p>
                      It is important to request a Certificate of Electricity
                      Production (CPE). The CPE is a legal requirement for
                      selling electricity to the national grid.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <img className="img-fluid" src="image/5.gif" />
              </div>
            </div>
            <div className="row justify-content-evenly my-4">
              <div className="col-5">
                <img className="img-fluid" src="image/a3.gif" />
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-1 me-3">
                    <i
                      className="fa-solid fa-house-chimney-user p-2 rounded fs-4 "
                      style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
                    />
                  </div>
                  <div className="col-10">
                    <h6 className="mb-1 fw-bold">
                      Create an account and make the sale
                    </h6>
                    <p>
                      Creating an account on our platform is quick and easy.
                      After registration, you can easily publish your surplus
                      products and materials for sale. Our platform connects you
                      to interested buyers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container  d-flex justify-content-around my-5">
        <div className="col-4">
          <img className="img-fluid" src="image/a2.gif" />
        </div>
        <div className="col-5">
          <h3 className="fw-semibold">Buy energy surplus</h3>
          <p>Necessary steps to purchase surplus:</p>
          <div className="row">
            <div className="col-1 me-2">
              <i
                className="fa-solid fa-clipboard-check p-2 rounded "
                style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
              />
            </div>
            <div className="col-10">
              <h6 className="fw-bold">Register on this platform</h6>
              <p>
                Register now on our platform and start maximizing the benefits
                of your production or business with renewable energy.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-1 me-2">
              <i
                className="fa-sharp fa-solid fa-shop p-2 rounded "
                style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
              />
            </div>
            <div className="col-10">
              <h6 className="fw-bold">Access the buyer area</h6>
              <p>
                Access the buyer area of our platform now and find energy
                surplus.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-1 me-2">
              <i
                className="fa-solid fa-cart-shopping p-2 rounded "
                style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
              />
            </div>
            <div className="col-10">
              <h6 className="fw-bold">Choose the best service and pay</h6>
              <p>
                Find the perfect service for you and do business simply and
                securely. On our platform, choose from a wide range of renewable
                energy services and pay easily and conveniently.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div>
          <div className="container">
            <div className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4">
              <div className="col-md-6 d-flex align-items-center text-muted fs-4 ">
                <p className="ms-5 ps-5">
                  We connect buyers and sellers for an energy and sustainable
                  economy!
                </p>
              </div>
              <div className="col-md-2 justify-content-end ">
                <p style={{ color: "#272D37" }}>
                  <i className="fa-solid fa-map" style={{ color: "#272D37" }} />{" "}
                  Viseu
                </p>
                <p style={{ color: "#272D37" }}>
                  <i
                    className="fa-regular fa-comment"
                    style={{ color: "#272D37" }}
                  />{" "}
                  +351 345 678
                </p>
              </div>
            </div>
            <footer className="d-flex flex-wrap justify-content-around align-items-center py-3 mt-4 border-top">
              <div className="col-md-5 d-flex align-items-center ">
                <a
                  href="/"
                  className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
                >
                  <svg className="bi" width={30} height={24}>
                    <use xlinkHref="#bootstrap" />
                  </svg>
                </a>
                <span className="mb-3 mb-md-0 text-muted">
                  © 2024 Need to know
                </span>
              </div>
              <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3">
                  <a className="text-muted" href="#">
                    <i
                      className="fa-brands fa-twitter rounded-circle p-2"
                      style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
                    />
                  </a>
                </li>
                <li className="ms-3">
                  <a className="text-muted" href="#">
                    <i
                      className="fa-brands fa-square-facebook rounded-circle p-2"
                      style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
                    />
                  </a>
                </li>
                <li className="ms-3">
                  <a className="text-muted" href="#">
                    <i
                      className="fa-brands fa-instagram rounded-circle p-2"
                      style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
                    />
                  </a>
                </li>
              </ul>
            </footer>
          </div>
        </div>
      </footer>
    </div>
  );
}
