import React, {useState, useEffect} from 'react'
import {MDBInput, MDBBtn} from 'mdbreact'
import {useDispatch, useSelector} from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import ModalTemplate from '../templates/modal';
import {notifySuccess, notifyError} from '../templates/notify';
import {api} from '../../services/api';
import {getUser} from '../../services/auth';

export default function Modal(props) {

    const [input, setInput] = useState({shopping_list_id: '',
                                        title: '',
                                        description: '',
                                        shopping_date: '',
                                        user_id: '',
                                        isactive: false
                                        });
    const [valida, setValida] = useState(false);

    const modal = useSelector(state => state.modalState.modal);
    const shopping_list_id = useSelector(state => state.shoppingListState.shopping_list_id);
    const title = useSelector(state => state.shoppingListState.title);
    const description = useSelector(state => state.shoppingListState.description);
    const shopping_date = useSelector(state => state.shoppingListState.shopping_date);
    const isactive = useSelector(state => state.shoppingListState.isactive);
    const {sub} = getUser();
    const user_id = sub.user_id;
    const dispatch = useDispatch();

    //console.log(shopping_list_id);
    
    useEffect(() => {
        if (input.title && input.description) setValida(true);
        else setValida(false);
        if(shopping_list_id !== input.shopping_list_id) setInput({...input, shopping_list_id, title, description, shopping_date, user_id, isactive });
    }, [input, shopping_list_id])

    function toggle(show) {
        dispatch({type: 'MODAL_SHOW', modal: !show});
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        if(name === 'description' && value.length <= 255) setInput({ ...input, [name]: value });
        else if(name !== 'description') setInput({ ...input, [name]: value });
        const {shopping_list_id, title, description, shopping_date, user_id, isactive} = input;
        dispatch({type: 'EDIT_SHOPPING', shopping_list_id, title, description, user_id, isactive});

    }

    const submitHandler = async event => {
        event.preventDefault();
        event.target.className += " was-validated";
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        try{
            toggle(true);
            if(input.shopping_list_id){
                //console.log(category[0].category_name);
                const params = {
                                title: input.title,
                                description: input.description,
                                shopping_date: today,
                                user_id: user_id,
                                isactive: input.isactive
                                };
                await trackPromise(api.put(`/list/shopping_list_id/${input.shopping_list_id}`, params));
                dispatch({ type: 'UPDATE_SHOPPING', shopping_list_id: input.shopping_list_id,
                                                    title: input.title,
                                                    description: input.description,
                                                    shopping_date: today,
                                                    user_id: user_id,
                                                    isactive: input.isactive  });
            
            }else{
                const params = {
                    title: input.title,
                    description: input.description,
                    shopping_date: today,
                    user_id: user_id,
                    isactive: input.isactive
                    };
                const response = await trackPromise(api.post("/list", params));
                dispatch({ type: 'CREATE_SHOPPING', data: response.data });
                //console.log(response.data);
                
            }
            notifySuccess('Lista gravada!');
            
        } catch (error) {
            notifyError('Erro ao cadastrar lista!');
        }
    }

    return (
        
        <ModalTemplate show={modal} title="Cadastrar lista">
            <form className="needs-validation"
                onSubmit={submitHandler}
                id="frmModal"
            >
                <input type="hidden" name="shopping_list_id" value={input.shopping_list_id || ''} />
                <MDBInput type="text" name="title" label="Título" value={input.title} onChange={handleInputChange} />
                <MDBInput type="textarea" name="description" label="Descrição" value={input.description} onChange={handleInputChange} />
                <div>
                    <label>Compra feita?</label>
                    <select className="browser-default custom-select" value={input.isactive} onChange={handleInputChange} name="isactive" required>
                        <option value='false'>Não</option>
                        <option value='true'>Sim</option>
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
