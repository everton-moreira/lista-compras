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
import { fields, columns } from './table.details.config';

const hrStyle = {
    "border": "#FF8800 solid 2px"
}

export default function DetailsList(props) {

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
            const response = await trackPromise(api.get(`/list/details/${id}`));
            const dados = response.data;
            setData(dados);
        } catch (error) {
            notifyError('Erro ao carregar a lista de produtos!');
        }
    }

    const handleEdit = async r => {
        //console.log(r);
        //const { product_id, product_name, product_image } = r;
        try {
            //console.log(r.products_list.length);
            if(r.products_list.length === 0) {
                const response = await trackPromise(api.post(`/product_list`, {shopping_list_id: id, product_id: r.product_id, user_id: sub.user_id}));
                //console.log(response.data.products_list);
                let new_data = [...data];
                new_data = new_data.map(item => item.product_id === response.data.product_id ? {product_id: response.data.product_id, 
                                                                                    product_name: response.data.product_name,
                                                                                    product_image: response.data.product_image,
                                                                                    products_list: response.data.products_list} : item);
                //console.log(new_data);
                await setData(new_data);
                notifySuccess('Produto adicionado!');
            }else{
                notifySuccess('Produto já adicionado!');
            }
            
        } catch (error) {
            notifyError('Produto não pôde ser adicionado!');
        }
        
    }

    const handleDelete = async r => {
        //console.log(r.products_list.product_list_id);
        try {
            //console.log(r.category_id);
            await trackPromise(api.delete(`/product_list/product_list_id/${r.products_list[0].product_list_id}`));
            //dispatch({ type: 'DELETE_PRODUCT', product_id: r.product_id, categories: category_list });
            let new_data = [...data];
            new_data = new_data.map(item => item.product_id === r.product_id ? {product_id: r.product_id, 
                                                                                product_name: r.product_name,
                                                                                product_image: r.product_image,
                                                                                products_list: []} : item);
            setData(new_data);
            notifySuccess('Produto excluído!');
        } catch (error) {
            notifyError('Produto não pôde ser retirado!');
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
                            sortedby="product_name|asc"
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}
