import React, { Fragment, useEffect } from "react";

import { Row, Col, Image, Form, Nav, Dropdown, Tab } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link } from "react-router-dom";
import pub from '../../../assets/images/pages/pub.jpg';
import pub2 from '../../../assets/images/pages/pub2.jpg';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import avatars2 from "../../../assets/images/avatars/favicon.ico";
import pages2 from "../../../assets/images/pages/02-page.png";
import camps from "../../../assets/images/pages/263650.jpg";
import ShareOffcanvas from "../../../components/partials/components/shareoffcanvas";
import { useDispatch, useSelector } from "react-redux";
import request from "../../../services/request";
import { setAgentList, setPostList } from "../../../store/data/reducers";
import Poste from "./Poste";

function Footballer() {
  const { isLoggedIn, data } = useSelector((state) => state.data.user);
  const agentList = useSelector((state) => state.data.agents);
  const PostList = useSelector((state) => state.data.posts);
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
  const dispatch = useDispatch();
  useEffect(() => {
    updatePosts();
    updateAgentList()
  }, [])

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
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Publicity</h4>
                  <div className="w-100 h-100 ">
                    <MDBCarousel showControls interval={5000}>
                      <MDBCarouselItem itemId={1}>
                        <img src={pub2} className='d-block w-100 h-100' alt='...' />
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId={2}>
                        <img src={pub2} className='d-block w-100 h-100 ' alt='...' />
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId={3}>
                        <img src={pub2} className='d-block w-100 h-100' alt='...' />
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
                    return <Poste
                    key={post.id}  
                    post={post.id}
                    image={post.posteImage}
                    text={post.description}
                    date={post.date}
                  />;
                  })}
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
                  <Card.Header>
                    <div className="header-title">
                      <h4 className="card-title">Agents</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <ul className="list-inline m-0 p-0">
                      {agentList != undefined && agentList.map((agent => {
                        return (<li className="d-flex mb-4 align-items-center">
                          <Image
                            className="theme-color-default-img  rounded-pill avatar-40"
                            src={"data:image/*;base64, " + agent.profileImage}
                            alt="profile-pic"
                          />
                          <div className="ms-3 flex-grow-1">
                            <h6>{agent.firstName + " " + agent.lastName}</h6>
                            <p className="mb-0">
                              {agent.profile}
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
                        </li>)

                      }))}
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
                      <p>
                        {" "}
                        {data.email}
                      </p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1">Contact:</h6>
                      <p>
                        {data.number}
                      </p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1">Position(s):</h6>
                      <p>
                        {data.pos1}
                        {data.pos2 != undefined &&
                          data.pos2 != "" && data.pos2 != data.pos1 &&
                          " - " + data.pos2}
                      </p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1">Foot:</h6>
                      <p>
                        {data.foot}
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
                  <h4 className="card-title m-2 ">Publicities</h4>
                  <div className="w-100 h-100 ">
                    <MDBCarousel showControls interval={5000}>
                      <MDBCarouselItem itemId={1}>
                        <img src={pub2} className='d-block w-100 h-100' alt='...' />
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId={2}>
                        <img src={pub2} className='d-block w-100 h-100 ' alt='...' />
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId={3}>
                        <img src={pub2} className='d-block w-100 h-100' alt='...' />
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
