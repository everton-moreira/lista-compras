import React, { useState, useEffect } from 'react'
import { MDBCol, MDBCard, MDBCardBody, MDBInput } from "mdbreact";
import { Link, Redirect } from 'react-router-dom';

import img_profile from "../../assets/undraw_profile_pic_ic5t.svg";
import { sendPost } from '../../services/api';
import { login } from '../../services/auth';
import { notifyError } from '../templates/notify';

export default function Form() {

    const [input, setInput] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [valida, setValida] = useState(false);
    const [go, setGo] = useState(false);

    useEffect(() => {
        if (input.email && input.password) setValida(true);
        else setValida(false);

    }, [input])

    const handleInputChange = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    async function doLogin(e, props) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await sendPost("/login", input);
            login(response.token);
            setGo(true);
        } catch (err) {
            setLoading(false);
            notifyError('E-mail ou senha inválidos!');
            console.log(err)
        }
    };

    return (
        <>
            {go && <Redirect to="/lists" />}
            <MDBCol className="text-center">
                <MDBCard>
                    <MDBCardBody>
                        <img src={img_profile} className="imglogin" alt="user" />
                        <h2>BEM-VINDO</h2>
                        <form onSubmit={doLogin}>
                            <MDBInput type="email" name="email" label="E-mail" onChange={handleInputChange} />
                            <MDBInput type="password" name="password" label="Senha" onChange={handleInputChange} />
                            <div className="d-flex justify-content-end">
                                <div>
                                    <Link className="app" to="/forgotpassword">Esqueci minha senha</Link>
                                </div>
                            </div>
                            {!loading ?
                                (<button disabled={!valida} className="btn btn-amber btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Entrar</button>)
                                :
                                (<button className="btn btn-amber btn-rounded btn-block my-4 waves-effect z-depth-0" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        &nbsp; Verificando...
                                </button>)
                            }
                            {valida}
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </>
    )
}
