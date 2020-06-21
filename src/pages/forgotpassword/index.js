import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput } from "mdbreact";

import { notifyError, notifySuccess } from '../templates/notify';
import {validaEmail} from '../../utils/validators';


export default class ForgotPassword extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: '',
            valid: false,
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        if(e.target.value.length > 0 && validaEmail(e.target.value)) this.setState({valid: true});
        else this.setState({valid: false});
    }


    sendEmail = async e => {
        e.preventDefault();
        const { email } = this.state;
        if (!email) {
            notifyError('Informe o seu e-mail!');
        } else {
            try {
                this.setState({
                    loading: true
                });
                //const response = await api.post("/login", { email, password });
                //login(response.data.token);
                notifySuccess('Uma nova senha foi enviada para o seu e-mail!');
                this.setState({
                    loading: false
                });

            } catch (err) {
                this.setState({
                    loading: false
                });
                //console.log(err)
                notifyError('E-mail não encontrado!');
            }
        }
    };

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol xs="12" sm="6" className="mx-auto my-5">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Recuperar a senha</MDBCardTitle>
                                <hr />
                                <form onSubmit={this.sendEmail}>
                                    <MDBInput label="Informe seu e-mail cadastrado" type="email" onChange={this.handleChange} />
                                    <p className="text-center m-0">
                                        {!this.state.loading ?
                                            (<button disabled={!this.state.valid} className="btn btn-amber btn-rounded my-2 waves-effect z-depth-0" type="submit">Enviar</button>)
                                            :
                                            (<button className="btn btn-amber btn-rounded my-2 waves-effect z-depth-0" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            &nbsp; Verificando...
                                            </button>)
                                        }
                                        <Link to='/' className="btn btn-danger btn-rounded my-2 waves-effect z-depth-0">Voltar</Link>
                                    </p>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
