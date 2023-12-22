import { Fragment, useEffect, useState } from "react";

import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { Button, Col, Image, Modal, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import pub2 from "../../../assets/images/pages/pub2.jpg";
import Card from "../../../components/Card";
import request from "../../../services/request";
import {
  setCampsList,
  setFootballersList,
  setPostList,
  setTutoList,
} from "../../../store/data/reducers";
import Camps from "./Camps";
import Poste from "./Poste";
import Tuto from "./Tuto";
function Agent() {
  const { isLoggedIn, data } = useSelector((state) => state.data.user);
  const footballersList = useSelector((state) => state.data.footballers);
  const PostList = useSelector((state) => state.data.posts);
  const CmapsList = useSelector((state) => state.data.camps);
  const TutoList = useSelector((state) => state.data.tutos);
  //Filter Code
  const [FilteredFootballerList, setFilteredFootballerList] =
    useState(footballersList);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [foot, setFoot] = useState("");
  const [Age, setAge] = useState("");
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [name, setName] = useState("");
  //Profile Modal
  const [showProfile, setshowProfile] = useState(false);
  const [ChosenProfile, setChosenProfile] = useState("");
  const handleCloseProfile = () => setshowProfile(false);
  const handleShowProfile = () => setshowProfile(true);
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
    if (foot !== "" && foot !== null) {
      newList = footballersList.filter(
        (footballer) => footballer.foot === foot
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
    if (Weight !== "" && Weight !== null) {
      newList = newList.filter((footballer) => footballer.poids === Weight);
    }
    if (Height !== "" && Height !== null) {
      newList = newList.filter((footballer) => footballer.taille === Height);
    }
    if (Age !== "" && Age !== null) {
      newList = newList.filter(
        (footballer) => getYears(footballer.date) + "" === Age
      );
    }

    setFilteredFootballerList(newList);
  }
  function getYears(date) {
    let dob = new Date(date);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    console.log(age);
    let m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    filterFootballers();
  }, [position, name, country, foot, Weight, Height, Age, footballersList]);

  async function updateFootballersList() {
    request.getFootballersList().then(async (result) => {
      dispatch(setFootballersList(result));
    });
  }
  useEffect(() => {
    updatePosts();
    updateFootballersList();
    updateTutoList();
    updateCampsList();
  }, []);
  async function updatePosts() {
    request.getPostList().then(async (result) => {
      dispatch(setPostList(result.reverse()));
    });
  }
  async function updateCampsList() {
    request.getCampsList().then(async (result) => {
      dispatch(setCampsList(result.reverse()));
    });
  }
  async function updateTutoList() {
    request.getTutoList().then(async (result) => {
      dispatch(setTutoList(result.reverse()));
    });
  }
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
                      <Nav.Link eventKey="six">Partners</Nav.Link>
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
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Publicity</h4>
                  <div className="w-100 h-100 ">
                    <MDBCarousel showControls interval={5000}>
                      <MDBCarouselItem itemId={1}>
                        <img
                          src={pub2}
                          className="d-block w-100 h-100"
                          alt="..."
                        />
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId={2}>
                        <img
                          src={pub2}
                          className="d-block w-100 h-100 "
                          alt="..."
                        />
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId={3}>
                        <img
                          src={pub2}
                          className="d-block w-100 h-100"
                          alt="..."
                        />
                      </MDBCarouselItem>
                    </MDBCarousel>
                  </div>
                </div>
              </Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Tab.Content className="profile-content">
              <Tab.Pane eventKey="first" id="profile-feed">
                {PostList != undefined &&
                  PostList.map((post) => {
                    return (
                      <Poste
                        key={post.id}
                        post={post.id}
                        image={post.posteImage}
                        text={post.description}
                        date={post.date}
                      />
                    );
                  })}
              </Tab.Pane>
              <Tab.Pane eventKey="third" id="profile-activity">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Tutorials</h4>
                    </div>
                  </Card.Header>
                  {TutoList != undefined &&
                    TutoList.map((tuto) => {
                      return Tuto(tuto.iframe, tuto.titre);
                    })}
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="second" id="profile-friends">
                <Card>
                  <div className="header-title p-3">
                    <h4 className="card-title">Filter</h4>
                  </div>
                  <div className="container ">
                    <div className="row mx-auto">
                      <div className="col-md-3">
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control rounded"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Position
                        </label>
                        <select
                          className="form-control rounded"
                          onChange={(e) => setPosition(e.target.value)}
                        >
                          <option value="">--Select Position--</option>
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
                      <div className="col-md-3">
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Foot
                        </label>
                        <select
                          className="form-control rounded"
                          onChange={(e) => setFoot(e.target.value)}
                        >
                          <option value="">--Select Foot--</option>
                          <option value="Right">Right</option>
                          <option value="Left">Left</option>
                          <option value="Right/Left">Both</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          className="form-control rounded"
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                      <div className="col-md-2">
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Age
                        </label>
                        <input
                          type="text"
                          className="form-control rounded"
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                      <div className="col-md-2">
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Height
                        </label>
                        <input
                          type="text"
                          className="form-control rounded"
                          onChange={(e) => setHeight(e.target.value)}
                        />
                      </div>
                      <div className="col-md-2">
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Weight
                        </label>
                        <input
                          type="text"
                          className="form-control rounded"
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
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
                                      footballer.pos2 != "" &&
                                      footballer.pos2 != footballer.pos1 &&
                                      " - " + footballer.pos2}
                                  </small>
                                </p>
                              </div>
                              <button
                                className="btn btn-l btn-icon btn-primary"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="View"
                                data-original-title="View"
                                to="#"
                                onClick={() => {
                                  handleShowProfile();
                                  setChosenProfile(footballer);
                                }}
                              >
                                <span className="btn-inner">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    {" "}
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                                  </svg>
                                </span>
                              </button>{" "}
                            </li>
                          );
                        })}
                    </ul>
                  </Card.Body>
                </Card>
                <Modal show={showProfile} onHide={handleCloseProfile}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Fast View 
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Card>
                      <Card.Body>
                        <div className="text-center">
                          <div className="user-profile">
                            <Image
                              className="theme-color-default-img  rounded-pill avatar-130 img-fluid"
                              src={
                                "data:image/*;base64, " +
                                ChosenProfile.profileImage
                              }
                              alt="profile-pic"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="d-inline-block">
                              {ChosenProfile.firstName +
                                " " +
                                ChosenProfile.lastName}{" "}
                                <svg onClick={()=>console.log("clicked")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-circle" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"/> </svg>
                            </h3>
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
                          <p>{3 + " years"}</p>
                        </div>
                        <div className="mt-2">
                          <h6 className="mb-1">Lives:</h6>
                          <p>{ChosenProfile.country}</p>
                        </div>
                        <div className="mt-2">
                          <h6 className="mb-1">Email:</h6>
                          <p>
                            <Link to="#" className="text-body">
                              {" "}
                              {ChosenProfile.email}
                            </Link>
                          </p>
                        </div>
                        <div className="mt-2">
                          <h6 className="mb-1">Contact:</h6>
                          <p>
                            <Link to="#" className="text-body">
                              {ChosenProfile.number}
                            </Link>
                          </p>
                        </div>
                        <div className="mt-2">
                          <h6 className="mb-1">Position:</h6>
                          <p>
                            {ChosenProfile.pos2!=ChosenProfile.pos1 && <Link to="#" className="text-body">
                              {ChosenProfile.pos1+"-"+ChosenProfile.pos2}
                            </Link>}
                            {ChosenProfile.pos2==ChosenProfile.pos1 && <Link to="#" className="text-body">
                              {ChosenProfile.pos1}
                            </Link>}
                          </p>
                        </div>
                        <div className="mt-2">
                          <h6 className="mb-1">Height:</h6>
                          <p>
                            <Link to="#" className="text-body">
                              {ChosenProfile.taille+" Cm"}
                            </Link>
                          </p>
                        </div>
                        <div className="mt-2">
                          <h6 className="mb-1">Weight:</h6>
                          <p>
                            <Link to="#" className="text-body">
                              {ChosenProfile.poids+" Kg"}
                            </Link>
                          </p>
                        </div>
                        <div className="mt-2">
                          <h6 className="mb-1">Foot:</h6>
                          <p>
                            <Link to="#" className="text-body">
                              {ChosenProfile.foot}
                            </Link>
                          </p>
                        </div>
                        
                      </Card.Body>
                    </Card>
                    <Button variant="success">follow</Button>{" "}
                    <Button variant="primary" onClick={handleCloseProfile}>
                      Cancel
                    </Button>
                  </Modal.Body>
                </Modal>
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
                {CmapsList != undefined &&
                  CmapsList.map((Camp) => {
                    return Camps(
                      Camp.campImage,
                      Camp.details,
                      Camp.title,
                      Camp.location
                    );
                  })}
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
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Publicity</h4>
                  <div className="w-100 h-100 ">
                    <MDBCarousel showControls interval={5000}>
                      <MDBCarouselItem itemId={1}>
                        <img
                          src={pub2}
                          className="d-block w-100 h-100"
                          alt="..."
                        />
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId={2}>
                        <img
                          src={pub2}
                          className="d-block w-100 h-100 "
                          alt="..."
                        />
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId={3}>
                        <img
                          src={pub2}
                          className="d-block w-100 h-100"
                          alt="..."
                        />
                      </MDBCarouselItem>
                    </MDBCarousel>
                  </div>
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
