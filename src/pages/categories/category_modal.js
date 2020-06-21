import React, {useState, useEffect, useCallback} from 'react'
import {MDBInput, MDBBtn} from 'mdbreact'
import {useDispatch, useSelector} from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import ModalTemplate from '../templates/modal';
import {notifySuccess, notifyError} from '../templates/notify';
import {api} from '../../services/api';

export default function Modal(props) {

    const [input, setInput] = useState({category_id: '', category_name: '', isactive: true});
    const [valida, setValida] = useState(false);

    const modal = useSelector(state => state.modalState.modal);
    const category_id = useSelector(state => state.categoryState.category_id);
    const category_name = useSelector(state => state.categoryState.category_name);
    const isactive = useSelector(state => state.categoryState.isactive);
    const dispatch = useDispatch();

    //console.log(category_id);
    
    useEffect(() => {
        if (input.category_name && input.isactive) setValida(true);
        else setValida(false);
        if(category_id !== input.category_id) setInput({...input, category_id, category_name, isactive });
    }, [input, category_id])


    function toggle(show) {
        dispatch({type: 'MODAL_SHOW', modal: !show});
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
        //console.log(input);
        const {category_id, category_name, isactive} = input;
        dispatch({type: 'EDIT_CATEGORY', category_id, category_name, isactive});
    }

    const submitHandler = async event => {
        event.preventDefault();
        event.target.className += " was-validated";
        try{
            toggle(true);
            if(input.category_id){

                const params = {category_name: input.category_name, isactive: input.isactive};
                await trackPromise(api.put(`/category/category_id/${input.category_id}`, params));
                dispatch({ type: 'UPDATE_CATEGORY', category_id: input.category_id, category_name: input.category_name, isactive: input.isactive });
            
            }else{
                const params = {category_name: input.category_name, isactive: input.isactive};
                const response = await trackPromise(api.post("/category", params));
                dispatch({ type: 'CREATE_CATEGORY', data: response.data });
                //console.log(params);
            }
            notifySuccess('Categoria gravada!');
            
        } catch (error) {
            notifyError('Erro ao cadastrar categoria!');
        }
    }

    return (
        
        <ModalTemplate show={modal} title="Cadastrar categoria">
            <form className="needs-validation"
                onSubmit={submitHandler}
                id="frmModal"
            >
                <input type="hidden" name="category_id" value={input.category_id} />
                <MDBInput type="text" name="category_name" label="Nome" value={input.category_name} onChange={handleInputChange} />
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
