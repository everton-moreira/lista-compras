export const columns = [
    {
        name: 'Nome'
    },
    {
        name: 'E-mail'
    },
    {
        name: 'Ativo',
        align: 'center',
        width: '10%'
    },
    {
        name: '<i class="fa fa-pencil-alt"></i>',
        align: 'center',
        width: '10%'
    },
    {
        name: '<i class="fa fa-trash"></i>',
        align: 'center',
        width: '10%'
    },
];
export const fields = [
    
    {
        name: 'username'
    },
    {
        name: 'email'
    }, 
    {
        name: 'isactive',
        align: 'center',
        type: 'boolean'
    }, 
    {
        name: '__action',
        type: 'edit'
    }, 
    {
        name: '__action',
        type: 'delete'
    }
];