import React from 'react'
import { Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-body text-center ">
                <div className="right-panel">
                    ©  Odin Esport,
                     by <Link to="https://iqonic.design/">Brandwood Agency</Link>.
                </div>
            </div>
        </footer>
    )
}

export default Footer
