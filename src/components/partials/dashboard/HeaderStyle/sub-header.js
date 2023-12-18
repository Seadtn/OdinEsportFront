import React, {memo,Fragment} from 'react'
import { Row,Col,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
//img
import topHeader from '../../../../assets/images/dashboard/top.jpg';
import pub from '../../../../assets/images/dashboard/pub.jpg';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';


const SubHeader = memo((props) => {


    return (
        <Fragment>
            {/*<div style={{height: "260px"}}>
                      <MDBCarousel showControls interval={3000}>
      <MDBCarouselItem itemId={1} interval={1000}>
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
            <div className="iq-navbar-header mt-2 " style={{height: "215px"}}>
      
                <div className="iq-header-img">
                    <img src={topHeader} alt="header" className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"/>
                </div>
            </div>
        </Fragment>
    )
})

export default SubHeader
