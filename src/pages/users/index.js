import React, { Component } from 'react'
import { trackPromise } from 'react-promise-tracker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from '../templates/header';
import UserList from './user_list';
import {api} from '../../services/api';
import {notifyError} from '../templates/notify';
import {listUser} from '../../redux/actions/userAction';

class Users extends Component {
   
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

    componentDidMount(){
    }
    
    loadTable = async e =>{
        try {
            
            const response = await trackPromise(api.get("/user"));
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
                <Header users />
                <UserList data={this.state.data} />
            </>
        )
    }
}

const mapStateToProps = store => ({
    data: store.userState.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({listUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
