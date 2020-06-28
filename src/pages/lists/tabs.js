import React, { useState, useEffect } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { trackPromise } from 'react-promise-tracker';
import { Redirect } from 'react-router-dom';

import TableContent from '../templates/table/table_list';
import { fields, columns } from './table.config.list';
import {api} from '../../services/api';
import {notifySuccess, notifyError} from '../templates/notify';
import Modal from './list.modal';


const hrStyle = {
    "border": "#FF8800 solid 2px"
}
export default function Tabs(props) {

    const dados = props.data;

    const [redirectLink, setRedirectLink] = useState(false);
    const [url, setUrl] = useState('');
    const [activeItem, setActiveItem] = useState('1');
    const data = useSelector(state => state.shoppingListState.data);
    const modal = useSelector(state => state.modalState.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'LIST_SHOPPING', data: dados });
    }, [dados])

    const toggle = tab => e => {
        if (activeItem !== tab) {
            setActiveItem(tab);
        }
    };

    function handleClick(e) {
        
        dispatch({ type: 'MODAL_SHOW', modal: true });
        dispatch({ type: 'EDIT_SHOPPING',   shopping_list_id: '',
                                            title: '',
                                            description: '',
                                            shopping_date: '',
                                            user_id: '',
                                            isactive: false
                                            });
    }

    const handleEdit = r => {
        //console.log(r);
        const { shopping_list_id, title, description, shopping_date, user_id, isactive } = r;
        dispatch({ type: 'EDIT_SHOPPING', shopping_list_id, title, description, shopping_date, user_id, isactive });
        dispatch({ type: 'MODAL_SHOW', modal: true });
    }

    const handleDelete = r => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MDBCard>
                        <MDBCardBody>
                            <h5>Confirma exclusão do item?</h5>
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
            await trackPromise(api.delete(`/list/shopping_list_id/${r.shopping_list_id}`));
            dispatch({ type: 'DELETE_SHOPPING', shopping_list_id: r.shopping_list_id });
            notifySuccess('Lista excluída!');
        } catch (error) {
            notifyError('Lista não pôde ser excluída!');
        }
    }

    const handleDetails = (r, link) => {
        //console.log(r, link);
        const { shopping_list_id, title, description, shopping_date, user_id, isactive } = r;
        dispatch({ type: 'EDIT_SHOPPING', shopping_list_id, title, description, shopping_date, user_id, isactive });
        let url = `${link}/${r.shopping_list_id}`;
        setUrl(url);
        setRedirectLink(true);
        //console.log(url);
        
    }

    return (
        <>
        {redirectLink && <Redirect to={url} />}
        <MDBContainer>
            <MDBRow className="mt-3">
                <MDBCol>
                    <h2 className="m-0 p-0">Listas de compras</h2>
                    <hr className="mt-1" style={hrStyle} />
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                <MDBBtn color="amber" onClick={handleClick}>Nova lista</MDBBtn>
                    <TableContent
                        css="table table-striped"
                        fields={fields}
                        cols={columns}
                        rows={data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleDetails={handleDetails}
                    />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        <Modal show={modal} />
        </>
    );
}
