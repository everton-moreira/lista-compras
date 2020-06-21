import categories from "../../pages/categories";

const INITIAL_STATE = {
    modal: false,
    //data: [{category_id: 1, category_name: 'Teste 1', isactive: true},{category_id: 2, category_name: 'Teste 2', isactive: true}],
    data: [],
    categories: [],
    product_id: '',
    category_id: '',
    product_name: '',
    product_image: ''
}

export const productReducer = (state = INITIAL_STATE, action) => {
    var array = [...state.data];
    switch(action.type){
        case 'MODAL_SHOW':
            //console.log(action.modal)
            return {
                ...state,
                modal: action.modal
            }
        case 'LIST_PRODUCT':
            //console.log(action.categories)
            return {
                ...state,
                data: action.data,
                categories: action.categories,
            }
        case 'CREATE_PRODUCT':
            //console.log(action.data)
            return {...state, data: [...action.data]};
            
        case 'EDIT_PRODUCT':
            //console.log(action.modal)
            //console.log(action.category_id)
            return {
                ...state,
                category_id: action.category_id,
                product_id: action.product_id,
                product_name: action.product_name,
                product_image: action.product_image,
                categories: action.categories
            }
        case 'UPDATE_PRODUCT':
            //console.log(action.category_name)
            return {
                data: array.map(item => item.product_id === action.product_id ? {product_id: action.product_id, categories: {category_id: action.category_id, category_name: action.category_name}, product_name: action.product_name, product_image: action.product_image} : item),
                category_id: action.category_id,
                product_id: action.product_id,
                product_name: action.product_name,
                product_image: action.product_image,
                categories: action.categories
            }
        case 'DELETE_PRODUCT':
            //console.log(action.isactive)
            return {
                data: array.filter(item => {return item.product_id !== action.product_id}),
                categories: action.categories
            }
        default:
            return state;
    }
    
}