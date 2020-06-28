import React, {useEffect, useState} from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn} from 'mdbreact';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { useSelector } from 'react-redux';

import Header from '../../templates/header';
import {api} from '../../../services/api';
import {notifyError, notifySuccess} from '../../templates/notify';
import {getUser} from '../../../services/auth';
import TableContent from '../../templates/table/table_list';
import { fields, columns } from './table.share.config';

const hrStyle = {
    "border": "#FF8800 solid 2px"
}

export default function SharedList(props) {

    const _title = useSelector(state => state.shoppingListState.title);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState(_title);
    const id = props.match.params.id;
    const {sub} = getUser();
    const user_id = sub.user_id;
    //console.log(data);

    useEffect(() => {
        if (!title) {
            getData(id);
        }
    }, [title])

    useEffect(() => {
        if (data.length === 0) {
            getList(id);
        }else{

        }
    }, [data])

    const getData = async id => {
        try {
            const response = await trackPromise(api.get(`/list/${id}/${user_id}`));
            const dados = response.data[0];
            setTitle(dados.title);
        } catch (error) {
            notifyError('Erro ao carregar a lista!');
        }
    }

    const getList = async id => {
        try {
            const response = await trackPromise(api.get(`/list/shared/${id}/${user_id}`));
            const dados = response.data;
            setData(dados);
            //console.log(dados);
        } catch (error) {
            notifyError('Erro ao carregar a lista de usuários!');
        }
    }

    const handleEdit = async r => {
        //console.log(r);
        try {
            if(r.user_shared.length === 0) {
                const response = await trackPromise(api.post(`/list/share`, {shopping_list_id: id, user_id: r.user_id}));
                //console.log(response.data);
                let new_data = [...data];
                new_data = new_data.map(item => (item.user_id === response.data.user_id) ? 
                                                                                    {user_id: response.data.user_id, 
                                                                                    username: item.username,
                                                                                    isactive: item.isactive,
                                                                                    email: item.email,
                                                                                    user_shared: [response.data]} : item);
                //console.log(new_data);
                await setData(new_data);
                notifySuccess('Usuário adicionado!');
            }else{
                notifySuccess('Usuário já adicionado!');
            }
            
        } catch (error) {
            notifyError('Usuário não pôde ser adicionado!');
        }
        
    }

    const handleDelete = async r => {
        //console.log(r);
        try {
            //console.log(r.category_id);
            await trackPromise(api.delete(`/list/share/user_product_list_id/${r.user_shared[0].user_product_list_id}`));
            let new_data = [...data];
            new_data = new_data.map(item => (item.user_id === r.user_id) ? 
                                                    {user_id: r.user_id, 
                                                    username: r.username,
                                                    isactive: r.isactive,
                                                    email: r.email,
                                                    user_shared: []} : item);
            setData(new_data);
            notifySuccess('Usuário excluído!');
        } catch (error) {
            notifyError('Usuário não pôde ser retirado!');
        }
    }

    return (
        <>
            <Header lists />
            <MDBContainer>
                <MDBRow className="mt-3">
                    <MDBCol>
                        <h2 className="m-0 p-0">{title} <Link to="/lists" className="btn btn-sm btn-warning float-right">Voltar</Link> </h2>
                        <hr className="mt-1" style={hrStyle} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol sm="12">
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
                </MDBRow>
            </MDBContainer>
        </>
    )
}
