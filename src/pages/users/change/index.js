import React, { Component } from 'react'
import { trackPromise } from 'react-promise-tracker';

import Header from '../../templates/header';
import {api} from '../../../services/api';
import {notifyError} from '../../templates/notify';
import {getUser} from '../../../services/auth';
import Form from './form';

export default class ChangeUser extends Component {
   
    constructor() {
        super();
    
        this.state = {
          data: [],
        };
    
        this.loadUser = this.loadUser.bind(this);

        
    }
    componentWillMount(){
        const {sub} = getUser();
        const user_id = sub.user_id;
        this.loadUser(user_id);
    }

    componentDidMount(){
    }
    
    loadUser = async id =>{
        try {
            //console.log(id);
            const response = await trackPromise(api.get(`/user/user_id/${id}`));
            this.setState({
                data: response.data
            })
            //console.log(response.data);
          
        } catch (error) {
            notifyError('Erro ao carregar a lista!');
        }
    }

    render() {
        return (
            <>
                <Header users />
                <Form dados={this.state.data} />
            </>
        )
    }
}
