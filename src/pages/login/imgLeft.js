import React from 'react'
import { MDBCol } from 'mdbreact';

import Logo from "../../assets/undraw_shopping_app_flsj.svg";

export default function ImgLeft() {
    return (
        <MDBCol className="my-auto">
            <img src={Logo} className="img-fluid" />
        </MDBCol>
    )
}
