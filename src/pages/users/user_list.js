import React, { useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact'
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { trackPromise } from 'react-promise-tracker';

import TableContent from '../templates/table/table_list';
import { fields, columns } from './table.config';
import Modal from './user_modal';
import {api} from '../../services/api';
import {notifySuccess, notifyError} from '../templates/notify';


export default function UserList(props) {

    const dados = props.data;

    const data = useSelector(state => state.userState.data);
    const modal = useSelector(state => state.modalState.modal);
    const dispatch = useDispatch();

    //console.log(category_list)

    useEffect(() => {
        dispatch({ type: 'LIST_USER', data: dados });
    }, [dados])

    function handleClick(e) {
        dispatch({ type: 'MODAL_SHOW', modal: true });
        dispatch({ type: 'EDIT_USER', user_id: '', username: '', email: '', isactive: true });
    }

    const handleEdit = r => {
        //console.log(r);
        const { user_id, username, email, isactive } = r;
        dispatch({ type: 'EDIT_USER', user_id: r.user_id, username: r.username, email: r.email, isactive: r.isactive });
        dispatch({ type: 'MODAL_SHOW', modal: true });
    }

    const handleDelete = r => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MDBCard>
                        <MDBCardBody>
                            <h5>Confirma exclusão do usuário?</h5>
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
            await trackPromise(api.delete(`/user/user_id/${r.user_id}`));
            dispatch({ type: 'DELETE_USER', user_id: r.user_id });
            notifySuccess('Usuário excluído!');
        } catch (error) {
            notifyError('Usuário não pôde ser excluído!');
        }
    }

    return (
        <>
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol sm="12">
                        <MDBBtn color="amber" onClick={handleClick}>Novo usuário</MDBBtn>
                        <TableContent
                            css="table table-striped"
                            fields={fields}
                            cols={columns}
                            rows={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            sortedby="username|asc"
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
