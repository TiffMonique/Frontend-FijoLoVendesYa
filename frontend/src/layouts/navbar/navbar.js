import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./navbar.css";
//import { AccountBox } from '../accountBox/index'

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    return (
        <>

            <nav className="navbar">
                <div className="nav-container">
                    <NavLink to="/" className="nav-logo">
                        <i className="fas fa-code"></i>
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>

                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                INICIO
                            </NavLink>
                        </li>


                        <li className="nav-item">
                            <NavLink
                                to="/IniciaSesion/Registrate"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                INICIA SESION / REGISTRATE
                            </NavLink>
                        </li>



                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>
            </nav>

        </>
    );
}

export default Navbar;