export const columns = [
    {
        name: 'Nome'
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
        name: 'category_name'
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