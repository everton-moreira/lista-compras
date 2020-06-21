import React, { Component } from 'react'
import { trackPromise } from 'react-promise-tracker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from '../templates/header'
import ProductList from './product_list'
import {api} from '../../services/api';
import {notifyError} from '../templates/notify';
import {listProduct} from '../../redux/actions/productAction';

class Products extends Component {
   
    constructor() {
        super();
    
        this.state = {
          data: [],
          categories: []
        };
    
        this.loadTable = this.loadTable.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
    }
    componentWillMount(){
        this.loadTable();
        this.loadCategories();
    }

    componentDidMount(){
    }

    
    
    loadCategories = async e =>{
        try {
            
            const response = await api.get("/category");
            this.setState({
                categories: response.data
            })
          
        } catch (error) {
            notifyError('Erro ao carregar a lista de categorias!');
        }
    }
    
    loadTable = async e =>{
        try {
            
            const response = await trackPromise(api.get("/product/categories"));
            this.setState({
                data: response.data
            })
            //console.log(response.data)
          
        } catch (error) {
            notifyError('Erro ao carregar a lista!');
        }
    }

    render() {
        return (
            <>
                <Header products />
                <ProductList data={this.state.data} categories={this.state.categories} />
            </>
        )
    }
}

const mapStateToProps = store => ({
    data: store.productState.data,
    categories: store.productState.categories,
});

const mapDispatchToProps = dispatch => bindActionCreators({listProduct}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Products);
