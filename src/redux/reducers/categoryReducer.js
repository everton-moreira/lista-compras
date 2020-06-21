const INITIAL_STATE = {
    modal: false,
    //data: [{category_id: 1, category_name: 'Teste 1', isactive: true},{category_id: 2, category_name: 'Teste 2', isactive: true}],
    data: [],
    category_id: '',
    category_name: '',
    isactive: true
}

export const categoryReducer = (state = INITIAL_STATE, action) => {
    var array = [...state.data];
    switch(action.type){
        case 'MODAL_SHOW':
            //console.log(action.modal)
            return {
                ...state,
                modal: action.modal
            }
        case 'LIST_CATEGORY':
            //console.log(action.data)
            return {
                ...state,
                data: action.data
            }
        case 'CREATE_CATEGORY':
            //console.log(action.data)
            return {data: [...state.data, action.data]};
            
        case 'EDIT_CATEGORY':
            //console.log(action.modal)
            //console.log(action.category_id)
            return {
                ...state,
                category_id: action.category_id,
                category_name: action.category_name,
                isactive: action.isactive
            }
        case 'UPDATE_CATEGORY':
            //console.log(action.isactive)
            return {
                data: array.map(item => item.category_id === action.category_id ? {category_id: action.category_id, category_name: action.category_name, isactive: action.isactive} : item),
                category_id: action.category_id,
                category_name: action.category_name,
                isactive: action.isactive
            }
        case 'DELETE_CATEGORY':
            //console.log(action.isactive)
            return {
                data: array.filter(item => {return item.category_id !== action.category_id})
            }
        default:
            return state;
    }
    
}