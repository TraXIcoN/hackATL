import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AuthService from "../auth.service";
import AtualUtilizador from "../atualUtilizador";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import avatar from "../../images/avatars/01.png";
import banner from "../../images/dashboard/top-header.png";
import iconbanner from "../../images/wonderit/customer-behavior 1.png";

const baseUrl = "http://localhost:3000";

export default function AnunciarVenda() {
  //variáveis usadas para atribuir dados, ir buscar o id do utilizador que está logado e ir buscar dados
  const currentUser = AuthService.getCurrentUserId();
  const [dataUtilizador, setdataUtilizador] = useState("");
  const [campnomeuser, setcampnomeuser] = useState("");
  const [campemail, setcampemail] = useState("");
  const [camptelemovel, setcamptelemovel] = useState("");
  const [campcpe, setcampcpe] = useState("");
  const [campnif, setcampnif] = useState("");
  const [campmorada, setcampmorada] = useState("");
  const [campprecomes, setcampprecomes] = useState("");
  const [camppotenciainfraestrutura, setcamppotenciainfraestrutura] =
    useState("");
  const [campduracaovenda, setcampduracaovenda] = useState("");

  //função que atribui valores ao utilizador que está logado
  useEffect(() => {
    const url = `${baseUrl}/utilizadores/${currentUser}`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data[0];
          setdataUtilizador(data);
          setcampnomeuser(data.nomeuser);
          setcampemail(data.email);
          setcamptelemovel(data.telemovel);
          setcampcpe(data.cpe);
          setcampnif(data.nif);
          setcampmorada(data.morada);
        } else {
          alert("Error web service");
        }
      })
      .catch((error) => {
        alert("Error server: " + error);
      });
  }, []);

  //função que cria uma nova venda e atribui esses dados na base de dados
  function SendSave() {
    if (campprecomes === "") {
      alert("Insira o preço do contrato!");
    } else if (camppotenciainfraestrutura === "") {
      alert("Insira a potência!");
    } else if (campduracaovenda === "") {
      alert("Introduza a duração do contrato!");
    } else if (campnomeuser === "") {
      alert("Introduza o nome que vai constar no contrato!");
    } else if (campemail === "") {
      alert("Introduza o mail!");
    } else if (camptelemovel === "") {
      alert("Introduza o telemovel!");
    } else if (campcpe === "") {
      alert("Introduza o cpe!");
    } else if (campnif === "") {
      alert("Introduza o nif!");
    } else if (campmorada === "") {
      alert("Insira uma morada!");
    } else {
      const baseUrl = "http://localhost:3000/ofertas/create";
      const datapost = {
        nomevendedor: campnomeuser,
        duracaovenda: campduracaovenda,
        potenciaproduto: camppotenciainfraestrutura,
        precomes: campprecomes,
        utilizadoreIduser: currentUser,
      };
      console.log(datapost);
      axios
        .post(baseUrl, datapost)
        .then((response) => {
          if (response.data.success === true) {
            Swal.fire({
              icon: "success",
              title: "A oferta foi criada com sucesso!",
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          alert("Error 34 " + error);
        });
    }
  }

  //return final da view
  return (
    <div>
      <aside className="sidebar sidebar-default sidebar-white sidebar-base navs-rounded-all ">
        <div className="sidebar-header d-flex align-items-center justify-content-start">
          <Link to={`/`} className="navbar-brand">
            {/*Logo start*/}
            {/*logo End*/}
            {/*Logo start*/}
            <div className="logo-main">
              <div className="logo-normal">
                <svg
                  className="icon-30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 2L3 14h8v8l10-12h-8V2z" fill="currentColor" />
                </svg>
              </div>
              <div className="logo-mini">
                <svg
                  className="icon-30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 2L3 14h8v8l10-12h-8V2z" fill="currentColor" />
                </svg>
              </div>
            </div>
            {/*logo End*/}
            <h4 className="logo-title">UrbanPulse</h4>
          </Link>
        </div>
        <div className="sidebar-body pt-0 data-scrollbar">
          <div className="sidebar-list">
            {/* Sidebar Menu Start */}
            <ul className="navbar-nav iq-main-menu" id="sidebar-menu">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/dashboard_vendedor/${currentUser}`}
                >
                  <i className="icon">
                    <svg
                      width={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-20"
                    >
                      <path
                        opacity="0.4"
                        d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                        fill="currentColor"
                      />
                    </svg>
                  </i>
                  <span className="item-name">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/infraestrutura/${currentUser}`}
                >
                  <i className="icon">
                    <svg
                      width={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.33 2H16.66C20.06 2 22 3.92 22 7.33V16.67C22 20.06 20.07 22 16.67 22H7.33C3.92 22 2 20.06 2 16.67V7.33C2 3.92 3.92 2 7.33 2ZM12.82 12.83H15.66C16.12 12.82 16.49 12.45 16.49 11.99C16.49 11.53 16.12 11.16 15.66 11.16H12.82V8.34C12.82 7.88 12.45 7.51 11.99 7.51C11.53 7.51 11.16 7.88 11.16 8.34V11.16H8.33C8.11 11.16 7.9 11.25 7.74 11.4C7.59 11.56 7.5 11.769 7.5 11.99C7.5 12.45 7.87 12.82 8.33 12.83H11.16V15.66C11.16 16.12 11.53 16.49 11.99 16.49C12.45 16.49 12.82 16.12 12.82 15.66V12.83Z"
                        fill="currentColor"
                      />
                    </svg>
                  </i>
                  <span className="item-name">Add Infraestrutura</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/definicoes/${currentUser}`}
                >
                  <i className="icon">
                    <svg
                      width={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.4023 13.58C20.76 13.77 21.036 14.07 21.2301 14.37C21.6083 14.99 21.5776 15.75 21.2097 16.42L20.4943 17.62C20.1162 18.26 19.411 18.66 18.6855 18.66C18.3278 18.66 17.9292 18.56 17.6022 18.36C17.3365 18.19 17.0299 18.13 16.7029 18.13C15.6911 18.13 14.8429 18.96 14.8122 19.95C14.8122 21.1 13.872 22 12.6968 22H11.3069C10.1215 22 9.18125 21.1 9.18125 19.95C9.16081 18.96 8.31259 18.13 7.30085 18.13C6.96361 18.13 6.65702 18.19 6.40153 18.36C6.0745 18.56 5.66572 18.66 5.31825 18.66C4.58245 18.66 3.87729 18.26 3.49917 17.62L2.79402 16.42C2.4159 15.77 2.39546 14.99 2.77358 14.37C2.93709 14.07 3.24368 13.77 3.59115 13.58C3.87729 13.44 4.06125 13.21 4.23498 12.94C4.74596 12.08 4.43937 10.95 3.57071 10.44C2.55897 9.87 2.23194 8.6 2.81446 7.61L3.49917 6.43C4.09191 5.44 5.35913 5.09 6.38109 5.67C7.27019 6.15 8.425 5.83 8.9462 4.98C9.10972 4.7 9.20169 4.4 9.18125 4.1C9.16081 3.71 9.27323 3.34 9.4674 3.04C9.84553 2.42 10.5302 2.02 11.2763 2H12.7172C13.4735 2 14.1582 2.42 14.5363 3.04C14.7203 3.34 14.8429 3.71 14.8122 4.1C14.7918 4.4 14.8838 4.7 15.0473 4.98C15.5685 5.83 16.7233 6.15 17.6226 5.67C18.6344 5.09 19.9118 5.44 20.4943 6.43L21.179 7.61C21.7718 8.6 21.4447 9.87 20.4228 10.44C19.5541 10.95 19.2475 12.08 19.7687 12.94C19.9322 13.21 20.1162 13.44 20.4023 13.58ZM9.10972 12.01C9.10972 13.58 10.4076 14.83 12.0121 14.83C13.6165 14.83 14.8838 13.58 14.8838 12.01C14.8838 10.44 13.6165 9.18 12.0121 9.18C10.4076 9.18 9.10972 10.44 9.10972 12.01Z"
                        fill="currentColor"
                      />
                    </svg>
                  </i>
                  <span className="item-name">Definições</span>
                </Link>
              </li>
            </ul>
            {/* Sidebar Menu End */}
          </div>
        </div>
        <div className="sidebar-footer" />
      </aside>
      <main className="main-content">
        <div className="position-relative iq-banner">
          {/*Nav Start*/}
          <nav className="nav navbar navbar-expand-lg navbar-light iq-navbar">
            <div className="container-fluid navbar-inner">
              <a href="../dashboard/index.html" className="navbar-brand">
                {/*Logo start*/}
                {/*logo End*/}
                {/*Logo start*/}
                <div className="logo-main">
                  <div className="logo-normal">
                    <svg
                      className="icon-30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 2L3 14h8v8l10-12h-8V2z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="logo-mini">
                    <svg
                      className="icon-30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 2L3 14h8v8l10-12h-8V2z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                {/*logo End*/}
                <h4 className="logo-title">UrbanPulse</h4>
              </a>
              <div
                className="sidebar-toggle"
                data-toggle="sidebar"
                data-active="true"
              >
                <i className="icon">
                  <svg width="20px" className="icon-20" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                    />
                  </svg>
                </i>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon">
                  <span className="mt-2 navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
                  <AtualUtilizador />
                </ul>
              </div>
            </div>
          </nav>{" "}
          {/* Nav Header Component Start */}
          <div className="iq-navbar-header" style={{ height: "215px" }}>
            <div className="container-fluid iq-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="flex-wrap d-flex justify-content-between align-items-center">
                    <div>
                      <h1>Anunciar Venda</h1>
                      <p>Aqui poderá registar uma nova venda</p>
                    </div>
                    <div>
                      <img
                        src={iconbanner}
                        className="img-fluid"
                        style={{ height: "100px", width: "120px" }}
                        alt="Responsive image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="iq-header-img">
              <img
                src={banner}
                alt="header"
                className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"
              />
            </div>
            {/* Nav Header Component End */}
            {/*Nav End*/}
          </div>
          {/* Nav Header Component End */}
          {/*Nav End*/}
        </div>
        <div className="container-fluid content-inner py-0">
          <div className="row mt-5">
            {/*Dados Pessoais*/}
            <p className="h2 text-center mb-4">Dados Pessoais</p>
            <div className="col-sm-12 col-lg-12">
              <div className="card">
                <div className="card-header mb-4 d-flex justify-content-between">
                  <form className="row g-3 needs-validation" noValidate>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Primeiro Nome
                      </label>
                      <input
                        type="text"
                        value={campnomeuser}
                        onChange={(value) =>
                          setcampnomeuser(value.target.value)
                        }
                        className="form-control"
                        id="validationCustom01"
                        defaultValue
                        required
                      />
                      <div className="invalid-feedback">Insira um Nome.</div>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom02"
                        className="form-label"
                      >
                        E-mail
                      </label>
                      <div className="form-group input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={campemail}
                          onChange={(value) => setcampemail(value.target.value)}
                          id="validationCustom02"
                          defaultValue
                          required
                        />
                      </div>
                      <div className="invalid-feedback">Insira um E-mail.</div>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Morada
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={campmorada}
                        onChange={(value) => setcampmorada(value.target.value)}
                        id="validationCustom01"
                        defaultValue
                        required
                      />
                      <div className="invalid-feedback">Insira um Nome.</div>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom02"
                        className="form-label"
                      >
                        Telemóvel
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={camptelemovel}
                        onChange={(value) =>
                          setcamptelemovel(value.target.value)
                        }
                        id="validationCustom02"
                        defaultValue
                        required
                      />
                      <div className="invalid-feedback">
                        Insira um Telemóvel.
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        CPE de Produtor
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={campcpe}
                        onChange={(value) => setcampcpe(value.target.value)}
                        id="validationCustom01"
                        defaultValue
                        required
                      />
                      <div className="invalid-feedback">
                        Insira um CPE de Produto.
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom02"
                        className="form-label"
                      >
                        NIF
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={campnif}
                        onChange={(value) => setcampnif(value.target.value)}
                        id="validationCustom02"
                        defaultValue
                        required
                      />
                      <div className="invalid-feedback">Insira um NIF.</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/*Dados do Contrato*/}
            <p className="h2 text-center mb-4">Dados do Contrato</p>
            <div className="col-sm-12 col-lg-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <form className="row g-3 needs-validation" noValidate>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Preço por mês
                      </label>
                      <input
                        type="text"
                        value={campprecomes}
                        onChange={(value) =>
                          setcampprecomes(value.target.value)
                        }
                        className="form-control"
                        id="validationCustom01"
                        defaultValue
                        required
                      />
                      <div className="invalid-feedback">
                        Please choose a username.
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Potência da Infraestrutura
                      </label>
                      <div className="form-group input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={camppotenciainfraestrutura}
                          onChange={(value) =>
                            setcamppotenciainfraestrutura(value.target.value)
                          }
                          id="validationCustom01"
                          defaultValue
                          required
                        />
                        <span className="input-group-text" id="basic-addon1">
                          kw
                        </span>
                      </div>
                      <div className="invalid-feedback">
                        Insira uma Infraestrutura.
                      </div>
                    </div>
                    <div className="col-md-3">
                      <Link
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: "2em" }}
                        to={`/infraestrutura/${currentUser}`}
                      >
                        <a className="nav-link" aria-current="page">
                          Adicionar Infraestrutura
                        </a>
                      </Link>
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Período de Contrato
                      </label>
                      <div className="form-group input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={campduracaovenda}
                          onChange={(value) =>
                            setcampduracaovenda(value.target.value)
                          }
                          id="validationCustom01"
                          defaultValue
                          required
                        />
                        <span className="input-group-text" id="basic-addon1">
                          meses
                        </span>
                      </div>
                      <div className="invalid-feedback">
                        Insira um Período de Contrato.
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-12">
                      <Link to={`/dashboard_vendedor/${currentUser}`}>
                        <button
                          className="btn btn-primary mb-4"
                          onClick={() => SendSave()}
                          type="submit"
                        >
                          Criar Venda
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-download">
          <a
            className="btn btn-primary px-3 py-3 rounded-circle"
            target="_blank"
            onclick="scrollToTop()"
          >
            <svg
              className="icon-32"
              width={32}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5899 11.8585C6.71614 12.0925 6.95618 12.2384 7.21726 12.2384H11.2827V20.2657C11.2827 20.671 11.604 21 12 21C12.3959 21 12.7172 20.671 12.7172 20.2657V12.2384H16.7827C17.0447 12.2384 17.2848 12.0925 17.4101 11.8585C17.5372 11.6245 17.5286 11.3386 17.39 11.1125L12.6073 3.34267C12.4753 3.12924 12.2467 3 12 3C11.7532 3 11.5247 3.12924 11.3927 3.34267L6.60998 11.1125C6.5373 11.2319 6.5 11.368 6.5 11.5041C6.5 11.6255 6.5306 11.7479 6.5899 11.8585Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
        {/* Footer Section Start */}
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
                    © 2023 wonderit
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
        {/* Footer Section End */}
      </main>
      {/* Wrapper End*/}
      {/* offcanvas start */}
    </div>
  );
}
