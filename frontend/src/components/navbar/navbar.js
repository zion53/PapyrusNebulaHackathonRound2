import React from "react";
import "./navbar.css";
import cv from "../../images/cv.png";


const Navbar = ()=>{
    return(
        <div className="navBar">
            <div className="navContent">
                <img src={cv} height={"50vh"} style={{verticalAlign:"middle",paddingRight:"7px"}}/><span className="navHeading">CV</span><span className="navHeadingcontd">Builder</span>
            </div>
        </div>
    );
}

export default Navbar;