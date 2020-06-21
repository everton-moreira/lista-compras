export const columns = [
    {
        name: '<i class="fa fa-image"></i>',
        align: 'center',
        width: '80px'
    },
    {
        name: 'Categoria',
        width: '15%'
    },
    {
        name: 'Nome'
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
        name: 'product_image',
        type: 'image'
    },
    {
        name: 'categories',
        child_node: 'category_name',
        type: 'nested'
    },
    {
        name: 'product_name'
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