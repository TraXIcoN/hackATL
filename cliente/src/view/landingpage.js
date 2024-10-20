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
              Smart Energy Management 
              <br />
              for Smarter Cities
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
                Power Saving Subscriptions
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
                  Energy Storage & Profit Maximization
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
                  Sustainability & Clean Energy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container  d-flex justify-content-around my-5">
          <div className="col-5">
            <h3>What is Charge Power?</h3>
            <p>
            chargePower is an intelligent energy optimization platform that leverages AI to manage electricity consumption, storage, and distribution. By monitoring grid capacity, electricity prices, and real-time consumer data, it optimizes power usage through three main strategies: controlling high-energy devices, charging batteries during off-peak times, and discharging stored energy to the grid during peak demand. This innovative approach enables both cost savings and profit generation through energy subscriptions, dynamic pricing, and solar power production.
    
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
            <h2 className="mb-1 fw-semibold">Our Three-Phase Plan for Energy Optimization</h2>
            <p>
              
              <br />
              <br />
              
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
                  <h6 className="fw-bold">Phase 1: Power Saving Subscriptions</h6>
                  <p>
                  We begin by offering energy-saving subscriptions to consumers, encouraging participation in the chargePower network. This phase helps us build momentum while gathering valuable data on user behavior and energy consumption patterns. By refining our AI model, we ensure smarter, more efficient energy management, tailored to meet the needs of our users.
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
                  Phase 2: Battery Network Buildout with ‘Charge Back’ Capabilities
                  </h6>
                  <p>
                  Next, we partner with inner-city condos, businesses, and electric vehicle (EV) charging companies to install battery storage systems. These batteries will enable users to "charge back" excess energy to the grid during peak demand periods, helping to stabilize the grid and provide additional revenue. At the very least, during high energy demand periods, slow charging will be enabled, contributing to a more balanced and efficient electricity ecosystem.
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
                    Phase 3: High-Efficiency Solar Panel Network
                    </h6>
                    <p>
                    In the final phase, we will expand into solar energy production by working with city buildings to secure permits for installing solar panels on their rooftops. These panels will charge the pre-installed batteries, further enhancing our ability to produce and store clean, renewable energy. This step aligns with our commitment to sustainability and reduces reliance on traditional grid sources.
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
                    Overview
                    </h6>
                    <p>
                    chargePower optimizes energy usage by integrating AI with real-time data from the grid, consumer devices, and weather patterns. Our three-phase approach includes power-saving subscriptions, building a battery network with "charge back" capabilities, and solar energy integration to ensure sustainable, cost-effective energy management.
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
          <h3 className="fw-semibold">How Do We Actually Make Money?</h3>
          <p></p>
          <div className="row">
            <div className="col-1 me-2">
              <i
                className="fa-solid fa-clipboard-check p-2 rounded "
                style={{ color: "#ffffff", backgroundColor: "#1C1E53" }}
              />
            </div>
            <div className="col-10">
              <h6 className="fw-bold">Energy Saving Subscriptions</h6>
              <p>
                
              We offer energy-saving subscriptions that optimize electricity usage for consumers, providing cost savings while generating revenue for chargePower.
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
              <h6 className="fw-bold">Buying and Selling Energy</h6>
              <p>
              
              chargePower buys electricity at off-peak prices and sells it back to the grid at peak demand, profiting from market fluctuations.
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
              <h6 className="fw-bold">Solar and Battery Integration</h6>
              <p>
              
              As we increase solar panel installations and battery storage capacity, our profitability grows with reduced reliance on the grid and precise AI-driven energy management.
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
                "Empowering a sustainable future through intelligent energy innovation."
                </p>
              </div>
              <div className="col-md-2 justify-content-end ">
                <p style={{ color: "#272D37" }}>
                  <i className="fa-solid fa-map" style={{ color: "#272D37" }} />{" "}
                  Urban_Pulse@gmail.com
                </p>
                <p style={{ color: "#272D37" }}>
                  <i
                    className="fa-regular fa-comment"
                    style={{ color: "#272D37" }}
                  />{" "}
                  +470 689 6057
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
