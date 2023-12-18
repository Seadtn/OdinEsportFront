import React from 'react'
import { Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import avatars2 from "../../../assets/images/avatars/favicon.ico";
function Camps(campImage, details,title,location) {
    return (
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
                            <h5 className="mb-0">{title}</h5>
                            <p className="mb-0 text-primary">{location}</p>
                        </div>
                    </div>
                </div>
            </Card.Header>
            <Card.Body className="p-0">
                <div className="user-post">
                        <Image
                            src={"data:image/*;base64, " + campImage} 
                            alt="post-image"
                            className="img-fluid"
                        />
                </div>
                <div className="comment-area p-3">
                    <hr />
                    <p className="text-center">{details}</p>
                    <hr />
                </div>
            </Card.Body>
        </Card>
    )
}

export default Camps