export const columns = [
    {
        name: '<i class="fa fa-image"></i>',
        align: 'center',
        width: '80px'
    },
    {
        name: 'Nome'
    },
    {
        name: 'Adicionado',
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
        name: 'product_image',
        type: 'image'
    },
    {
        name: 'product_name'
    },
    {
        name: 'products_list',
        type: 'exists'
    }, 
    {
        name: '__action',
        type: 'edit',
        text: 'Adicionar'
    }, 
    {
        name: '__action',
        type: 'delete',
        text: 'Retirar'
    }
];