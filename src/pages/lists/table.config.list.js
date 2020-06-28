import {baseURL} from '../../services/api';

export const columns = [
    {
        name: 'Título',
        width: '15%'
    },
    {
        name: 'Descrição'
    },
    {
        name: 'Compra feita?',
        align: 'center',
        width: '20%'
    },
    {
        name: '<i class="fa fa-search"></i>',
        align: 'center',
        width: '5%'
    },
    {
        name: '<i class="fa fa-share-alt"></i>',
        align: 'center',
        width: '5%'
    },
    {
        name: '<i class="fa fa-pencil-alt"></i>',
        align: 'center',
        width: '5%'
    },
    {
        name: '<i class="fa fa-trash"></i>',
        align: 'center',
        width: '5%'
    },
];
export const fields = [
    
    {
        name: 'title',
    },
    {
        name: 'description',
    },
    {
        name: 'isactive',
        type: 'boolean'
    },
    {
        name: '__action',
        type: 'details',
        text: 'Itens',
        link: '/lists/details'
    },
    {
        name: '__action',
        type: 'details',
        text: '<i class="fa fa-share-alt"></i>',
        link: '/lists/share'
    }, 
    {
        name: '__action',
        type: 'edit',
        text: '<i class="fa fa-pencil-alt"></i>'
    }, 
    {
        name: '__action',
        type: 'delete',
        text: '<i class="fa fa-trash"></i>'
    }
];