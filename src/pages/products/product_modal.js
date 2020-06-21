import React, {useState, useEffect} from 'react'
import {MDBInput, MDBBtn} from 'mdbreact'
import {useDispatch, useSelector} from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import ModalTemplate from '../templates/modal';
import {notifySuccess, notifyError} from '../templates/notify';
import {api} from '../../services/api';

export default function Modal(props) {

    const [input, setInput] = useState({product_id: '', category_id: '', product_name: '', product_image: ''});
    const [valida, setValida] = useState(false);

    const modal = useSelector(state => state.modalState.modal);
    const category_list = useSelector(state => state.productState.categories);
    const product_id = useSelector(state => state.productState.product_id);
    const category_id = useSelector(state => state.productState.category_id);
    const product_name = useSelector(state => state.productState.product_name);
    const product_image = useSelector(state => state.productState.product_image);
    const dispatch = useDispatch();

    //console.log(category_list);
    
    useEffect(() => {
        if (input.product_name && input.product_image && input.category_id) setValida(true);
        else setValida(false);
        if(product_id !== input.product_id) setInput({...input, product_id, category_id, product_name, product_image });
    }, [input, product_id])

    function toggle(show) {
        dispatch({type: 'MODAL_SHOW', modal: !show});
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        const {product_id, category_id, product_name, product_image} = input;
        dispatch({type: 'EDIT_PRODUCT', product_id, category_id, product_name, product_image, categories: category_list});

    }

    const submitHandler = async event => {
        event.preventDefault();
        event.target.className += " was-validated";
        try{
            toggle(true);
            if(input.product_id){
                let category = [...category_list];
                category = category.filter(item => item.category_id === input.category_id);
                //console.log(category[0].category_name);
                const params = {category_id: input.category_id, product_name: input.product_name, product_image: input.product_image};
                await trackPromise(api.put(`/product/product_id/${input.product_id}`, params));
                dispatch({ type: 'UPDATE_PRODUCT', product_id: input.product_id, category_id: input.category_id, category_name: category[0].category_name, product_name: input.product_name, product_image: input.product_image, categories: category_list });
            
            }else{
                const params = {category_id: input.category_id, product_name: input.product_name, product_image: input.product_image};
                const response = await trackPromise(api.post("/product", params));
                dispatch({ type: 'CREATE_PRODUCT', data: response.data });
                //console.log(response.data);
            }
            notifySuccess('Produto gravado!');
            
        } catch (error) {
            notifyError('Erro ao cadastrar produto!');
        }
    }

    return (
        
        <ModalTemplate show={modal} title="Cadastrar produto">
            <form className="needs-validation"
                onSubmit={submitHandler}
                id="frmModal"
            >
                <input type="hidden" name="product_id" value={input.product_id} />
                <div>
                    <label>Categoria</label>
                    <select className="browser-default custom-select" value={input.category_id} onChange={handleInputChange} name="category_id" required>
                        <option value="">Selecione uma categoria</option>
                        {
                            category_list.length > 0 && category_list.map(item => {
                                return (<option key={item.category_id} value={item.category_id}>{item.category_name}</option>)
                            })
                        }
                    </select>
                </div>
                <MDBInput type="text" name="product_name" label="Nome" value={input.product_name} onChange={handleInputChange} />
                <MDBInput type="text" name="product_image" label="URL imagem" value={input.product_image} onChange={handleInputChange} />
                <hr />
                <div className="modal-footer">
                    <MDBBtn color="danger" onClick={() => toggle(modal)}>Sair</MDBBtn>
                    <MDBBtn color="amber" type="submit" disabled={!valida}>Salvar</MDBBtn>
                </div>
            </form>
        </ModalTemplate>
    )
}
