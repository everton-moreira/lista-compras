import React, {useState, useEffect} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from 'mdbreact';
import { trackPromise } from 'react-promise-tracker';
import {Link} from 'react-router-dom';

import {notifySuccess, notifyError} from '../../templates/notify';
import {api} from '../../../services/api';

export default function Form(props) {

    const [input, setInput] = useState({user_id: 0, username: '', email: '', password: '', isactive: true});
    const [valida, setValida] = useState(false);
    const dados = props.dados;
    //console.log(dados);

    useEffect(() => {
        if (input.username && input.email && input.password) setValida(true);
        else setValida(false);
        if(dados.length > 0 && input.user_id === 0) setInput({user_id: dados[0].user_id, username: dados[0].username, email: dados[0].email});
    }, [dados,input])

    const handleInputChange = e => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const submitHandler = async event => {
        event.preventDefault();
        event.target.className += " was-validated";
        try{

            const params = {username: input.username, email: input.email, password: input.password, isactive: true};
            await trackPromise(api.put(`/user/user_id/${input.user_id}`, params));
            
            notifySuccess('Dados gravados!');
            
        } catch (error) {
            notifyError('Erro ao gravar dados!');
        }
    }

    return (
        <>
            <MDBContainer className="mt-3">
                <MDBRow center>
                    <MDBCol sm="6">
                        <MDBCard className="mx-auto">
                            <MDBCardBody>
                            <MDBCardTitle>Alterar dados</MDBCardTitle>
                            <hr />
                            <form className="needs-validation"
                                onSubmit={submitHandler}
                                id="frmModal"
                            >
                                <input type="hidden" name="user_id" value={input.user_id || ''} />
                                <MDBInput type="text" name="username" label="Nome" value={input.username} onChange={handleInputChange} />
                                <MDBInput type="email" autoComplete="off" name="email" label="E-mail" value={input.email} onChange={handleInputChange} />
                                <MDBInput type="password" autoComplete="off" name="password" label="Senha" value={input.password} onChange={handleInputChange} />
                                <hr />
                                <div className="d-flex justify-content-center">
                                    <Link to="/lists" className="btn btn-danger">Cancelar</Link>
                                    <MDBBtn color="amber" type="submit" disabled={!valida}>Salvar</MDBBtn>
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
