import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthService from "./auth.service";
import AtualUtilizador from "./atualUtilizador";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import avatar from "../images/avatars/01.png";
import banner from "../images/dashboard/top-header.png";
import iconbanner from "../images/wonderit/customer-behavior 1.png";

const baseUrl = "http://localhost:3000";

export default function Definicoes() {
  //variáveis para atribuir valores para usar na página de definições e puder alterá-las
  const [dataUtilizador, setdataUtilizador] = useState("");
  const [campnomeuser, setcampnomeuser] = useState("");
  const [campemail, setcampemail] = useState("");
  const [camptelemovel, setcamptelemovel] = useState("");
  const [campnif, setcampnif] = useState("");
  const [campmorada, setcampmorada] = useState("");
  const [campPass, setcampPass] = useState("");
  const [dataUtilizadores, setdataUtilizadores] = useState([]);
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUserId();

  useEffect(() => {
    LoadUtilizadores();
  }, []);

  function LoadUtilizadores() {
    const url = "http://localhost:3000/utilizadores/";
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setdataUtilizadores(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  //atribuir os valores do utilizador para mostrar nas definições para depois se alterar
  useEffect(() => {
    const url = `${baseUrl}/utilizadores/${currentUser}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data[0];
          setdataUtilizador(data);
          setcampnomeuser(data.nomeuser);
          setcampemail(data.email);
          setcamptelemovel(data.telemovel);
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

  //função que altera a nova informação que está nos campos
  function sendUpdate() {
    // url de backend
    const url = `${baseUrl}/utilizadores/update/${currentUser}`;
    console.log(url);
    const datapost = {
      nomeuser: campnomeuser,
      email: campemail,
      telemovel: camptelemovel,
      nif: campnif,
      morada: campmorada,
    };
    axios
      .put(url, datapost)
      .then((response) => {
        if (response.data.success === true) {
          Swal.fire({
            icon: "success",
            title: "Perfil atualizado com sucesso!",
            showConfirmButton: false,
            timer: 2500,
          });
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
  }

  //função que elimina o utilizador que está logado neste momento
  function OnDelete(currentUser) {
    Swal.fire({
      title: "Tem a certeza que apagar a sua conta?",
      text: "Irá ficar sem a sua conta e as suas transações!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, quero apagar",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.value) {
        SendDelete(currentUser);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "Este utilizador não foi apagado.", "error");
      }
    });
  }
  function SendDelete(userId) {
    const baseUrl = "http://localhost:3000/utilizadores/delete";
    axios
      .delete(baseUrl, {
        data: { iduser: userId },
      })
      .then((response) => {
        if (response.data.success) {
          Swal.fire(
            "Utilizador apagado!",
            "O utilizador foi apagado com sucesso.",
            "success"
          );
          navigate(`/`);
        }
      })
      .catch((error) => {
        alert("Error 325");
      });
  }

  //função que dita a barra lateral, pois a página definições é usada pelos 3 tipos de roles que existem no site por isso adapata-se se o utilizador for vendedor, comprador ou admin
  function aside() {
    return dataUtilizadores.map((data, index) => {
      if (data.iduser == currentUser) {
        console.log(data.iduser);
        if (data.ligacaoUsers[0].tipoutilizadoreCode == "V") {
          return (
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
                  className="nav-link active"
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
          );
        } else if (data.ligacaoUsers[0].tipoutilizadoreCode == "C") {
          return (
            <ul className="navbar-nav iq-main-menu" id="sidebar-menu">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/dashboard_comprador/${currentUser}`}
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
                  to={`/compras/${currentUser}`}
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
                        d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                        fill="currentColor"
                      />
                    </svg>
                  </i>
                  <span className="item-name">Compras</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
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
          );
        } else {
          return (
            <ul className="navbar-nav iq-main-menu" id="sidebar-menu">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/dashboard_admin/`}
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
                  to={`/perfis_utilizadores/`}
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
                        d="M14.2124 7.76241C14.2124 10.4062 12.0489 12.5248 9.34933 12.5248C6.6507 12.5248 4.48631 10.4062 4.48631 7.76241C4.48631 5.11865 6.6507 3 9.34933 3C12.0489 3 14.2124 5.11865 14.2124 7.76241ZM2 17.9174C2 15.47 5.38553 14.8577 9.34933 14.8577C13.3347 14.8577 16.6987 15.4911 16.6987 17.9404C16.6987 20.3877 13.3131 21 9.34933 21C5.364 21 2 20.3666 2 17.9174ZM16.1734 7.84875C16.1734 9.19506 15.7605 10.4513 15.0364 11.4948C14.9611 11.6021 15.0276 11.7468 15.1587 11.7698C15.3407 11.7995 15.5276 11.8177 15.7184 11.8216C17.6167 11.8704 19.3202 10.6736 19.7908 8.87118C20.4885 6.19676 18.4415 3.79543 15.8339 3.79543C15.5511 3.79543 15.2801 3.82418 15.0159 3.87688C14.9797 3.88454 14.9405 3.90179 14.921 3.93246C14.8955 3.97174 14.9141 4.02253 14.9396 4.05607C15.7233 5.13216 16.1734 6.44206 16.1734 7.84875ZM19.3173 13.7023C20.5932 13.9466 21.4317 14.444 21.7791 15.1694C22.0736 15.7635 22.0736 16.4534 21.7791 17.0475C21.2478 18.1705 19.5335 18.5318 18.8672 18.6247C18.7292 18.6439 18.6186 18.5289 18.6333 18.3928C18.9738 15.2805 16.2664 13.8048 15.5658 13.4656C15.5364 13.4493 15.5296 13.4263 15.5325 13.411C15.5345 13.4014 15.5472 13.3861 15.5697 13.3832C17.0854 13.3545 18.7155 13.5586 19.3173 13.7023Z"
                        fill="currentColor"
                      />
                    </svg>
                  </i>
                  <span className="item-name">Perfis de Utilizadores</span>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
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
                </a>
              </li>
            </ul>
          );
        }
      }
    });
  }

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
                  className=" icon-30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="-0.757324"
                    y="19.2427"
                    width={28}
                    height={4}
                    rx={2}
                    transform="rotate(-45 -0.757324 19.2427)"
                    fill="currentColor"
                  />
                  <rect
                    x="7.72803"
                    y="27.728"
                    width={28}
                    height={4}
                    rx={2}
                    transform="rotate(-45 7.72803 27.728)"
                    fill="currentColor"
                  />
                  <rect
                    x="10.5366"
                    y="16.3945"
                    width={16}
                    height={4}
                    rx={2}
                    transform="rotate(45 10.5366 16.3945)"
                    fill="currentColor"
                  />
                  <rect
                    x="10.5562"
                    y="-0.556152"
                    width={28}
                    height={4}
                    rx={2}
                    transform="rotate(45 10.5562 -0.556152)"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="logo-mini">
                <svg
                  className=" icon-30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="-0.757324"
                    y="19.2427"
                    width={28}
                    height={4}
                    rx={2}
                    transform="rotate(-45 -0.757324 19.2427)"
                    fill="currentColor"
                  />
                  <rect
                    x="7.72803"
                    y="27.728"
                    width={28}
                    height={4}
                    rx={2}
                    transform="rotate(-45 7.72803 27.728)"
                    fill="currentColor"
                  />
                  <rect
                    x="10.5366"
                    y="16.3945"
                    width={16}
                    height={4}
                    rx={2}
                    transform="rotate(45 10.5366 16.3945)"
                    fill="currentColor"
                  />
                  <rect
                    x="10.5562"
                    y="-0.556152"
                    width={28}
                    height={4}
                    rx={2}
                    transform="rotate(45 10.5562 -0.556152)"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            {/*logo End*/}
            <h4 className="logo-title">Need to know</h4>
          </Link>
        </div>
        <div className="sidebar-body pt-0 data-scrollbar">
          <div className="sidebar-list">
            {/* Sidebar Menu Start */}
            {aside()}
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
                      className="text-primary icon-30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="-0.757324"
                        y="19.2427"
                        width={28}
                        height={4}
                        rx={2}
                        transform="rotate(-45 -0.757324 19.2427)"
                        fill="currentColor"
                      />
                      <rect
                        x="7.72803"
                        y="27.728"
                        width={28}
                        height={4}
                        rx={2}
                        transform="rotate(-45 7.72803 27.728)"
                        fill="currentColor"
                      />
                      <rect
                        x="10.5366"
                        y="16.3945"
                        width={16}
                        height={4}
                        rx={2}
                        transform="rotate(45 10.5366 16.3945)"
                        fill="currentColor"
                      />
                      <rect
                        x="10.5562"
                        y="-0.556152"
                        width={28}
                        height={4}
                        rx={2}
                        transform="rotate(45 10.5562 -0.556152)"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="logo-mini">
                    <svg
                      className="text-primary icon-30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="-0.757324"
                        y="19.2427"
                        width={28}
                        height={4}
                        rx={2}
                        transform="rotate(-45 -0.757324 19.2427)"
                        fill="currentColor"
                      />
                      <rect
                        x="7.72803"
                        y="27.728"
                        width={28}
                        height={4}
                        rx={2}
                        transform="rotate(-45 7.72803 27.728)"
                        fill="currentColor"
                      />
                      <rect
                        x="10.5366"
                        y="16.3945"
                        width={16}
                        height={4}
                        rx={2}
                        transform="rotate(45 10.5366 16.3945)"
                        fill="currentColor"
                      />
                      <rect
                        x="10.5562"
                        y="-0.556152"
                        width={28}
                        height={4}
                        rx={2}
                        transform="rotate(45 10.5562 -0.556152)"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                {/*logo End*/}
                <h4 className="logo-title">Need to know</h4>
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
                  <div className="flex-wrap d-flex justify-content-between ">
                    <div>
                      <h1>DEFINIÇÕES</h1>
                      <p>Aqui poderá alterar todos os dados da sua conta</p>
                    </div>
                    <div>
                      <img
                        className="rounded bg-soft-primary img-fluid"
                        src={iconbanner}
                        alt="profile"
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
          </div>
          {/* Nav Header Component End */}
          {/*Nav End*/}
        </div>
        <div className="container-fluid content-inner py-0">
          <div className="row mt-5">
            {/*Dados da Minha Conta*/}
            <p className="h2 text-center mb-4">Dados da Minha Conta</p>
            <div className="col-sm-12 col-lg-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <form className="row g-3 needs-validation" noValidate>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Nome
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
                        Telemóvel
                      </label>
                      <div className="form-group input-group">
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
                      </div>
                      <div className="invalid-feedback">Insira um Nome.</div>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        E-mail
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={campemail}
                        onChange={(value) => setcampemail(value.target.value)}
                        id="validationCustom01"
                        defaultValue
                        required
                      />
                      <div className="invalid-feedback">Insira um E-mail.</div>
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
                      <div className="invalid-feedback">Insira o nif.</div>
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Morada
                      </label>
                      <input
                        type="text"
                        value={campmorada}
                        onChange={(value) => setcampmorada(value.target.value)}
                        className="form-control"
                        id="validationCustom01"
                        defaultValue
                        required
                      />
                      <div className="invalid-feedback">Insira uma Morada.</div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary mb-4"
                        type="submit"
                        onClick={() => sendUpdate()}
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/*Alterar Password
                        <p className="h2 text-center mb-4">Alterar Password</p>
                        <div className="col-sm-12 col-lg-12 justify-content-middle">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <form className="row g-3 needs-validation" noValidate>
                                        <div className="col-md-6">
                                            <label htmlFor="validationCustom01" className="form-label">Password Atual</label>
                                            <input type="text" className="form-control" id="validationCustom01" defaultValue required />
                                            <div className="invalid-feedback">
                                                Insira algum texto.
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="validationCustom01" className="form-label">Nova Password</label>
                                            <input type="password" value={campPass}
                                                onChange={value => setcampPass(value.target.value)} className="form-control" id="validationCustom01" defaultValue required />
                                            <div className="invalid-feedback">
                                                Insira algum texto.
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary mb-4" type="submit" onClick={() => sendUpdate()}>Alterar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>*/}
            {/*Apagar Conta*/}
            <div className="col-sm-12 col-lg-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <form className="row g-3 needs-validation" noValidate>
                    <div className="col-md-12">
                      <Link
                        className="btn btn-danger mb-4 me-4"
                        onClick={() => OnDelete(currentUser)}
                      >
                        Apagar a Conta
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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
        {/* Footer Section End */}
      </main>
      {/* Wrapper End*/}
      {/* offcanvas start */}
    </div>
  );
}
