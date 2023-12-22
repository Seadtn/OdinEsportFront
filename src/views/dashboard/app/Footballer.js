import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Modal,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import pub2 from "../../../assets/images/pages/pub2.jpg";
import Card from "../../../components/Card";
import request from "../../../services/request";
import {
  setAgentList,
  setCampsList,
  setImageList,
  setPostList,
  setTutoList,
  setVideoList,
} from "../../../store/data/reducers";
import Camps from "./Camps";
import Poste from "./Poste";
import Tuto from "./Tuto";
function Footballer() {
  const dispatch = useDispatch();
  const { isLoggedIn, data } = useSelector((state) => state.data.user);
  const TutoList = useSelector((state) => state.data.tutos);
  const agentList = useSelector((state) => state.data.agents);
  const CmapsList = useSelector((state) => state.data.camps);
  const PostList = useSelector((state) => state.data.posts);
  const ImageList = useSelector((state) => state.data.images);
  const VideoList = useSelector((state) => state.data.videos);
  const [err, SetErr] = useState({ state: false, message: "" });
  const [toggler, setToggler] = useState();
  let dob = new Date(data.date);
  let today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  let m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  async function updateAgentList() {
    request.getAgentsList().then(async (result) => {
      dispatch(setAgentList(result));
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
  //Photo Modal
  const [showPhoto, setshowPhoto] = useState(false);
  const [UploadImage, setUploadImage] = useState();
  const handleClosePhoto = () => setshowPhoto(false);
  const handleShowPhoto = () => setshowPhoto(true);
  //Video Modal
  const [showVideo, setshowVideo] = useState(false);
  const [link, setlink] = useState("");
  const [descriptionVid, setdescriptionVid] = useState("");
  const handleCloseVideo = () => {setshowVideo(false);SetErr({state:false,message:""})}
  const handleShowVideo = () => setshowVideo(true);
  async function getImagesListByIdUser() {
    request.getImagesList(data.id).then(async (result) => {
      dispatch(setImageList(result));
    });
  }
  async function updateVideosList() {
    request.getVideoList(data.id).then(async (result) => {
      dispatch(setVideoList(result.reverse()));
    });
  }
  function AddPhotoByIdUser() {
    const formData = new FormData();
    formData.append("user", JSON.stringify(data));
    formData.append("image", UploadImage);
    formData.append("type", data.userRole);
    request.AddImage(formData);
    handleClosePhoto();
    getImagesListByIdUser();
  }
  function AddVideoByIdUser() {
    const formData = new FormData();
    const youtubePattern = /^https:\/\/www\.youtube\.com\/embed\//;
    if (youtubePattern.test(link)) {
      formData.append("user", JSON.stringify(data));
      formData.append("link", link);
      formData.append("description", descriptionVid);
      formData.append("type", data.userRole);
      request.AddVideo(formData);
      handleCloseVideo();
      updateVideosList();
      SetErr({state:false,message: "" });
    } else {
      SetErr({state:true,message: "Error:It's not a valid YouTube link !" })
    }
  }
  useEffect(() => {
    updatePosts();
    updateTutoList();
    updateAgentList();
    updateVideosList();
    getImagesListByIdUser();
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
                      <span> - {data.userRole}</span>
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
                      <Nav.Link eventKey="second">Agents</Nav.Link>
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
            {/*<div style={{height: "260px"}}>
                      <MDBCarousel showControls interval={5000}>
      <MDBCarouselItem itemId={1}>
        <img src={pub} className='d-block w-100 h-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src={pub} className='d-block w-100 h-100 ' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src={pub} className='d-block w-100 h-100' alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>
  </div>*/}
          </Col>
          <Col lg="3" className="col-lg-3">
            <Modal show={showVideo} onHide={handleCloseVideo}>
              <Modal.Header closeButton>
                <Modal.Title>Add new Video</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  className={` alert alert-danger ${
                    err.state == true ? "d-block" : "d-none"
                  } `}
                  role="alert"
                >
                  {err.message}
                </div>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Video Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Video Title"
                    onChange={(e) => setdescriptionVid(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Video Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Video Link"
                    onChange={(e) => setlink(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => AddVideoByIdUser()}>
                  Save
                </Button>{" "}
                <Button variant="danger" onClick={handleCloseVideo}>
                  Cancel
                </Button>
              </Modal.Body>
            </Modal>
            <Card>
              <Card.Header className="d-flex align-items-center justify-content-between">
                <div className="header-title d-flex ">
                  <h4 className="card-title">Videos Link</h4>
                  {VideoList != undefined && VideoList.length < 8 && (
                    <Button
                      className="btn btn-sm btn-icon btn-primary  m-1"
                      onClick={handleShowVideo}
                    >
                      <span className="btn-inner">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="white"
                          class="bi bi-plus-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />{" "}
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
                        </svg>
                      </span>
                    </Button>
                  )}
                </div>
                <span>
                  {VideoList ? VideoList.length + " Video(s)" : "Video(s)"}
                </span>
              </Card.Header>
              <Card.Body>
                <ul className="list-inline m-0 p-0">
                  {VideoList != undefined &&
                    VideoList.map((video) => {
                      return (
                        <li>
                          <h5>{video.description}</h5>
                          <Link to={video.link} target="_blank">
                            {video.link}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </Card.Body>
            </Card>
            <Modal show={showPhoto} onHide={handleClosePhoto}>
              <Modal.Header closeButton>
                <Modal.Title>Add new Photo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Upload New Photo</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Choose Photo"
                    onChange={(e) => setUploadImage(e.target.files[0])}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => AddPhotoByIdUser()}>
                  Save
                </Button>{" "}
                <Button variant="danger" onClick={handleClosePhoto}>
                  Cancel
                </Button>
              </Modal.Body>
            </Modal>
            <Card>
              <Card.Header className="d-flex align-items-center justify-content-between">
                <div className="header-title d-flex ">
                  <h4 className="card-title">Gallery</h4>
                  {ImageList != undefined && ImageList.length < 8 && (
                    <Button
                      className="btn btn-sm btn-icon btn-primary  m-1"
                      onClick={handleShowPhoto}
                    >
                      <span className="btn-inner">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="white"
                          class="bi bi-plus-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />{" "}
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
                        </svg>
                      </span>
                    </Button>
                  )}
                </div>
                <span>{ImageList ? ImageList.length + " pics" : "0 pics"}</span>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-card grid-cols-3">
                  {ImageList != undefined &&
                    ImageList.map((images) => {
                      return (
                        <button
                          className="border-0 bg-white "
                          onClick={() => setToggler(!toggler)}
                        >
                          <Image
                            src={"data:image/*;base64, " + images.image}
                            className="img-fluid bg-soft-info rounded "
                            alt={images.id}
                          />
                        </button>
                      );
                    })}
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Today's Feeds</h4>
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
                        <p className="d-inline-block pl-3">
                          {" "}
                          - {data.userRole}
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>
                    <div className="header-title text-center ">
                      <h4 className="card-title  ">About User</h4>
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
                      <p> {data.email}</p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1">Contact:</h6>
                      <p>{data.number}</p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1">Position(s):</h6>
                      <p>
                        {data.pos1}
                        {data.pos2 != undefined &&
                          data.pos2 != "" &&
                          data.pos2 != data.pos1 &&
                          " - " + data.pos2}
                      </p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1">Foot:</h6>
                      <p>{data.foot}</p>
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
                <p>{data.userRole}</p>
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
                  <h4 className="card-title m-2 ">Publicity</h4>
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

export default Footballer;
