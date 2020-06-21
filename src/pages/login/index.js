import React, { Component } from 'react'
import { MDBContainer, MDBRow } from "mdbreact";

import HeaderMain from '../templates/header_main';
import Form from './form';
import ImgLeft from './imgLeft';

export default class Login extends Component {
    render() {
        return (
            <>
                <HeaderMain />
                <MDBContainer>
                    <MDBRow className="mt-5">
                        <ImgLeft />
                        <Form />
                    </MDBRow>
                </MDBContainer>
            </>            
        )
    }
}
