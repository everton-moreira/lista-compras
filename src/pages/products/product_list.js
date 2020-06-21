import React, { useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact'
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { trackPromise } from 'react-promise-tracker';

import TableContent from '../templates/table/table_list';
import { fields, columns } from './table.config';
import Modal from './product_modal';
import {api} from '../../services/api';
import {notifySuccess, notifyError} from '../templates/notify';


export default function ProductList(props) {

    const dados = props.data;
    const category_list = props.categories;

    const data = useSelector(state => state.productState.data);
    const modal = useSelector(state => state.modalState.modal);
    const dispatch = useDispatch();

    //console.log(category_list)

    useEffect(() => {
        dispatch({ type: 'LIST_PRODUCT', data: dados, categories: category_list });
    }, [dados, category_list])

    function handleClick(e) {
        dispatch({ type: 'MODAL_SHOW', modal: true });
        dispatch({ type: 'EDIT_PRODUCT', product_id: '', category_id: '', product_name: '', product_image: '', categories: category_list });
    }

    const handleEdit = r => {
        //console.log(r);
        const { product_id, product_name, product_image } = r;
        dispatch({ type: 'EDIT_PRODUCT', product_id, category_id: r.categories.category_id, product_name, product_image, categories: category_list });
        dispatch({ type: 'MODAL_SHOW', modal: true });
    }

    const handleDelete = r => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MDBCard>
                        <MDBCardBody>
                            <h5>Confirma exclusão do produto?</h5>
                            <hr />
                            <div className="text-right">
                                <button className="btn btn-sm btn-danger" onClick={onClose}>Não</button>
                                <button className="btn btn-sm warning-color-dark text-white"
                                    onClick={() => {
                                        handleClickDelete(r);
                                        onClose();
                                    }}
                                >Sim</button>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                );
            }
        });
    }

    const handleClickDelete = async r => {
        try {
            //console.log(r.category_id);
            await trackPromise(api.delete(`/product/product_id/${r.product_id}`));
            dispatch({ type: 'DELETE_PRODUCT', product_id: r.product_id, categories: category_list });
            notifySuccess('Produto excluído!');
        } catch (error) {
            notifyError('Produto não pôde ser excluído!');
        }
    }

    return (
        <>
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol sm="12">
                        <MDBBtn color="amber" onClick={handleClick}>Novo produto</MDBBtn>
                        <TableContent
                            css="table table-striped"
                            fields={fields}
                            cols={columns}
                            rows={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            sortedby="product_name|asc"
                        />
                    </MDBCol>
                    <div className="col">

                    </div>
                </MDBRow>
            </MDBContainer>
            <Modal show={modal} />
        </>
    )
}
