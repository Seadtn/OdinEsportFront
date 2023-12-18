import React, { Fragment, useEffect, useState } from "react";

import { Row, Col, Image, Form, Nav, Dropdown, Tab } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link } from "react-router-dom";
import avatars2 from "../../../assets/images/avatars/favicon.ico";
import pages2 from "../../../assets/images/pages/02-page.png";
import camps from "../../../assets/images/pages/263650.jpg";
import ShareOffcanvas from "../../../components/partials/components/shareoffcanvas";
import { useDispatch, useSelector } from "react-redux";
import request from "../../../services/request";
import { setFootballersList } from "../../../store/data/reducers";
function Agent() {
  const { isLoggedIn, data } = useSelector((state) => state.data.user);
  const footballersList = useSelector((state) => state.data.footballers);
  const [FilteredFootballerList, setFilteredFootballerList] =
    useState(footballersList);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  let dob = new Date(data.date);
  let today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  let m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  function filterFootballers() {
    let newList = footballersList;

    if (position !== "" && position !== null) {
      newList = footballersList.filter(
        (footballer) =>
          footballer.pos1 === position || footballer.pos2 === position
      );
    }
    if (name !== "" && name !== null) {
      newList = newList.filter((footballer) => {
        let fullName =
          footballer.firstName.toLowerCase() +
          " " +
          footballer.lastName.toLowerCase();
        let fullNameInv =
          footballer.lastName.toLowerCase() +
          " " +
          footballer.firstName.toLowerCase();
        return (
          fullName.includes(name.toLowerCase()) ||
          fullNameInv.includes(name.toLowerCase())
        );
      });
    }
    if (country !== "" && country !== null) {
      newList = newList.filter((footballer) =>
        footballer.country.includes(country)
      );
    }

    setFilteredFootballerList(newList);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    filterFootballers();
  }, [position, name, country,footballersList]);

  async function updateFootballersList() {
    request.getFootballersList().then(async (result) => {
      dispatch(setFootballersList(result));
    });
  }
  useEffect(() => {
    updateFootballersList();
  }, []);

  return (
    <Fragment>
      <Tab.Container defaultActiveKey="first">
        <Row>
          <Col lg="12">
            <Card>
              <Card.Body>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <div className="d-flex flex-wrap align-items-center">
                    <div className="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
                      <Image
                        className="theme-color-default-img  img-fluid rounded-pill avatar-100"
                        src={"data:image/*;base64, " + data.profileImage}
                        alt="profile-pic"
                      />
                    </div>
                    <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                      <h4 className="me-2 h4">
                        {data.firstName + " " + data.lastName}
                      </h4>
                      <span> - {data.profile}</span>
                    </div>
                  </div>
                  <Nav
                    as="ul"
                    className="d-flex nav-pills mb-0 text-center profile-tab"
                    data-toggle="slider-tab"
                    id="profile-pills-tab"
                    role="tablist"
                  >
                    <Nav.Item as="li">
                      <Nav.Link eventKey="first">Feed</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="second">Footballers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="third">Tutorials</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="five">Camps</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="fourth">Profile</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" className="col-lg-3">
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">News</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <ul className="list-inline m-0 p-0"></ul>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="d-flex align-items-center justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Gallery</h4>
                </div>
                <span>0 pics</span>
              </Card.Header>
              <Card.Body></Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Latest Feeds</h4>
                </div>
              </Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Tab.Content className="profile-content">
              <Tab.Pane eventKey="first" id="profile-feed">
                <Card>
                  <Card.Header className="d-flex align-items-center justify-content-between pb-4">
                    <div className="header-title">
                      <div className="d-flex flex-wrap">
                        <div className="media-support-user-img me-3">
                          <Image
                            className=" img-fluid avatar-60  p-1 ps-2  "
                            src={avatars2}
                            alt=""
                          />
                        </div>
                        <div className="media-support-info mt-2">
                          <h5 className="mb-0">Odin Esport</h5>
                          <p className="mb-0 text-primary">Official Web site</p>
                        </div>
                      </div>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        as="span"
                        id="dropdownMenuButton7"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        role="button"
                      >
                        1 min(s)
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="dropdown-menu-end"
                        aria-labelledby="dropdownMenuButton7"
                      >
                        <Dropdown.Item href="#">Share</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <div className="user-post">
                      <Link to="#">
                        <Image
                          src={pages2}
                          alt="post-image"
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                    <div className="comment-area p-3">
                      <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center message-icon me-3">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                              />
                            </svg>
                            <span className="ms-1">0</span>
                          </div>
                          <div className="d-flex align-items-center feather-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z"
                              />
                            </svg>
                            <span className="ms-1">0</span>
                          </div>
                        </div>
                        <div className="share-block d-flex align-items-center feather-icon">
                          <ShareOffcanvas />
                        </div>
                      </div>
                      <hr />
                      <p>
                        "Welcome to our football community Mr.Test Test! Dive
                        into the excitement of the game, connect with fellow
                        fans, and enjoy every goal. Let the match begin!" ⚽️🎉
                      </p>
                      <hr />
                      <Form
                        className="comment-text d-flex align-items-center mt-3"
                        action=""
                      >
                        <Form.Control
                          type="text"
                          className="rounded"
                          placeholder="Add Comment..."
                        />
                        <div className="comment-attagement d-flex">
                          <Link to="#" className="me-2 text-body">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
                              />
                            </svg>
                          </Link>
                          <Link to="#" className="text-body">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z"
                              />
                            </svg>
                          </Link>
                        </div>
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="third" id="profile-activity">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Tutorials</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className=" m-0 d-flex align-items-center justify-content-center position-relative">
                      <div className="w-100">
                        <h4 className="text-center text-black  mb-3 border-bottom border-success border-3  ">
                          First Tutorial
                        </h4>
                        <iframe
                          className="w-100 "
                          height="500"
                          src="https://www.youtube.com/embed/L8taGwfp2sU?si=BHkeiVY-dSOqJn_h"
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="second" id="profile-friends">
                <Card>
                  <div className="header-title p-3">
                    <h4 className="card-title">Filter</h4>
                  </div>
                  <div className="d-flex flex-row  justify-content-between p-3">
                    <div>
                      <label class="form-check-label" for="inlineRadio3">
                        {" "}
                        Name{" "}
                      </label>
                      <input
                        type="text"
                        className="rounded "
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label class="form-check-label" for="inlineRadio3">
                        {" "}
                        Position{" "}
                      </label>
                      <select
                        className="rounded "
                        onChange={(e) => setPosition(e.target.value)}
                      >
                        <option selected value="">
                          --Select Position--
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
                    <div>
                      <label class="form-check-label" for="inlineRadio3">
                        {" "}
                        Country{" "}
                      </label>
                      <input
                        type="text"
                        className="rounded "
                        onChange={(e) => setCountry(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <Card.Header>
                    <div className="header-title">
                      <h4 className="card-title">Footballers</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <ul className="list-inline m-0 p-0">
                      {FilteredFootballerList != undefined &&
                        FilteredFootballerList.map((footballer) => {
                          return (
                            <li className="d-flex mb-4 align-items-center">
                              <Image
                                className="theme-color-default-img  rounded-pill avatar-40"
                                src={
                                  "data:image/*;base64, " +
                                  footballer.profileImage
                                }
                                alt="profile-pic"
                              />
                              <div className="ms-3 flex-grow-1">
                                <h6>
                                  {footballer.firstName +
                                    " " +
                                    footballer.lastName}
                                </h6>
                                <p className="mb-0">
                                  Footballer{" "}
                                  <small>
                                    /{footballer.pos1}
                                    {footballer.pos2 != undefined &&
                                      footballer.pos2 != "" && footballer.pos2 != footballer.pos1 && 
                                      " - " + footballer.pos2}
                                  </small>
                                </p>
                              </div>

                              <Link
                                to="#"
                                className="rounded-circle "
                                style={{ background: "#0d055b" }}
                              >
                                <svg
                                  className="p-2 bi bi-eye"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  {" "}
                                  <path
                                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                                    fill="white"
                                  ></path>{" "}
                                  <path
                                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                    fill="white"
                                  ></path>{" "}
                                </svg>
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth" id="profile-profile">
                <Card>
                  <Card.Header>
                    <div className="header-title">
                      <h4 className="card-title">Profile</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="text-center">
                      <div className="user-profile">
                        <Image
                          className="theme-color-default-img  rounded-pill avatar-130 img-fluid"
                          src={"data:image/*;base64, " + data.profileImage}
                          alt="profile-pic"
                        />
                      </div>
                      <div className="mt-3">
                        <h3 className="d-inline-block">
                          {data.firstName + " " + data.lastName}{" "}
                        </h3>
                        <p className="d-inline-block pl-3"> - {data.profile}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>
                    <div className="header-title">
                      <h4 className="card-title">About User</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="user-bio"></div>
                    <div className="mt-2">
                      <h6 className="mb-1">Age :</h6>
                      <p>{age + " years"}</p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1">Lives:</h6>
                      <p>{data.country}</p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1">Email:</h6>
                      <p>
                        <Link to="#" className="text-body">
                          {" "}
                          {data.email}
                        </Link>
                      </p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1">Contact:</h6>
                      <p>
                        <Link to="#" className="text-body">
                          {data.number}
                        </Link>
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="five" id="profile-activity">
                <Card>
                  <Card.Header className="d-flex align-items-center justify-content-between pb-4">
                    <div className="header-title">
                      <div className="d-flex flex-wrap">
                        <div className="media-support-user-img me-3">
                          <Image
                            className=" img-fluid avatar-60  p-1 ps-2  "
                            src={avatars2}
                            alt=""
                          />
                        </div>
                        <div className="media-support-info mt-2">
                          <h5 className="mb-0">Camps Turkey</h5>
                          <p className="mb-0 text-primary">Turkey,Istanbul</p>
                        </div>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <div className="user-post">
                      <Link to="#">
                        <Image
                          src={camps}
                          alt="post-image"
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                    <div className="comment-area p-3">
                      <hr />
                      <p className="text-center">Camps Details</p>
                      <hr />
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col lg="3">
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">About</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <p>{data.profile}</p>
                <div className="mb-1">
                  Email:{" "}
                  <Link to="#" className="ms-3">
                    {data.email}
                  </Link>
                </div>
                <div className="mb-1">
                  Phone:{" "}
                  <Link to="#" className="ms-3">
                    {data.number}
                  </Link>
                </div>
                <div>
                  Location: <span className="ms-3">{data.country}</span>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Suggestions</h4>
                </div>
              </Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
}

export default Agent;
