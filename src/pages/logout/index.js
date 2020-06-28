import React, {useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom';
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn} from 'mdbreact'

import {logout} from '../../services/auth';
import {notifyError} from '../templates/notify';

export default function Logout() {

    const [go, setGo] = useState(false);

    const submitHandler = async event => {
        event.preventDefault();
        event.target.className += " was-validated";
        try{
            logout();
            setGo(true);            
        } catch (error) {
            notifyError('Erro ao gravar dados!');
        }
    }

    return (
        <>
            {go && <Redirect to='/' />}
            <MDBContainer>
                <MDBRow center className="">
                    <MDBCol sm="6">
                        <MDBCard className="mx-auto mt-5 d-flex align-items-center">
                            <MDBCardBody>
                            <MDBCardTitle>Confirma saída do sistema?</MDBCardTitle>
                            <hr />
                            <form className="needs-validation"
                                onSubmit={submitHandler}
                                id="frmModal"
                            >
                                <div className="d-flex justify-content-center">
                                    <Link to="/lists" className="btn btn-danger">Cancelar</Link>
                                    <MDBBtn color="amber" type="submit">Sim, quero sair</MDBBtn>
                                </div>
                            </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}



