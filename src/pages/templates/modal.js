import React from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import {useSelector, useDispatch} from 'react-redux';

export default function ModalTemplate(props) {

    const modal = useSelector(state => state.modalState.modal);
    const dispatch = useDispatch();
    
    function toggle(show) {
        dispatch({type: 'MODAL_SHOW', modal: !show});
    }
    return (
        <MDBContainer>

            <MDBModal isOpen={modal} toggle={() => toggle(modal)} size="lg">
                <MDBModalHeader toggle={() => toggle(modal)}>{props.title}</MDBModalHeader>
                <MDBModalBody>
                    {props.children}
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
    )
}
