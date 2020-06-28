import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';

import Header from '../templates/header';
import Tabs from './tabs';
import {api} from '../../services/api';
import {notifyError} from '../templates/notify';
import {getUser} from '../../services/auth';

export default class Lists extends Component {
    constructor() {
        super();
    
        this.state = {
          data: [],
        };
    
        this.loadTable = this.loadTable.bind(this);
    }

    componentWillMount()
    {
        this.loadTable();
    }

    loadTable = async e =>{
        try {
            const {sub} = getUser();
            const response = await trackPromise(api.get(`/list/${sub.user_id}`));
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
                <Header lists />
                <Tabs data={this.state.data} data_user={this.state.shares} />
            </>
        )
    }
}
