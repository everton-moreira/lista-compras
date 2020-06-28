export const columns = [
    {
        name: 'Usuário'
    },
    {
        name: 'E-mail'
    },
    {
        name: 'Compartilhado',
        align: 'center',
        width: '10%'
    },
    {
        name: '<i class="fa fa-plus"></i>',
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
        name: 'user_shared',
        type: 'exists'
    }, 
    {
        name: '__action',
        type: 'edit',
        text: '<i class="fa fa-share-alt"></i>',
    }, 
    {
        name: '__action',
        type: 'delete',
        text: 'Retirar'
    }
];