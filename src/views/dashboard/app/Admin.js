import React, { Fragment, useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  Form,
  Nav,
  Tab,
  Button,
  Modal,
} from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import request from "../../../services/request";
import {
  setAgentList,
  setCampsList,
  setFootballersList,
  setPostList,
  setTutoList,
} from "../../../store/data/reducers";
import Poste from "./Poste";
import Camps from "./Camps";
import Tuto from "./Tuto";

function Admin() {
  const { isLoggedIn, data } = useSelector((state) => state.data.user);
  const footballersList = useSelector((state) => state.data.footballers);
  const PostList = useSelector((state) => state.data.posts);
  const agentList = useSelector((state) => state.data.agents);
  const CmapsList = useSelector((state) => state.data.camps);
  const TutoList = useSelector((state) => state.data.tutos);
  //License Modal
  const [ShowCertificate, setShowCertificate] = useState(false);
  const handleCloseCertificate = () => setShowCertificate(false);
  const [ChosenFootballer, setChosenFootballer] = useState("");
  const [ChosenFootballerId, setChosenFootballerId] = useState(0);
  const [ChoseUserType, setChoseUserType] = useState(0);
  const handleShowCertificate = (license, id, userRole) => {
    setShowCertificate(true);
    setChosenFootballer(license);
    setChosenFootballerId(id);
    setChoseUserType(userRole);
  };

  //Post Modal
  const [show, setShow] = useState(false);
  const [ImagePost, setImagePost] = useState(null);
  const [DescPost, setDescPost] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Profile Modal
  const [showProfile, setshowProfile] = useState(false);
  const [ChosenProfile, setChosenProfile] = useState("");
  const handleCloseProfile = () => setshowProfile(false);
  const handleShowProfile = () => setshowProfile(true);
  //Camps Modal
  const [showCamps, setShowCamps] = useState(false);
  const [ImageCamps, setImageCamps] = useState(null);
  const [DetailsCamps, setDetailsCamps] = useState("");
  const [location, setlocation] = useState("");
  const [titleCamps, settitleCamps] = useState("");
  const handleCloseCamps = () => setShowCamps(false);
  const handleShowCamps = () => setShowCamps(true);
  //Tuto Modal
  const [showTuto, setShowTuto] = useState(false);
  const [iframe, setIframe] = useState("");
  const [desc, setDesc] = useState("");
  const [titre, setTitre] = useState("");
  const handleCloseTuto = () => setShowTuto(false);
  const handleShowTuto = () => setShowTuto(true);
  //Filter Code
  const [FilteredFootballerList, setFilteredFootballerList] =
    useState(footballersList);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [foot, setFoot] = useState("");
  const [Age, setAge] = useState("");
  const [Height, setHeight] = useState("")
  const [Weight, setWeight] = useState("")
  const [name, setName] = useState("");
  let history = useNavigate();
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
      newList = newList.filter((footballer) =>
        footballer.poids === Weight
      );
    }
    if (Height !== "" && Height !== null) {
      newList = newList.filter((footballer) =>
        footballer.taille === Height
      );
    }
    if (Age !== "" && Age !== null) {

      newList = newList.filter((footballer) =>
        getYears(footballer.date) === Age
      );
    }

    setFilteredFootballerList(newList);
  }
  function getYears(date) {
    let dob = new Date(date);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }
  const dispatch = useDispatch();
  async function updateFootballersList() {
    request.getFootballersList().then(async (result) => {
      dispatch(setFootballersList(result));
    });
  }
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
  async function updateAgentList() {
    request.getAgentsList().then(async (result) => {
      dispatch(setAgentList(result));
    });
  }
  useEffect(() => {
    updatePosts();
    updateFootballersList();
    updateTutoList();
    updateCampsList();
    updateAgentList();
    filterFootballers();
  }, [position, name, country, foot, Weight, Height, Age, footballersList]);
  const AddPost = () => {
    const f = new FormData();
    f.append("posteImage", ImagePost);
    f.append("Description", DescPost);
    f.append("date", new Date().toLocaleDateString());
    request.AddPost(f).then((result) => {
    });
    setDescPost("");
    setImagePost(null);
    handleClose();
    updatePosts();
  };
  const AddCamp = () => {
    const f = new FormData();
    f.append("campImage", ImageCamps);
    f.append("details", DetailsCamps);
    f.append("title", titleCamps);
    f.append("location", location);
    request.AddCamps(f).then((result) => {
    });
    setDetailsCamps("");
    setImageCamps(null);
    settitleCamps("");
    setlocation("");
    handleCloseCamps();
    updateCampsList();
  };
  const AddTuto = () => {
    const f = new FormData();
    f.append("iframe", iframe);
    f.append("titre", titre);
    f.append("desc", desc);
    request.AddTuto(f).then((result) => {
    });
    setIframe("");
    setTitre("");
    handleCloseTuto();
    updateTutoList();
  };
  function ChangeCertificateState(id, state, cmpt) {
    request.ChangeStateCertificates(id, state, cmpt).then((result) => {
      handleCloseCertificate();
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
                      <span> - Admin</span>
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
                      <Nav.Link eventKey="six">Agents</Nav.Link>
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
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add new Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Post Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Post Description"
                    value={DescPost}
                    onChange={(e) => setDescPost(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Post Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="images/*"
                    onChange={(e) => setImagePost(e.target.files[0])}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => AddPost()}>
                  Save
                </Button>{" "}
                <Button variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Body>
            </Modal>
            <Tab.Content className="profile-content">
              <Tab.Pane eventKey="first" id="profile-feed">
                <Button
                  className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 mb-2"
                  onClick={handleShow}
                >
                  <i className="btn-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </i>
                  <span>New Post</span>
                </Button>
                {PostList != undefined &&
                  PostList.map((post) => {
                    return <Poste
                      key={post.id}  // Make sure to include a unique key for each Poste component
                      post={post.id}
                      image={post.posteImage}
                      text={post.description}
                      date={post.date}
                    />;
                  })}
              </Tab.Pane>
              <Tab.Pane eventKey="third" id="profile-activity">
                <Modal show={showTuto} onHide={handleCloseTuto}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add new Tuto</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Tutorial Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tuto Title"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Tutorial Link</Form.Label>
                      <Form.Control
                        type="link"
                        placeholder="Tuto Link"
                        value={iframe}
                        onChange={(e) => setIframe(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Tutorial Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tuto Description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={() => AddTuto()}>
                      Save
                    </Button>{" "}
                    <Button variant="danger" onClick={handleCloseTuto}>
                      Cancel
                    </Button>
                  </Modal.Body>
                </Modal>
                <Button
                  className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 mb-2"
                  onClick={handleShowTuto}
                >
                  <i className="btn-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </i>
                  <span>New Tutorial</span>
                </Button>
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
                                      footballer.pos2 != footballer.pos1 &&
                                      footballer.pos2 != "" &&
                                      " - " + footballer.pos2}
                                  </small>
                                </p>
                              </div>
                              <div className="flex align-items-center list-user-action m-2">
                                {footballer.verified == 1 && (
                                  <button
                                    className="btn btn-sm btn-icon btn-success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Add"
                                    data-original-title="Add"
                                    to="#"
                                  >
                                    <span className="btn-inner">
                                      <svg
                                        width="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M19.2036 8.66919V12.6792"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M21.2497 10.6741H17.1597"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </span>
                                  </button>

                                )}{" "}
                                {footballer.license != null && (
                                  <button
                                    onClick={() => {
                                      handleShowCertificate(
                                        footballer.license,
                                        footballer.id,
                                        footballer.userRole
                                      );
                                    }}
                                    className="btn btn-sm btn-icon btn-warning"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Edit"
                                    data-original-title="Edit"
                                    to="#"
                                  >
                                    <span className="btn-inner">
                                      <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M15.1655 4.60254L19.7315 9.16854"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </span>
                                  </button>
                                )}{" "}
                                <button
                                  className="btn btn-sm btn-icon btn-danger"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Delete"
                                  data-original-title="Delete"
                                  to="#"
                                >
                                  <span className="btn-inner">
                                    <svg
                                      width="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      stroke="currentColor"
                                    >
                                      <path
                                        d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M20.708 6.23975H3.75"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                  </span>
                                </button>{" "}
                                <button
                                  className="btn btn-sm btn-icon btn-primary"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Delete"
                                  data-original-title="Delete"
                                  to="#"
                                  onClick={() => {
                                    handleShowProfile();
                                    setChosenProfile(footballer);
                                  }}
                                >
                                  <span className="btn-inner">
                                    <svg
                                      width="0"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      stroke="currentColor"
                                    >
                                      {" "}
                                      <path
                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>{" "}
                                      <path
                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>{" "}
                                    </svg>
                                  </span>
                                </button>{" "}
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </Card.Body>
                </Card>
                <Modal show={showProfile} onHide={handleCloseProfile}>
                  <Modal.Header closeButton>
                    <Modal.Title>{ChosenProfile.firstName+" "+ChosenProfile.lastName}'s Profile</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Card>
                      <Card.Body>
                        <div className="text-center">
                          <div className="user-profile">
                            <Image
                              className="theme-color-default-img  rounded-pill avatar-130 img-fluid"
                              src={"data:image/*;base64, " + ChosenProfile.profileImage}
                              alt="profile-pic"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="d-inline-block">
                              {ChosenProfile.firstName + " " + ChosenProfile.lastName}{" "}
                            </h3>
                            <p className="d-inline-block pl-3"> - {ChosenProfile.profile}</p>
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
                      </Card.Body>
                    </Card>
                    <Button
                      variant="success"
                      
                    >
                      follow
                    </Button>{" "}
                    <Button variant="primary" onClick={handleCloseProfile}>
                      Cancel
                    </Button>
                  </Modal.Body>
                </Modal>
                <Modal show={ShowCertificate} onHide={handleCloseCertificate}>
                  <Modal.Header closeButton>
                    <Modal.Title>Verify License</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Image
                      className="w-100"
                      src={"data:image/*;base64, " + ChosenFootballer}
                      alt="profile-pic"
                    />
                    <Button
                      variant="success"
                      onClick={() =>
                        ChangeCertificateState(
                          ChosenFootballerId,
                          true,
                          ChoseUserType
                        )
                      }
                    >
                      Verify
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() =>
                        ChangeCertificateState(
                          ChosenFootballerId,
                          false,
                          ChoseUserType
                        )
                      }
                    >
                      Reject
                    </Button>{" "}
                    <Button variant="primary" onClick={handleCloseCertificate}>
                      Cancel
                    </Button>
                  </Modal.Body>
                </Modal>
              </Tab.Pane>
              <Tab.Pane eventKey="six" id="profile-friends">
                <Card>
                  <Card.Header>
                    <div className="header-title">
                      <h4 className="card-title">Agents</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <ul className="list-inline m-0 p-0">
                      {agentList != undefined &&
                        agentList.map((agent) => {
                          return (
                            <li className="d-flex mb-4 align-items-center">
                              <Image
                                className="theme-color-default-img  rounded-pill avatar-40"
                                src={
                                  "data:image/*;base64, " + agent.profileImage
                                }
                                alt="profile-pic"
                              />
                              <div className="ms-3 flex-grow-1">
                                <h6>
                                  {agent.firstName + " " + agent.lastName}
                                </h6>
                                <p className="mb-0">{agent.profile}</p>
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
                <Modal show={showCamps} onHide={handleCloseCamps}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add new Camps</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Title </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        value={titleCamps}
                        onChange={(e) => settitleCamps(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setlocation(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Camps Details</Form.Label>
                      <Form.Control
                        type="textarea"
                        placeholder="Camps Details"
                        value={DetailsCamps}
                        onChange={(e) => setDetailsCamps(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Camps Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="images/*"
                        onChange={(e) => setImageCamps(e.target.files[0])}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={() => AddCamp()}>
                      Save
                    </Button>{" "}
                    <Button variant="danger" onClick={handleCloseCamps}>
                      Cancel
                    </Button>
                  </Modal.Body>
                </Modal>
                <Button
                  className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 mb-2"
                  onClick={handleShowCamps}
                >
                  <i className="btn-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </i>
                  <span>New Camps</span>
                </Button>
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
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
}

export default Admin;
