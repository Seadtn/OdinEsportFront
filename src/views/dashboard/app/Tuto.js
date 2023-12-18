import React from 'react'
import { Card } from 'react-bootstrap'

function Tuto(iframe,title) {
  return (
    <Card.Body>
                    <div className=" m-0 d-flex align-items-center justify-content-center position-relative">
                      <div className="w-100">
                        <h4 className="text-center text-black  mb-3 border-bottom border-success border-3  ">
                          {title}
                        </h4>
                        <iframe
                          className="w-100 "
                          height="500"
                          src={iframe}
                          title="YouTube video player"
                          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                  </Card.Body>
  )
}

export default Tuto