import React, { Component } from 'react'
import { trackPromise } from 'react-promise-tracker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from '../templates/header'
import CategoryList from './category_list'
import {api} from '../../services/api';
import {notifyError} from '../templates/notify';
import {createCategory, listCategory} from '../../redux/actions/categoryAction';

class Categories extends Component {
   
    constructor() {
        super();
    
        this.state = {
          data: [],
        };
    
        this.loadTable = this.loadTable.bind(this);
    }
    componentWillMount(){
        this.loadTable();
    }
    
    loadTable = async e =>{
        try {
            
            const response = await trackPromise(api.get("/category"));
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
                <Header categories />
                <CategoryList data={this.state.data} />
            </>
        )
    }
}

const mapStateToProps = store => ({
    data: store.categoryState.data
});

const mapDispatchToProps = dispatch => bindActionCreators({listCategory}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
