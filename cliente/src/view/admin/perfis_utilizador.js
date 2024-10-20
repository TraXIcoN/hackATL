import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Line } from "react-chartjs-2"; // Import Line chart
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"; // Import necessary components

import "../../css/modal_style.css";
import AuthService from "../auth.service";
import AtualUtilizador from "../atualUtilizador";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import avatar from "../../images/avatars/01.png";
import banner from "../../images/dashboard/top-header.png";
import iconbanner from "../../images/wonderit/customer-behavior 1.png";

// Register the necessary components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function PerfilUtilizadores() {
  const [dataUtilizadores, setDataUtilizadores] = useState([]);
  const [dataLigacao, setDataLigacao] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // New state for dashboard metrics
  const [dashboardData, setDashboardData] = useState({
    users: 26000,
    income: 6200,
    conversionRate: 2.49,
    sessions: 44000,
    trafficData: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Visits",
          data: [200, 150, 250, 300, 200, 400, 350],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([LoadUtilizadores(), LoadLigacao()]);
      } catch (error) {
        alert("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const LoadUtilizadores = async () => {
    const url = "http://localhost:3000/utilizadores/";
    const res = await axios.get(url);
    if (res.data.success) {
      setDataUtilizadores(res.data.data);
    } else {
      throw new Error("Error Web Service!");
    }
  };

  const LoadLigacao = async () => {
    const url = "http://localhost:3000/ligacao/";
    const res = await axios.get(url);
    if (res.data.success) {
      setDataLigacao(res.data.data);
    } else {
      throw new Error("Error Web Service!");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const renderUtilizadoresAdmin = () => {
    return dataUtilizadores.map((user) => {
      const userLink = dataLigacao.find(
        (link) => link.utilizadoreIduser === user.iduser
      );
      const tipoUtilizador = userLink
        ? userLink.tipoutilizadoreCode === "V"
          ? "Seller"
          : userLink.tipoutilizadoreCode === "C"
          ? "Buyer"
          : "Admin"
        : "Unknown";

      return (
        <tr key={user.iduser}>
          <td>
            <div className="d-flex align-items-center">
              <img
                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                src={avatar}
                alt="profile"
              />
              <h6>{user.nomeuser}</h6>
            </div>
          </td>
          <td>{tipoUtilizador}</td>
          <td>{user.nCompras + user.servicosVendidos}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleUserClick(user)}
            >
              <i className="fa-solid fa-eye"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <aside className="sidebar sidebar-default sidebar-white sidebar-base navs-rounded-all ">
        {/* Sidebar content */}
      </aside>
      <main className="main-content">
        <div className="container-fluid content-inner mt-n5 py-0">
          <div className="row mt-5">
            {/* Dashboard Cards */}
            <div className="col-md-3">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Users</h5>
                  <p className="card-text">
                    {dashboardData.users}{" "}
                    <span className="text-warning">(-12.4%)</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-info mb-3">
                <div className="card-body">
                  <h5 className="card-title">Income</h5>
                  <p className="card-text">
                    ${dashboardData.income}{" "}
                    <span className="text-success">(40.9%)</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-warning mb-3">
                <div className="card-body">
                  <h5 className="card-title">Conversion Rate</h5>
                  <p className="card-text">
                    {dashboardData.conversionRate}%{" "}
                    <span className="text-success">(84.7%)</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-danger mb-3">
                <div className="card-body">
                  <h5 className="card-title">Sessions</h5>
                  <p className="card-text">
                    {dashboardData.sessions}{" "}
                    <span className="text-danger">(-23.6%)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Traffic Chart */}
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Traffic</h4>
                </div>
                <div className="card-body">
                  <Line data={dashboardData.trafficData} />
                </div>
              </div>
            </div>
          </div>

          {/* User Profiles Table */}
          <div className="row mt-5">
            <div className="col-md-12 col-lg-12">
              <div className="overflow-hidden card">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Utilizadores</h4>
                  </div>
                </div>
                <div className="p-0 card-body">
                  <div className="mt-4 table-responsive">
                    <table id="basic-table" className="table mb-0" role="grid">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Role</th>
                          <th>Trocas</th>
                          <th>Perfil</th>
                        </tr>
                      </thead>
                      <tbody>{renderUtilizadoresAdmin()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for user details */}
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Utilizador nº: {selectedUser?.iduser}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card rounded">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12 mt-4">
                      <div className="table-responsive-lg">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>
                                <h6 className="mb-0">Nome</h6>
                              </td>
                              <td className="text-center">
                                {selectedUser?.nomeuser}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6 className="mb-0">Email</h6>
                              </td>
                              <td className="text-center">
                                {selectedUser?.email}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6 className="mb-0">Telemovel</h6>
                              </td>
                              <td className="text-center">
                                {selectedUser?.telemovel}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6 className="mb-0">CPE</h6>
                              </td>
                              <td className="text-center">
                                {selectedUser?.cpe}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6 className="mb-0">NIF</h6>
                              </td>
                              <td className="text-center">
                                {selectedUser?.nif}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          {/* Footer Section */}
          <footer className="footer">
            <div>
              <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4">
                  <div className="col-md-6 d-flex align-items-center text-muted fs-4 ">
                    <p className="ms-5 ps-5">
                      Conectamos compradores e vendedores para uma economia
                      energética e sustentável!
                    </p>
                  </div>
                  <div className="col-md-2 justify-content-end ">
                    <p style={{ color: "#272D37" }}>
                      <i
                        className="fa-solid fa-map"
                        style={{ color: "#272D37" }}
                      />{" "}
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
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
