import React, {useState, useEffect} from 'react'
import {MDBInput, MDBBtn} from 'mdbreact'
import {useDispatch, useSelector} from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import ModalTemplate from '../templates/modal';
import {notifySuccess, notifyError} from '../templates/notify';
import {api} from '../../services/api';

export default function Modal(props) {

    const [input, setInput] = useState({user_id: '', username: '', email: '', password: '', isactive: true});
    const [valida, setValida] = useState(false);

    const modal = useSelector(state => state.modalState.modal);
    const user_id = useSelector(state => state.userState.user_id);
    const username = useSelector(state => state.userState.username);
    const email = useSelector(state => state.userState.email);
    const password = useSelector(state => state.userState.password);
    const isactive = useSelector(state => state.userState.isactive);
    const dispatch = useDispatch();

    //console.log(category_list);
    
    useEffect(() => {
        if (input.username && input.email && input.password && input.isactive) setValida(true);
        else setValida(false);
        if(user_id !== input.user_id) setInput({...input, user_id, username, email, password, isactive });
    }, [input, user_id])

    function toggle(show) {
        dispatch({type: 'MODAL_SHOW', modal: !show});
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        const {user_id, username, email, password, isactive} = input;
        dispatch({type: 'EDIT_USER', user_id, username, email, password, isactive});

    }

    const submitHandler = async event => {
        event.preventDefault();
        event.target.className += " was-validated";
        try{
            toggle(true);
            if(input.user_id){
                //console.log(category[0].category_name);
                const params = {username: input.username, email: input.email, password: input.password, isactive: input.isactive};
                await trackPromise(api.put(`/user/user_id/${input.user_id}`, params));
                dispatch({ type: 'UPDATE_USER', user_id: input.user_id, username: input.username, email: input.email, isactive: input.isactive });
            
            }else{
                const params = {username: input.username, email: input.email, password: input.password, isactive: input.isactive};
                const response = await trackPromise(api.post("/user", params));
                //console.log(response.data);
                dispatch({ type: 'CREATE_USER', data: response.data });
            }
            notifySuccess('Usuário gravado!');
            
        } catch (error) {
            notifyError('Erro ao cadastrar usuário!');
        }
    }

    return (
        
        <ModalTemplate show={modal} title="Cadastrar usuário">
            <form className="needs-validation"
                onSubmit={submitHandler}
                id="frmModal"
            >
                <input type="hidden" name="user_id" value={input.user_id || ''} />
                <MDBInput type="text" name="username" label="Nome" value={input.username} onChange={handleInputChange} />
                <MDBInput type="email" name="email" label="E-mail" value={input.email} onChange={handleInputChange} />
                <MDBInput type="password" name="password" label="Senha" value={input.password} onChange={handleInputChange} />
                <div>
                    <label>Ativo</label>
                    <select className="browser-default custom-select" value={input.isactive} onChange={handleInputChange} name="isactive" required>
                        <option value='true'>Sim</option>
                        <option value='false'>Não</option>
                    </select>
                </div>
                <hr />
                <div className="modal-footer">
                    <MDBBtn color="danger" onClick={() => toggle(modal)}>Sair</MDBBtn>
                    <MDBBtn color="amber" type="submit" disabled={!valida}>Salvar</MDBBtn>
                </div>
            </form>
        </ModalTemplate>
    )
}
