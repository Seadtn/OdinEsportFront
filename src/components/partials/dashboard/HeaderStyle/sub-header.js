import React, {memo,Fragment} from 'react'
import { Row,Col,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
//img
import topHeader from '../../../../assets/images/dashboard/top.jpg'



const SubHeader = memo((props) => {


    return (
        <Fragment>
            <div className="iq-navbar-header mt-2 " style={{height: "215px"}}>
                {/* {{!-- rounded-bottom if not using animation --}} */}
                <div className="iq-header-img">
                    <img src={topHeader} alt="header" className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"/>
                </div>
            </div>
        </Fragment>
    )
})

export default SubHeader
