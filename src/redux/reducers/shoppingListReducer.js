const INITIAL_STATE = {
    modal: false,
    data: [],
    data_user: [],
    shopping_list_id: '',
    title: '',
    description: '',
    shopping_date: '',
    user_id: '',
    isactive: false
}

export const shoppingListReducer = (state = INITIAL_STATE, action) => {
    var array = [...state.data];
    switch(action.type){
        case 'MODAL_SHOW':
            //console.log(action.modal)
            return {
                ...state,
                modal: action.modal
            }
        case 'LIST_SHOPPING':
            //console.log(action.data)
            return {
                ...state,
                data: action.data
            }
        case 'LIST_USER_SHOPPING':
            //console.log(action.data)
            return {
                ...state,
                data_user: action.data_user
            }
        case 'CREATE_SHOPPING':
            //console.log(action.data)
            return {data: [...state.data, action.data]};
            
        case 'EDIT_SHOPPING':
            //console.log(action.modal)
            //console.log('action', action.title)
            return {
                ...state,
                shopping_list_id: action.shopping_list_id,
                title: action.title,
                description: action.description,
                shopping_date: action.shopping_date,
                user_id: action.user_id,
                isactive: action.isactive
            }
        case 'UPDATE_SHOPPING':
            //console.log(action.isactive)
            return {
                data: array.map(item => item.shopping_list_id === action.shopping_list_id ? {shopping_list_id: action.shopping_list_id, 
                                                                                            title: action.title,
                                                                                            description: action.description,
                                                                                            shopping_date: action.shopping_date,
                                                                                            user_id: action.user_id,
                                                                                            isactive: action.isactive} : item),
                shopping_list_id: action.shopping_list_id,
                title: action.title,
                description: action.description,
                shopping_date: action.shopping_date,
                user_id: action.user_id,
                isactive: action.isactive
            }
        case 'DELETE_SHOPPING':
            //console.log(action.isactive)
            return {
                data: array.filter(item => {return item.shopping_list_id !== action.shopping_list_id})
            }
        default:
            return state;
    }
    
}