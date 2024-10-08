import React from "react";
import {NavLink} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="nav">
            <ul>
                <li><NavLink to="/" activeClassName="active">TOP</NavLink></li>
                <li><NavLink to="/preview" activeClassName="active">PREVIEW</NavLink></li>
                <li><NavLink to="/map" activeClassName="active">MAP</NavLink></li>
            </ul>
        </nav>
    )
}
export default Navbar;