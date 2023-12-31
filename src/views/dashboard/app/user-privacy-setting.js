import React, { useState } from 'react'
import { Row, Col, Container, Form, Button, Image } from 'react-bootstrap'
import Card from '../../../components/Card'
import avatars11 from '../../../assets/images/avatars/01.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import notver from '../../../assets/images/VerifiedState/not_verified.jpg';
import ver from '../../../assets/images/VerifiedState/verified.jpg';
import prog from '../../../assets/images/VerifiedState/OIP.jpg';
import request from '../../../services/request'
const UserProfileEdit = () => {
   
   const { isLoggedIn, data } = useSelector((state) => state.data.user);
   const [user, setData] = useState(data);
   const [all, setAll] = useState(true);
   const EditAll = () => {
      setPart1(false);
      setPart2(false);
      setPart3(false);
      setAll(false);
   }
   const NoEditAll = () => {
      setPart1(true);
      setPart2(true);
      setPart3(true);
      setAll(true);
   }
   const [part1, setPart1] = useState(true);
   const [part2, setPart2] = useState(true);
   const [part3, setPart3] = useState(true);

   const [image, setimage] = useState(null);
   const [license, setlicense] = useState(null);
   const [newImage, setNewImage] = useState(false);
   const [newLicense, setNewLicense] = useState(false);
   async function Modify() {
      const form = new FormData();
      if (!all || !part3 || (!part2 && data.userRole == "Footballer")) {
         if (data.userRole == "Footballer") {
            form.append("image", image);
            form.append("userData", JSON.stringify(user));
            form.append("License", license);
            request.UpdateUser(form, newImage, newLicense, data.userRole).then((result) => {
               console.log(result);
            })
         } else if (data.userRole == "Agent") {
            form.append("image", image);
            form.append("userData", JSON.stringify(user));
            request.UpdateUser(form, newImage, newLicense, data.userRole).then((result) => {
               console.log(result);
            })
         }
      } else if (!part1 || (!part2 && data.userRole == "Agent")) {
         form.append("userData", JSON.stringify(user));
         request.UpdateUser(form, newImage, newLicense, data.userRole).then((result) => {
            console.log(result);
         })
      }
   }
   return (
      <Container fluid>
         <Row>
            <Col lg="12">
               <div className="d-flex ">
                  <div className="profile-img position-relative  profile-logo profile-logo1">
                     <Image className="theme-color-default-img  img-fluid rounded-pill avatar-100" src={"data:image/*;base64, " + data.profileImage} alt="profile-pic" />
                  </div>
               </div>
               <Card>
                  <Card.Header className="d-flex justify-content-between">
                     <div className="header-title ">
                        <h4 className="card-title">Privacy Setting <small className='text-dark text-sm-start '>{data.userRole == "Agent" ? data.profile : data.userRole} <svg onClick={() => EditAll()} className={`mb-2   ${(part1 && part2 && part3) ? "" : "d-none"} `} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 40 40"><path fill="#dff0fe" d="M5.982 29.309L8.571 26.719 13.618 31.115 10.715 34.019 2.453 37.547z"></path><path fill="#4788c7" d="M8.595,27.403l4.291,3.737l-2.457,2.457l-7.026,3.001l3.001-7.003L8.595,27.403 M8.548,26.036 l-2.988,2.988l-4.059,9.474L11,34.44l3.351-3.351L8.548,26.036L8.548,26.036z"></path><path fill="#4788c7" d="M3.805 33.13L1.504 38.5 6.888 36.201z"></path><path fill="#b6dcfe" d="M30.062,5.215L32.3,2.978C32.931,2.347,33.769,2,34.66,2s1.729,0.347,2.36,0.978 c1.302,1.302,1.302,3.419,0,4.721l-2.237,2.237L30.062,5.215z"></path><path fill="#4788c7" d="M34.66,2.5c0.758,0,1.471,0.295,2.007,0.831c1.107,1.107,1.107,2.907,0,4.014l-1.884,1.884 L30.77,5.215l1.884-1.884C33.189,2.795,33.902,2.5,34.66,2.5 M34.66,1.5c-0.982,0-1.965,0.375-2.714,1.124l-2.591,2.591 l5.428,5.428l2.591-2.591c1.499-1.499,1.499-3.929,0-5.428v0C36.625,1.875,35.643,1.5,34.66,1.5L34.66,1.5z"></path><g><path fill="#b6dcfe" d="M11.346,33.388c-0.066-0.153-0.157-0.308-0.282-0.454c-0.31-0.363-0.749-0.584-1.31-0.661 c-0.2-1.267-1.206-1.803-1.989-1.964c-0.132-0.864-0.649-1.342-1.201-1.582l21.49-21.503l4.721,4.721L11.346,33.388z"></path><path fill="#4788c7" d="M28.054,7.931l4.014,4.014L11.431,32.594c-0.242-0.278-0.638-0.59-1.261-0.748 c-0.306-1.078-1.155-1.685-1.983-1.943c-0.151-0.546-0.447-0.968-0.821-1.272L28.054,7.931 M28.053,6.517L5.56,29.023 c0,0,0.007,0,0.021,0c0.197,0,1.715,0.054,1.715,1.731c0,0,1.993,0.062,1.993,1.99c1.982,0,1.71,1.697,1.71,1.697l22.482-22.495 L28.053,6.517L28.053,6.517z"></path></g><g><path fill="#dff0fe" d="M29.107 4.764H34.685V11.440999999999999H29.107z" transform="rotate(-45.009 31.895 8.103)"></path><path fill="#4788c7" d="M31.507,4.477l4.014,4.014l-3.237,3.237L28.27,7.714L31.507,4.477 M31.507,3.063l-4.651,4.651 l5.428,5.428l4.651-4.651L31.507,3.063L31.507,3.063z"></path></g></svg></small>
                           <svg onClick={() => NoEditAll()} className={`mb-2   ${(all) ? "d-none" : ""} `} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 40 40"><path fill="#dff0fe" d="M5.982 29.309L8.571 26.719 13.618 31.115 10.715 34.019 2.453 37.547z"></path><path fill="#4788c7" d="M8.595,27.403l4.291,3.737l-2.457,2.457l-7.026,3.001l3.001-7.003L8.595,27.403 M8.548,26.036 l-2.988,2.988l-4.059,9.474L11,34.44l3.351-3.351L8.548,26.036L8.548,26.036z"></path><path fill="#4788c7" d="M3.805 33.13L1.504 38.5 6.888 36.201z"></path><path fill="#b6dcfe" d="M30.062,5.215L32.3,2.978C32.931,2.347,33.769,2,34.66,2s1.729,0.347,2.36,0.978 c1.302,1.302,1.302,3.419,0,4.721l-2.237,2.237L30.062,5.215z"></path><path fill="#4788c7" d="M34.66,2.5c0.758,0,1.471,0.295,2.007,0.831c1.107,1.107,1.107,2.907,0,4.014l-1.884,1.884 L30.77,5.215l1.884-1.884C33.189,2.795,33.902,2.5,34.66,2.5 M34.66,1.5c-0.982,0-1.965,0.375-2.714,1.124l-2.591,2.591 l5.428,5.428l2.591-2.591c1.499-1.499,1.499-3.929,0-5.428v0C36.625,1.875,35.643,1.5,34.66,1.5L34.66,1.5z"></path><g><path fill="#b6dcfe" d="M11.346,33.388c-0.066-0.153-0.157-0.308-0.282-0.454c-0.31-0.363-0.749-0.584-1.31-0.661 c-0.2-1.267-1.206-1.803-1.989-1.964c-0.132-0.864-0.649-1.342-1.201-1.582l21.49-21.503l4.721,4.721L11.346,33.388z"></path><path fill="#4788c7" d="M28.054,7.931l4.014,4.014L11.431,32.594c-0.242-0.278-0.638-0.59-1.261-0.748 c-0.306-1.078-1.155-1.685-1.983-1.943c-0.151-0.546-0.447-0.968-0.821-1.272L28.054,7.931 M28.053,6.517L5.56,29.023 c0,0,0.007,0,0.021,0c0.197,0,1.715,0.054,1.715,1.731c0,0,1.993,0.062,1.993,1.99c1.982,0,1.71,1.697,1.71,1.697l22.482-22.495 L28.053,6.517L28.053,6.517z"></path></g><g><path fill="#dff0fe" d="M29.107 4.764H34.685V11.440999999999999H29.107z" transform="rotate(-45.009 31.895 8.103)"></path><path fill="#4788c7" d="M31.507,4.477l4.014,4.014l-3.237,3.237L28.27,7.714L31.507,4.477 M31.507,3.063l-4.651,4.651 l5.428,5.428l4.651-4.651L31.507,3.063L31.507,3.063z"></path></g></svg>
                        </h4>
                     </div>

                  </Card.Header>
                  <Card.Body>
                     <Form>
                        <Row>
                           <h5 className="text-center mb-3 border-bottom ">Personal Information <svg onClick={() => setPart1(!part1)} className={`mb-2   ${(part2 && part3) ? "" : "d-none"} `} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 40 40"><path fill="#dff0fe" d="M5.982 29.309L8.571 26.719 13.618 31.115 10.715 34.019 2.453 37.547z"></path><path fill="#4788c7" d="M8.595,27.403l4.291,3.737l-2.457,2.457l-7.026,3.001l3.001-7.003L8.595,27.403 M8.548,26.036 l-2.988,2.988l-4.059,9.474L11,34.44l3.351-3.351L8.548,26.036L8.548,26.036z"></path><path fill="#4788c7" d="M3.805 33.13L1.504 38.5 6.888 36.201z"></path><path fill="#b6dcfe" d="M30.062,5.215L32.3,2.978C32.931,2.347,33.769,2,34.66,2s1.729,0.347,2.36,0.978 c1.302,1.302,1.302,3.419,0,4.721l-2.237,2.237L30.062,5.215z"></path><path fill="#4788c7" d="M34.66,2.5c0.758,0,1.471,0.295,2.007,0.831c1.107,1.107,1.107,2.907,0,4.014l-1.884,1.884 L30.77,5.215l1.884-1.884C33.189,2.795,33.902,2.5,34.66,2.5 M34.66,1.5c-0.982,0-1.965,0.375-2.714,1.124l-2.591,2.591 l5.428,5.428l2.591-2.591c1.499-1.499,1.499-3.929,0-5.428v0C36.625,1.875,35.643,1.5,34.66,1.5L34.66,1.5z"></path><g><path fill="#b6dcfe" d="M11.346,33.388c-0.066-0.153-0.157-0.308-0.282-0.454c-0.31-0.363-0.749-0.584-1.31-0.661 c-0.2-1.267-1.206-1.803-1.989-1.964c-0.132-0.864-0.649-1.342-1.201-1.582l21.49-21.503l4.721,4.721L11.346,33.388z"></path><path fill="#4788c7" d="M28.054,7.931l4.014,4.014L11.431,32.594c-0.242-0.278-0.638-0.59-1.261-0.748 c-0.306-1.078-1.155-1.685-1.983-1.943c-0.151-0.546-0.447-0.968-0.821-1.272L28.054,7.931 M28.053,6.517L5.56,29.023 c0,0,0.007,0,0.021,0c0.197,0,1.715,0.054,1.715,1.731c0,0,1.993,0.062,1.993,1.99c1.982,0,1.71,1.697,1.71,1.697l22.482-22.495 L28.053,6.517L28.053,6.517z"></path></g><g><path fill="#dff0fe" d="M29.107 4.764H34.685V11.440999999999999H29.107z" transform="rotate(-45.009 31.895 8.103)"></path><path fill="#4788c7" d="M31.507,4.477l4.014,4.014l-3.237,3.237L28.27,7.714L31.507,4.477 M31.507,3.063l-4.651,4.651 l5.428,5.428l4.651-4.651L31.507,3.063L31.507,3.063z"></path></g></svg></h5>
                           <Col lg="6">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="email" className="">First Name</Form.Label>
                                 <Form.Control type="email" className="" id="email" aria-describedby="email" placeholder="" disabled={true} value={user.firstName} onChange={(e) =>
                                    setData((prevStep) => ({
                                       ...prevStep,
                                       firstName: e.target.value,
                                    }))} />
                              </Form.Group >
                           </Col>
                           <Col lg="6" className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Last Name</Form.Label>
                                 <Form.Control type="text" className="" id="text" aria-describedby="text" placeholder=" " disabled={true} value={user.lastName} onChange={(e) =>
                                    setData((prevStep) => ({
                                       ...prevStep,
                                       lastName: e.target.value,
                                    }))}/>
                              </Form.Group>
                           </Col>
                           <Col lg="6" className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Email</Form.Label>
                                 <Form.Control type="text" className="" id="text" aria-describedby="text" placeholder=" " disabled={true} value={user.email} onChange={(e) =>
                                    setData((prevStep) => ({
                                       ...prevStep,
                                       email: e.target.value,
                                    }))}/>
                              </Form.Group>
                           </Col>
                           <Col lg="6" className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Date of birth</Form.Label>
                                 <Form.Control type="date" className="" id="text" aria-describedby="text" placeholder=" " disabled={true} value={user.date} onChange={(e) =>
                                    setData((prevStep) => ({
                                       ...prevStep,
                                       date: e.target.value,
                                    }))}/>
                              </Form.Group>
                           </Col>
                           <Col lg="6" className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Contact Number</Form.Label>
                                 <Form.Control type="text" className="" id="text" aria-describedby="text" placeholder=" " disabled={part1} value={user.number}  onChange={(e) =>
                                    setData((prevStep) => ({
                                       ...prevStep,
                                       number: e.target.value,
                                    }))}/>
                              </Form.Group>
                           </Col>
                           <Col lg="6" className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Country</Form.Label>
                                 <Form.Control type="text" className="" id="text" aria-describedby="text" placeholder=" " disabled={true} value={user.country}  onChange={(e) =>
                                    setData((prevStep) => ({
                                       ...prevStep,
                                       country: e.target.value,
                                    }))}/>
                              </Form.Group>
                           </Col>
                           <div className={`  justify-content-center mb-2 mt-2  ${(part1) ? "d-none" : "d-flex"} ${(all) ? "d-flex" : "d-none"} `}>
                              <Button type="button" variant="btn btn-primary" onClick={() => Modify()}>Modify</Button>
                           </div>
                           <h5 className="text-center mb-3 border-bottom ">Professional information <svg onClick={() => setPart2(!part2)} className={`mb-2   ${(part1 && part3) ? "" : "d-none"} `} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 40 40"><path fill="#dff0fe" d="M5.982 29.309L8.571 26.719 13.618 31.115 10.715 34.019 2.453 37.547z"></path><path fill="#4788c7" d="M8.595,27.403l4.291,3.737l-2.457,2.457l-7.026,3.001l3.001-7.003L8.595,27.403 M8.548,26.036 l-2.988,2.988l-4.059,9.474L11,34.44l3.351-3.351L8.548,26.036L8.548,26.036z"></path><path fill="#4788c7" d="M3.805 33.13L1.504 38.5 6.888 36.201z"></path><path fill="#b6dcfe" d="M30.062,5.215L32.3,2.978C32.931,2.347,33.769,2,34.66,2s1.729,0.347,2.36,0.978 c1.302,1.302,1.302,3.419,0,4.721l-2.237,2.237L30.062,5.215z"></path><path fill="#4788c7" d="M34.66,2.5c0.758,0,1.471,0.295,2.007,0.831c1.107,1.107,1.107,2.907,0,4.014l-1.884,1.884 L30.77,5.215l1.884-1.884C33.189,2.795,33.902,2.5,34.66,2.5 M34.66,1.5c-0.982,0-1.965,0.375-2.714,1.124l-2.591,2.591 l5.428,5.428l2.591-2.591c1.499-1.499,1.499-3.929,0-5.428v0C36.625,1.875,35.643,1.5,34.66,1.5L34.66,1.5z"></path><g><path fill="#b6dcfe" d="M11.346,33.388c-0.066-0.153-0.157-0.308-0.282-0.454c-0.31-0.363-0.749-0.584-1.31-0.661 c-0.2-1.267-1.206-1.803-1.989-1.964c-0.132-0.864-0.649-1.342-1.201-1.582l21.49-21.503l4.721,4.721L11.346,33.388z"></path><path fill="#4788c7" d="M28.054,7.931l4.014,4.014L11.431,32.594c-0.242-0.278-0.638-0.59-1.261-0.748 c-0.306-1.078-1.155-1.685-1.983-1.943c-0.151-0.546-0.447-0.968-0.821-1.272L28.054,7.931 M28.053,6.517L5.56,29.023 c0,0,0.007,0,0.021,0c0.197,0,1.715,0.054,1.715,1.731c0,0,1.993,0.062,1.993,1.99c1.982,0,1.71,1.697,1.71,1.697l22.482-22.495 L28.053,6.517L28.053,6.517z"></path></g><g><path fill="#dff0fe" d="M29.107 4.764H34.685V11.440999999999999H29.107z" transform="rotate(-45.009 31.895 8.103)"></path><path fill="#4788c7" d="M31.507,4.477l4.014,4.014l-3.237,3.237L28.27,7.714L31.507,4.477 M31.507,3.063l-4.651,4.651 l5.428,5.428l4.651-4.651L31.507,3.063L31.507,3.063z"></path></g></svg> </h5>
                           {data.userRole == "Agent" && <Col lg="6">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Profile</Form.Label>
                                 <select
                                    className="form-control"
                                    disabled={part2}
                                    value={user.profile}
                                    onChange={(e) =>
                                       setData((prevStep) => ({
                                          ...prevStep,
                                          profile: e.target.value,
                                       }))}
                                 >
                                    <option disabled selected>
                                       {user.profile}
                                    </option>
                                    <option value="Manager">Manager</option>
                                    <option value="Coach">Coach</option>
                                    <option value="Sports Team">Sports Team</option>
                                 </select>
                              </Form.Group >
                           </Col>}
                           {data.userRole == "Footballer" && <Col lg="2" className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Main Position</Form.Label>
                                 <select
                                    className="form-control"
                                    disabled={part2}
                                    value={user.pos1}
                                    onChange={(e) =>
                                       setData((prevStep) => ({
                                          ...prevStep,
                                          pos1: e.target.value,
                                       }))}
                                 >
                                    <option disabled selected>
                                       {user.pos1}
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
                              </Form.Group>
                           </Col>}
                           {data.userRole == "Footballer" && <Col lg="2" className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Second Position</Form.Label>
                                 <select
                                    className="form-control"
                                    disabled={part2}
                                    value={user.pos2}
                                    onChange={(e) =>
                                       setData((prevStep) => ({
                                          ...prevStep,
                                          pos2: e.target.value,
                                       }))}
                                 >
                                    <option disabled selected>
                                       {user.pos2}
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
                              </Form.Group>
                           </Col>}
                           {data.userRole == "Footballer" && <Col lg="2 " className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Foot</Form.Label>
                                 <select
                                    className="form-control"
                                    disabled={part2}
                                    value={user.foot}
                                    onChange={(e) =>
                                       setData((prevStep) => ({
                                          ...prevStep,
                                          foot: e.target.value,
                                       }))}
                                 >
                                    <option disabled selected>
                                       {user.foot}
                                    </option>
                                    <option value="Right">Right</option>
                                    <option value="Left">Left</option>
                                    <option value="Right/Left">Both</option>
                                 </select>
                              </Form.Group></Col>}
                           {data.userRole == "Footballer" && !data.verified && data.license == null && <Col lg="6" className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Certificate<small className='text-danger'> Not Verified</small></Form.Label>
                                 <Form.Control type="file" className="" id="file" aria-describedby="text" placeholder=" " disabled={part2} onChange={(e) => { setlicense(e.target.files[0]); setNewLicense(true) }} />
                              </Form.Group>
                           </Col>}
                           {data.userRole == "Footballer" && !data.verified && data.license != null && <Col lg="6" className="">
                              <Form.Group className="block w-100 text-center">
                                 <Form.Label htmlFor="text" className="w-100">
                                    Certificate<small className='text-primary'> Verification in Progress {data.isVerified}</small>
                                 </Form.Label>
                                 <Image
                                    src={prog}
                                    alt="post-image"
                                    className="img-fluid mx-auto"
                                    width={180}
                                 />
                              </Form.Group>
                           </Col>}
                           {data.userRole == "Footballer" && data.verified && data.license != null && <Col lg="6" className="">
                              <Form.Group className="block w-100 text-center">
                                 <Form.Label htmlFor="text" className="w-100">Certificate<small className='text-success'> Verified</small></Form.Label>
                                 <Image
                                    src={ver}
                                    alt="post-image"
                                    width={180}
                                    className="img-fluid mx-auto"
                                 />
                              </Form.Group>
                           </Col>}
                           {data.userRole == "Footballer" && <Col lg="3 " className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Weight</Form.Label>
                                 <Form.Control type="text" className="" id="text" aria-describedby="text" placeholder=" " disabled={part2} value={user.poids} onChange={(e) =>
                                       setData((prevStep) => ({
                                          ...prevStep,
                                          poids: e.target.value,
                                       }))} />
                              </Form.Group></Col>}
                              {data.userRole == "Footballer" && <Col lg="3 " className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Height</Form.Label>
                                 <Form.Control type="text" className="" id="text" aria-describedby="text" placeholder=" " disabled={part2} value={user.taille} onChange={(e) =>
                                       setData((prevStep) => ({
                                          ...prevStep,
                                          taille: e.target.value,
                                       }))}/>
                              </Form.Group></Col>}
                           {data.userRole == "Agent" && !data.verified && (data.deals == null || data.deals == "") && <Col lg="6" className="">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="text" className="">Deals <small className='text-danger'> Not Verified</small></Form.Label>
                                 <Form.Control type="text" className="" id="text" aria-describedby="text" placeholder=" " disabled={part2} value={user.deals} onChange={(e) =>
                                       setData((prevStep) => ({
                                          ...prevStep,
                                          deals: e.target.value,
                                       }))}
                                 />
                              </Form.Group>
                           </Col>}
                           {data.userRole == "Agent" && !data.verified && data.deals != null && data.deals != "" && <Col lg="6" className="">
                              <Form.Group className="block w-100 text-center">
                                 <Form.Label htmlFor="text" className="w-100">Deals <small className='text-primary'> Verification In progress</small></Form.Label>
                                 <Image
                                    src={prog}
                                    alt="post-image"
                                    className="img-fluid mx-auto"
                                    width={180}
                                 />
                              </Form.Group>
                           </Col>}
                           {data.userRole == "Agent" && data.verified && data.deals != null && data.deals != "" && <Col lg="6" className="">
                              <Form.Group className="block w-100 text-center">
                                 <Form.Label htmlFor="text" className="w-100">Deals <small className='text-success'> Verified</small></Form.Label>
                                 <Image
                                    src={ver}
                                    alt="post-image"
                                    width={180}
                                    className="img-fluid mx-auto"
                                 />
                              </Form.Group>
                           </Col>}
                           <div className={`  justify-content-center mb-2 mt-2  ${part2 ? "d-none" : "d-flex"
                              } ${(all) ? "d-flex" : "d-none"} `}>
                              <Button type="button" variant="btn btn-primary" onClick={() => Modify()}>Modify</Button>
                           </div>
                           <h5 className="text-center mb-3 border-bottom ">Profile Image <svg onClick={() => setPart3(!part3)} className={`mb-2   ${(part1 && part2) ? "" : "d-none"} `} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 40 40"><path fill="#dff0fe" d="M5.982 29.309L8.571 26.719 13.618 31.115 10.715 34.019 2.453 37.547z"></path><path fill="#4788c7" d="M8.595,27.403l4.291,3.737l-2.457,2.457l-7.026,3.001l3.001-7.003L8.595,27.403 M8.548,26.036 l-2.988,2.988l-4.059,9.474L11,34.44l3.351-3.351L8.548,26.036L8.548,26.036z"></path><path fill="#4788c7" d="M3.805 33.13L1.504 38.5 6.888 36.201z"></path><path fill="#b6dcfe" d="M30.062,5.215L32.3,2.978C32.931,2.347,33.769,2,34.66,2s1.729,0.347,2.36,0.978 c1.302,1.302,1.302,3.419,0,4.721l-2.237,2.237L30.062,5.215z"></path><path fill="#4788c7" d="M34.66,2.5c0.758,0,1.471,0.295,2.007,0.831c1.107,1.107,1.107,2.907,0,4.014l-1.884,1.884 L30.77,5.215l1.884-1.884C33.189,2.795,33.902,2.5,34.66,2.5 M34.66,1.5c-0.982,0-1.965,0.375-2.714,1.124l-2.591,2.591 l5.428,5.428l2.591-2.591c1.499-1.499,1.499-3.929,0-5.428v0C36.625,1.875,35.643,1.5,34.66,1.5L34.66,1.5z"></path><g><path fill="#b6dcfe" d="M11.346,33.388c-0.066-0.153-0.157-0.308-0.282-0.454c-0.31-0.363-0.749-0.584-1.31-0.661 c-0.2-1.267-1.206-1.803-1.989-1.964c-0.132-0.864-0.649-1.342-1.201-1.582l21.49-21.503l4.721,4.721L11.346,33.388z"></path><path fill="#4788c7" d="M28.054,7.931l4.014,4.014L11.431,32.594c-0.242-0.278-0.638-0.59-1.261-0.748 c-0.306-1.078-1.155-1.685-1.983-1.943c-0.151-0.546-0.447-0.968-0.821-1.272L28.054,7.931 M28.053,6.517L5.56,29.023 c0,0,0.007,0,0.021,0c0.197,0,1.715,0.054,1.715,1.731c0,0,1.993,0.062,1.993,1.99c1.982,0,1.71,1.697,1.71,1.697l22.482-22.495 L28.053,6.517L28.053,6.517z"></path></g><g><path fill="#dff0fe" d="M29.107 4.764H34.685V11.440999999999999H29.107z" transform="rotate(-45.009 31.895 8.103)"></path><path fill="#4788c7" d="M31.507,4.477l4.014,4.014l-3.237,3.237L28.27,7.714L31.507,4.477 M31.507,3.063l-4.651,4.651 l5.428,5.428l4.651-4.651L31.507,3.063L31.507,3.063z"></path></g></svg> </h5>
                           <Col lg="12">
                              <Form.Group className="form-group">
                                 <Form.Label htmlFor="file" className="">Upload New Image</Form.Label>
                                 <Form.Control type="file" className="" id="file" aria-describedby="file" placeholder=" " disabled={part3} onChange={(e) => { setimage(e.target.files[0]); setNewImage(true) }} />
                              </Form.Group >
                           </Col>

                           <div className={`  justify-content-center mb-2 mt-2  ${part3 ? "d-none" : "d-flex"
                              } ${(all) ? "d-flex" : "d-none"}`}>
                              <Button type="button" variant="btn btn-primary" onClick={() => Modify()}>Modify</Button>
                           </div>
                           <div className={`  justify-content-center mb-2 mt-2  ${all ? "d-none" : "d-flex"
                              } `}>
                              <Button type="button" variant="btn btn-primary" onClick={() => Modify()}>Modify All</Button>
                           </div>
                        </Row>
                     </Form>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   )

}

export default UserProfileEdit;