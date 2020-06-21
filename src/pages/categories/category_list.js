import React, { useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact'
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { trackPromise } from 'react-promise-tracker';

import TableContent from '../templates/table/table_list';
import { fields, columns } from './table.config';
import Modal from './category_modal';
import {api} from '../../services/api';
import {notifySuccess, notifyError} from '../templates/notify';


export default function CategoryList(props) {

    const dados = props.data;

    const data = useSelector(state => state.categoryState.data);
    const modal = useSelector(state => state.modalState.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'LIST_CATEGORY', data: dados });
    }, [dados])

    function handleClick(e) {
        dispatch({ type: 'MODAL_SHOW', modal: true });
        dispatch({ type: 'EDIT_CATEGORY', category_id: '', category_name: '', isactive: true });
    }

    const handleEdit = r => {
        //console.log(r);
        const { category_id, category_name, isactive } = r;
        dispatch({ type: 'EDIT_CATEGORY', category_id, category_name, isactive });
        dispatch({ type: 'MODAL_SHOW', modal: true });
    }

    const handleDelete = r => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MDBCard>
                        <MDBCardBody>
                            <h5>Confirma exclusão da categoria?</h5>
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
            await trackPromise(api.delete(`/category/category_id/${r.category_id}`));
            dispatch({ type: 'DELETE_CATEGORY', category_id: r.category_id });
            notifySuccess('Categoria excluída!');
        } catch (error) {
            notifyError('Categoria não pôde ser excluída!');
        }
    }

    return (
        <>
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol sm="12">
                        <MDBBtn color="amber" onClick={handleClick}>Nova categoria</MDBBtn>
                        <TableContent
                            css="table table-striped"
                            fields={fields}
                            cols={columns}
                            rows={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            sortedby="category_name|asc"
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
