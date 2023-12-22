import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { Fragment, useEffect, useState } from "react";
import {
    Button,
    Col,
    Image,
    Nav,
    Row,
    Tab
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import pub2 from "../../../assets/images/pages/pub2.jpg";
import Card from "../../../components/Card";
import request from "../../../services/request";
import {
    setImageList,
    setVideoList,
} from "../../../store/data/reducers";
function ViewProfile() {
    const location = useLocation();
    const data = location.state?.user;
    const dispatch = useDispatch();
    const ImageList = useSelector((state) => state.data.images);
    const VideoList = useSelector((state) => state.data.videos);
    const [toggler, setToggler] = useState();
    let dob = new Date(data.date);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
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
    useEffect(() => {
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
                        <button className="rounded btn  btn-success m-2  ">Follow</button>
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
                        <Nav.Link eventKey="first">Profile</Nav.Link>
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
              <Card>
                <Card.Header className="d-flex align-items-center justify-content-between">
                  <div className="header-title d-flex ">
                    <h4 className="card-title">Videos Link</h4>
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
              <Card>
                <Card.Header className="d-flex align-items-center justify-content-between">
                  <div className="header-title d-flex ">
                    <h4 className="card-title">Gallery</h4>
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
                <Tab.Pane eventKey="first" id="profile-profile">
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
                        <h6 className="mb-1">Height:</h6>
                        <p>{data.taille+" Cm"}</p>
                      </div>
                      <div className="mt-2">
                        <h6 className="mb-1">Weight:</h6>
                        <p>{data.poids+" Kg"}</p>
                      </div>
                      <div className="mt-2">
                        <h6 className="mb-1">Foot:</h6>
                        <p>{data.foot}</p>
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

export default ViewProfile