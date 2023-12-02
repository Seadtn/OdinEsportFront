import React, { useEffect, useState } from "react";
import { Row, Col, Form, Image } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
// img
import imgsuccess from "../../../assets/images/pages/img-success.png";
import request from "../../../services/request";
const data = new FormData();
const SignUp = () => {
  const [show, AccountShow] = useState("A");
  const [err, SetErr] = useState({ state: false, message: "" });
  const [type, SetType] = useState("");
  const [yes, SetSig] = useState(false);
  const [cpwd, SetCpwd] = useState("");
  const [stepOne, setStep1] = useState({
    email: "",
    uname: "",
    pwd: "",
    fname: "",
    lname: "",
    contact: "",
    date: "",
    country: "",
    pos1: "",
    pos2: "",
    profile: "",
    image: null,
    certificate: null,
    deals: "",
  });
  const checkMail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let test = emailPattern.test(email);
    return test;
  };
  const CheckInput = (index, s) => {
    switch (index) {
      case 1:
        if (
          stepOne.email === "" ||
          stepOne.uname === "" ||
          stepOne.pwd === "" ||
          cpwd === ""
        ) {
          SetErr({
            state: true,
            message:
              "Error: There was a problem with the information you provided. Please review and correct any errors before proceeding.",
          });
        } else if (stepOne.pwd !== cpwd) {
          SetErr({
            state: true,
            message:
              "Error: Passwords do not match. Please ensure your password and confirmation match exactly !",
          });
        } else {
          if (checkMail(stepOne.email) && type !== "") {
            SetErr({
              state: false,
              message:
                "Error: There was a problem with the information you provided. Please review and correct any errors before proceeding.",
            });
            AccountShow(s);
          } else if (type === "") {
            SetErr({
              state: true,
              message: "Error: Please enter your account type !",
            });
          } else {
            SetErr({
              state: true,
              message: "Error: Please enter a valid email address !",
            });
          }
        }
        break;
      case 2:
        if (type === "Footballer") {
          if (
            stepOne.fname === "" ||
            stepOne.lname=== "" ||
            stepOne.contact === "" ||
            stepOne.date === "" ||
            stepOne.country === "" ||
            stepOne.position === ""
          ) {
            SetErr({
              state: true,
              message:
                "Error: There was a problem with the information you provided. Please review and correct any errors before proceeding.",
            });
          } else {
            SetErr({
              state: false,
              message:
                "Error: There was a problem with the information you provided. Please review and correct any errors before proceeding.",
            });
            AccountShow(s);
          }
        } else if (type === "Agent") {
          if (
            stepOne.fname === "" ||
            stepOne.lname === "" ||
            stepOne.contact === "" ||
            stepOne.date === "" ||
            stepOne.country === "" ||
            stepOne.profile === ""
          ) {
            SetErr({
              state: true,
              message:
                "Error: There was a problem with the information you provided. Please review and correct any errors before proceeding.",
            });
          } else {
            SetErr({
              state: false,
              message:
                "Error: There was a problem with the information you provided. Please review and correct any errors before proceeding.",
            });
            AccountShow(s);
          }
        }
        break;
      case 3:
        if (type === "Footballer") {
          if (stepOne.image === "" || (yes && stepOne.certificate === "")) {
            SetErr({
              state: true,
              message:
                "Error: There was a problem with the information you provided. Please review and correct any errors before proceeding.",
            });
          } else {
            SetErr({
              state: false,
              message:
                "Error: There was a problem with the information you provided. Please review and correct any errors before proceeding.",
            });
            AccountShow(s);
          }
        } else if (type === "Agent") {
          if (stepOne.image === "") {
            SetErr({
              state: true,
              message:
                "Error: There was a problem with the information you provided. Please review and correct any errors before proceeding.",
            });
          } else {
            SetErr({
              state: false,
              message:
                "Error: There was a problem with the information you provided. Please review and correct any errors before proceeding.",
            });
            AccountShow(s);
          }
        }
        data.append('image', stepOne.image);
        const newData={
          ...stepOne,
          certificate: null,
          image:null,
        }
        data.append('userData', JSON.stringify(newData)); 
        request.RegisterUser(data,type);
        setStep1((prevStep) => ({
          ...prevStep,
          certificate: null,
          image:null,
        }))
        break;
    }
  };
  return (
    <>
      <div className="row m-0 align-items-center bg-white vh-100 ">
        <Row>
          <Col sm="12" lg="12">
            <div>
              <Link
                to="#"
                className="navbar-brand d-flex align-items-center mb-3"
              >
                <svg
                  id="Calque_1"
                  width={"20%"}
                  data-name="Calque 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1446 528.75"
                >
                  <defs>
                    {" "}
                    <style>{`.cls-1{fill:#0d055b;}.cls-2{fill:#1effb1;}`}</style>
                  </defs>
                  <path
                    class="cls-1"
                    d="M952.26,877.79v386.59H686.48l-24.17-48.32-24.16-48.33L614,1119.41l-24.16-48.33L614,1022.76l24.16-48.32,24.16-48.33,24.17-48.32ZM710.64,926.11l-24.16,48.33-24.17,48.32-24.16,48.32,24.16,48.33,24.17,48.32,24.16,48.33H903.93V926.11Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                  <path
                    class="cls-1"
                    d="M542.78,877.79l24.16,48.32,24.16,48.33,24.16,48.32,24.17,48.32-24.17,48.33-24.16,48.32-24.16,48.33-24.16,48.32H277V877.79ZM325.33,926.11v289.95H518.62l24.16-48.33,24.16-48.32,24.16-48.33-24.16-48.32-24.16-48.32-24.16-48.33Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                  <rect
                    class="cls-2"
                    x="690.73"
                    width="48.83"
                    height="46.55"
                  ></rect>
                  <path
                    class="cls-1"
                    d="M1091.4,1029.9q-17.16,0-29.74-6.07a61.71,61.71,0,0,1-20.81-15.87,68.76,68.76,0,0,1-12.31-21.15,64.82,64.82,0,0,1-4.08-21.94v-3.82a67.7,67.7,0,0,1,4.17-23.15A63,63,0,0,1,1041.2,917a61.81,61.81,0,0,1,20.9-15q12.48-5.62,29.3-5.63,16.65,0,29.14,5.63a62,62,0,0,1,20.9,15A63.36,63.36,0,0,1,1154,937.9a67.68,67.68,0,0,1,4.16,23.15v3.82a65,65,0,0,1-4.07,21.94,69,69,0,0,1-12.32,21.15,61.71,61.71,0,0,1-20.81,15.87Q1108.4,1029.91,1091.4,1029.9Zm0-22.89a42.08,42.08,0,0,0,17.43-3.47,38.43,38.43,0,0,0,13.18-9.62,43.08,43.08,0,0,0,8.33-14,48.66,48.66,0,0,0,2.86-16.74,51.5,51.5,0,0,0-2.86-17.51,40.07,40.07,0,0,0-8.33-13.88,38,38,0,0,0-13.26-9.19,47.82,47.82,0,0,0-34.86,0,38,38,0,0,0-13.27,9.19,40.2,40.2,0,0,0-8.32,13.88,51.5,51.5,0,0,0-2.86,17.51,48.66,48.66,0,0,0,2.86,16.74,43.23,43.23,0,0,0,8.32,14,38.3,38.3,0,0,0,13.27,9.62A42.69,42.69,0,0,0,1091.4,1007Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                  <path
                    class="cls-1"
                    d="M1181.93,1027.3V899.14h24.62V1027.3Zm21.16,0v-22.89h26.18a47.64,47.64,0,0,0,17.6-3,36.58,36.58,0,0,0,13.1-8.58,38.07,38.07,0,0,0,8.24-13.09,47,47,0,0,0,2.86-16.74,48.06,48.06,0,0,0-2.86-17.08A36.18,36.18,0,0,0,1260,933a35,35,0,0,0-13.1-8.15,51.8,51.8,0,0,0-17.6-2.78h-26.18V899.14h24.62q17.18,0,30,5A59.43,59.43,0,0,1,1279,918a57.79,57.79,0,0,1,12.75,19.94,64.72,64.72,0,0,1,4.25,23.15v3.82a62.59,62.59,0,0,1-4.25,22.54,60.5,60.5,0,0,1-34.08,34.51q-12.82,5.39-30,5.38Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                  <path
                    class="cls-1"
                    d="M1318.41,1026.61V900H1343v126.6Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                  <path
                    class="cls-1"
                    d="M1374.6,1026.61V900H1415l53.24,106.13H1474l-3.47,3.12V900h23.24v126.6h-40.59l-53.23-106.14H1394l3.47-3.12v109.26Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                  <path
                    class="cls-1"
                    d="M1031.92,1234.71v-126.6H1056v126.6Zm20.64-105.79v-20.81h56v20.81Zm0,51.86V1160h52.89v20.81Zm0,53.93V1213.9H1110v20.81Z"
                    transform="translate(-277 -735.62)"
                  ></path>wd
                  <path
                    class="cls-1"
                    d="M1177.42,1238q-16.82,0-28.35-5.38t-17.61-14.83a38.74,38.74,0,0,1-6.07-21.41h24.11a19.2,19.2,0,0,0,2.77,9.79,19.76,19.76,0,0,0,8.94,7.72q6.15,3,16.21,2.95a38.5,38.5,0,0,0,15.09-2.6,20.48,20.48,0,0,0,9-6.85,16.51,16.51,0,0,0,2.94-9.63,12.67,12.67,0,0,0-5.72-10.84q-5.71-4.07-17.69-5.11L1170,1181q-18.21-1.56-29-11.36t-10.84-25.92q0-12.15,5.72-20.9a37.31,37.31,0,0,1,16-13.53q10.32-4.77,24.19-4.77,14.4,0,24.8,5a38.15,38.15,0,0,1,16.13,14.14q5.73,9.09,5.72,21.41h-24.1a19.09,19.09,0,0,0-2.52-9.62,18.41,18.41,0,0,0-7.45-7.11q-5-2.68-12.58-2.69a27,27,0,0,0-12.14,2.43,16.91,16.91,0,0,0-7.28,6.59,17.56,17.56,0,0,0-2.43,9,14.25,14.25,0,0,0,4.34,10.31q4.34,4.43,13.7,5.12l11.1,1a69.63,69.63,0,0,1,23.76,5.72,38.48,38.48,0,0,1,15.86,12.66q5.64,8,5.64,19.25a36.36,36.36,0,0,1-6.24,21.07q-6.24,9.11-17.78,14.14T1177.42,1238Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                  <path
                    class="cls-1"
                    d="M1251.12,1234.71V1107.25h24.63v127.46Zm21.16-38.85v-21.33h24.63a24.87,24.87,0,0,0,12.57-2.94,19.65,19.65,0,0,0,7.8-8.16,28,28,0,0,0,0-23.93,19.07,19.07,0,0,0-7.8-8.06,25.4,25.4,0,0,0-12.57-2.86h-24.63v-21.33h22.55q15.95,0,27.14,5.2a38.38,38.38,0,0,1,17.08,14.83q5.9,9.62,5.9,22.8v2.78q0,13.17-5.9,22.8a38.93,38.93,0,0,1-17.08,14.92q-11.19,5.28-27.14,5.28Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                  <path
                    class="cls-1"
                    d="M1424.72,1238q-17.17,0-29.75-6.07a62,62,0,0,1-20.81-15.87,69,69,0,0,1-12.31-21.16,64.71,64.71,0,0,1-4.07-21.94v-3.81a67.64,67.64,0,0,1,4.16-23.15,62.92,62.92,0,0,1,12.57-20.9,61.91,61.91,0,0,1,20.9-15q12.48-5.64,29.31-5.64,16.65,0,29.13,5.64a61.91,61.91,0,0,1,20.9,15,63.09,63.09,0,0,1,12.57,20.9,67.64,67.64,0,0,1,4.16,23.15V1173a65,65,0,0,1-4.07,21.94,69,69,0,0,1-12.31,21.16,62.11,62.11,0,0,1-20.82,15.87Q1441.71,1238,1424.72,1238Zm0-22.89a42.15,42.15,0,0,0,17.43-3.47,38.65,38.65,0,0,0,13.18-9.63,43,43,0,0,0,8.32-14,48.8,48.8,0,0,0,2.86-16.73,51.76,51.76,0,0,0-2.86-17.52,40.16,40.16,0,0,0-8.32-13.87,38.11,38.11,0,0,0-13.27-9.19,47.68,47.68,0,0,0-34.86,0,38.11,38.11,0,0,0-13.27,9.19,40.16,40.16,0,0,0-8.32,13.87,51.51,51.51,0,0,0-2.86,17.52,48.56,48.56,0,0,0,2.86,16.73,43,43,0,0,0,8.32,14,38.42,38.42,0,0,0,13.27,9.63A42.71,42.71,0,0,0,1424.72,1215.12Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                  <path
                    class="cls-1"
                    d="M1515.24,1234.71V1107.25h24.63v127.46Zm17.34-42.31v-20h32.26a23.49,23.49,0,0,0,11.7-2.77,19.6,19.6,0,0,0,7.72-7.81,23.26,23.26,0,0,0,2.78-11.44,23.66,23.66,0,0,0-2.78-11.62,19.73,19.73,0,0,0-7.72-7.81,23.6,23.6,0,0,0-11.7-2.77h-32.26v-21h29.66q15.26,0,26.44,4.51a36.24,36.24,0,0,1,17.26,13.7q6.07,9.18,6.07,23.06v2.78q0,14-6.16,23.06a37.24,37.24,0,0,1-17.25,13.53q-11.1,4.52-26.36,4.51Zm60,42.31-38.85-55.15h27.58l40,55.15Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                  <path
                    class="cls-1"
                    d="M1625.19,1129.79v-21.68H1723v21.68Zm36.59,104.92V1126.32h24.63v108.39Z"
                    transform="translate(-277 -735.62)"
                  ></path>
                </svg>
              </Link>

              <Form id="form-wizard1" className="text-center mt-">
                <Card className="shadow-none">
                  <Card.Body>
                    <h1 className=" text-center ">Sign Up</h1>
                    <p className="si text-center mt-3">
                      Create your ODIN ESPORT account.
                    </p>
                    <p className="mt-3 text-center">
                      have an account?{" "}
                      <Link to="/auth/sign-in" className="text-underline">
                        {" "}
                        Login{" "}
                      </Link>
                    </p>
                    <div
                      className={` alert alert-danger ${err.state == true ? "d-block" : "d-none"
                        } `}
                      role="alert"
                    >
                      {err.message}
                    </div>
                    <Form id="form-wizard1" className="text-center mt-3">
                      <ul id="top-tab-list" className="p-0 row list-inline">
                        <li
                          className={` ${show === "Image" ? " active done" : ""
                            } ${show === "Personal" ? " active done" : ""} ${show === "Account" ? " active done" : ""
                            } ${show === "A" ? "active" : ""
                            } col-lg-3 col-md-6 text-start mb-2 active`}
                          id="account"
                        >
                          <Link to="#">
                            <div className="iq-icon me-3">
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <span>Account</span>
                          </Link>
                        </li>
                        <li
                          id="personal"
                          className={`${show === "Personal" ? " active done" : ""
                            } ${show === "Image" ? " active done" : ""} ${show === "Account" ? "active " : ""
                            } col-lg-3 col-md-6 mb-2 text-start`}
                        >
                          <Link to="#">
                            <div className="iq-icon me-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <span>Personal</span>
                          </Link>
                        </li>
                        <li
                          id="payment"
                          className={`${show === "Image" ? " active done" : ""
                            } ${show === "Personal" ? "active" : ""
                            } col-lg-3 col-md-6 mb-2 text-start`}
                        >
                          <Link to="#">
                            <div className="iq-icon me-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                            <span>Extra</span>
                          </Link>
                        </li>
                        <li
                          id="confirm"
                          className={`${show === "Image" ? " active " : ""
                            } col-lg-3 col-md-6 mb-2 text-start`}
                        >
                          <Link to="#">
                            <div className="iq-icon me-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span>Finish</span>
                          </Link>
                        </li>
                      </ul>
                      <fieldset
                        className={`${show === "A" ? "d-block" : "d-none"}`}
                      >
                        <div className="form-card text-start">
                          <div className="row">
                            <div className="col-7">
                              <h3 className="mb-4">Account Information: </h3>
                            </div>
                            <div className="col-5">
                              <h2 className="steps">Step 1 - 4</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">Email: *</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  placeholder="Email Id"
                                  value={stepOne.email}
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      email: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  Username: *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="uname"
                                  placeholder="UserName"
                                  value={stepOne.uname}
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      uname: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  Password: *
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  name="pwd"
                                  placeholder="Password"
                                  value={stepOne.pwd}
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      pwd: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  Confirm Password: *
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  name="cpwd"
                                  placeholder="Confirm Password"
                                  value={cpwd}
                                  onChange={(e) =>
                                    SetCpwd(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label
                                class="form-check-label"
                                for="inlineRadio1"
                              >
                                Account Type *:
                              </label>{" "}
                              <br />
                              <div class="form-check form-check-inline mt-2">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  value="Footballer"
                                  onChange={(t) => SetType(t.target.value)}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio1"
                                >
                                  Footballer
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  value="Agent"
                                  onChange={(t) => SetType(t.target.value)}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio1"
                                >
                                  Agent
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          name="next"
                          className="btn btn-primary next action-button float-end"
                          value="Next"
                          onClick={() => CheckInput(1, "Account")}
                        >
                          Next
                        </button>
                      </fieldset>
                      <fieldset
                        className={`${show === "Account" ? "d-block" : "d-none"
                          }`}
                      >
                        <div className="form-card text-start">
                          <div className="row">
                            <div className="col-7">
                              <h3 className="mb-4">Personal Information:</h3>
                            </div>
                            <div className="col-5">
                              <h2 className="steps">Step 2 - 4</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  First Name: *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="fname"
                                  placeholder="First Name"
                                  value={stepOne.fname}
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      fname: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  Last Name: *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="lname"
                                  placeholder="Last Name"
                                  value={stepOne.lname}
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      lname: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  Contact Nu.: *
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phno"
                                  placeholder="Contact No."
                                  value={stepOne.contact}
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      contact: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  Date of Birth: *
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="date"
                                  placeholder="Your date of birth"
                                  value={stepOne.date}
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      date: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">Country: *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="con"
                                  placeholder="Your Country"
                                  value={stepOne.country}
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      country: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div
                              className={` col-md-6 ${type === "Agent" ? "d-block" : "d-none"
                                } `}
                            >
                              <label className="form-label">Profile: *</label>
                              <br />
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  value="option1"
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      profile: e.target.value,
                                    }))
                                  }
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio1"
                                >
                                  Manager
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio2"
                                  value="option2"
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio2"
                                >
                                  Coach
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio3"
                                  value="option3"
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio3"
                                >
                                  Sports Team
                                </label>
                              </div>
                            </div>
                            <div
                              className={` col-md-3 ${type === "Footballer" ? "d-block" : "d-none"
                                } `}
                            >
                              <div className="form-group">
                                <label className="form-label">
                                  Position: *
                                </label>
                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      pos1: e.target.value,
                                    }))
                                  }
                                >
                                  <option disabled selected>
                                    --Select Your Position--
                                  </option>
                                  <option value="GK">GK</option>
                                  <option value="LB">LB</option>
                                  <option value="CB">CB</option>
                                  <option value="SW">SW</option>
                                  <option value="RB">RB</option>
                                  <option value="DM">DM</option>
                                  <option value="CM">CM</option>
                                  <option value="LM">LM</option>
                                  <option value="RM">RM</option>
                                  <option value="LW">LW</option>
                                  <option value="AM">AM</option>
                                  <option value="RW">RW</option>
                                  <option value="CF">CF</option>
                                  <option value="ST">ST</option>
                                </select>
                              </div>
                            </div>
                            <div
                              className={` col-md-3 ${type === "Footballer" ? "d-block" : "d-none"
                                } `}
                            >
                              <div className="form-group">
                                <label className="form-label">
                                 Second Position: 
                                </label>
                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    setStep1((prevStep) => ({
                                      ...prevStep,
                                      pos2: e.target.value,
                                    }))
                                  }
                                >
                                  <option disabled selected>
                                    --Select Your Second Position--
                                  </option>
                                  <option value="GK">GK</option>
                                  <option value="LB">LB</option>
                                  <option value="CB">CB</option>
                                  <option value="SW">SW</option>
                                  <option value="RB">RB</option>
                                  <option value="DM">DM</option>
                                  <option value="CM">CM</option>
                                  <option value="LM">LM</option>
                                  <option value="RM">RM</option>
                                  <option value="LW">LW</option>
                                  <option value="AM">AM</option>
                                  <option value="RW">RW</option>
                                  <option value="CF">CF</option>
                                  <option value="ST">ST</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          name="next"
                          className="btn btn-primary next action-button float-end"
                          value="Next"
                          onClick={() => CheckInput(2, "Personal")}
                        >
                          Next
                        </button>
                        <button
                          type="button"
                          name="previous"
                          className="btn btn-dark previous action-button-previous float-end me-1"
                          value="Previous"
                          onClick={() => AccountShow("A")}
                        >
                          Previous
                        </button>
                      </fieldset>
                      <fieldset
                        className={`${show === "Personal" ? "d-block" : "d-none"
                          }`}
                      >
                        <div className="form-card text-start">
                          <div className="row">
                            <div className="col-7">
                              <h3 className="mb-4">Extra Information:</h3>
                            </div>
                            <div className="col-5">
                              <h2 className="steps">Step 3 - 4</h2>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">
                              Upload Your Photo *:
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              name="pic"
                              accept="image/*"
                              onChange={(e) =>
                                setStep1((prevStep) => ({
                                  ...prevStep,
                                  image: e.target.files[0],
                                }))
                              }
                            />
                          </div>
                          <div
                            className={` form-group ${type === "Agent" ? "d-block" : "d-none"
                              } `}
                          >
                            <label className="form-label">Your deals:</label>
                            <input
                              type="textarea"
                              className="form-control"
                              name="deal"
                              value={stepOne.deals}
                              onChange={(e) =>
                                setStep1((prevStep) => ({
                                  ...prevStep,
                                  deals: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <label className="form-label">
                            Do you have a license ? *
                          </label>
                          <br />
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="true"
                              onChange={(a) => SetSig(true)}
                            />
                            <label class="form-check-label" for="inlineRadio1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="false"
                              onChange={(a) => SetSig(false)}
                            />
                            <label class="form-check-label" for="inlineRadio1">
                              No
                            </label>
                          </div>
                          <div
                            className={` form-group ${type === "Footballer" && yes === true
                                ? "d-block"
                                : "d-none"
                              } `}
                          >
                            <label className="form-label">
                              Upload Signature Photo :
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              name="pic-2"
                              accept="image/*"
                              value={stepOne.certificate}
                              onChange={(e) =>
                                setStep1((prevStep) => ({
                                  ...prevStep,
                                  certificate: e.target.files[0],
                                }))
                              }
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          name="next"
                          className="btn btn-primary next action-button float-end"
                          value="Submit"
                          onClick={() => CheckInput(3, "Image")}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          name="previous"
                          className="btn btn-dark previous action-button-previous float-end me-1"
                          value="Previous"
                          onClick={() => AccountShow("Account")}
                        >
                          Previous
                        </button>
                      </fieldset>
                      <fieldset
                        className={`${show === "Image" ? "d-block" : "d-none"}`}
                      >
                        <div className="form-card">
                          <div className="row">
                            <div className="col-7">
                              <h3 className="mb-4 text-left">Finish:</h3>
                            </div>
                            <div className="col-5">
                              <h2 className="steps">Step 4 - 4</h2>
                            </div>
                          </div>
                          <br />
                          <br />
                          <h2 className="text-success text-center">
                            <strong>SUCCESS !</strong>
                          </h2>
                          <br />
                          <div className="row justify-content-center">
                            <div className="col-3">
                              {" "}
                              <Image
                                src={imgsuccess}
                                className="img-fluid w-25 "
                                alt="fit-image"
                              />{" "}
                            </div>
                          </div>
                          <br />
                          <br />
                          <div className="row justify-content-center">
                            <div className="col-7 text-center">
                              <h5 className="purple-text text-center">
                                You Have Successfully Signed Up
                              </h5>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </Form>
                  </Card.Body>
                </Card>
              </Form>
            </div>
            <div className="sign-bg sign-bg-right">
              <svg
                id="Calque_2"
                width="280"
                opacity="0.05"
                height="230"
                data-name="Calque 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 736 526.21"
              >
                <defs>
                  <style>{`.cls-1{fill:#0d055b;}.cls-2{fill:#1effb1;}</style>`}</style>
                </defs>
                <path
                  class="cls-1"
                  d="M1304,876.3V1261H1039.51l-24-48.09-24.05-48.09-24-48.09-24-48.09,24-48.09,24-48.09,24.05-48.09,24-48.09Zm-240.45,48.09-24,48.09-24,48.09-24.05,48.09,24.05,48.09,24,48.09,24,48.09h192.36V924.39Z"
                  transform="translate(-632 -734.81)"
                ></path>
                <path
                  class="cls-1"
                  d="M896.5,876.3l24,48.09,24,48.09,24,48.09,24,48.09-24,48.09-24,48.09-24,48.09-24,48.09H632V876.3ZM680.09,924.39v288.54H872.45l24-48.09,24-48.09,24-48.09-24-48.09-24-48.09-24-48.09Z"
                  transform="translate(-632 -734.81)"
                ></path>
                <rect
                  class="cls-2"
                  x="687.4"
                  width="48.6"
                  height="46.32"
                ></rect>
              </svg>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignUp;
