const INITIAL_STATE = {
    modal: false,
    //data: [{category_id: 1, category_name: 'Teste 1', isactive: true},{category_id: 2, category_name: 'Teste 2', isactive: true}],
    data: [],
    user_id: '',
    email: '',
    username: '',
    isactive: true
}

export const userReducer = (state = INITIAL_STATE, action) => {
    var array = [...state.data];
    switch(action.type){
        case 'MODAL_SHOW':
            //console.log(action.modal)
            return {
                ...state,
                modal: action.modal
            }
        case 'LIST_USER':
            //console.log(action.categories)
            return {
                ...state,
                data: action.data,
            }
        case 'CREATE_USER':
            //console.log(action.data)
            return {...state, data: [...state.data, action.data]};
            
        case 'EDIT_USER':
            //console.log(action.modal)
            //console.log(action.category_id)
            return {
                ...state,
                user_id: action.user_id,
                email: action.email,
                username: action.username,
                isactive: action.isactive
            }
        case 'UPDATE_USER':
            //console.log(action.category_name)
            return {
                data: array.map(item => item.user_id === action.user_id ? {user_id: action.user_id, username: action.username, email: action.email, isactive: action.isactive} : item),
                user_id: action.user_id,
                email: action.email,
                username: action.username,
                isactive: action.username
            }
        case 'DELETE_USER':
            //console.log(action.isactive)
            return {
                data: array.filter(item => {return item.user_id !== action.user_id}),
            }
        default:
            return state;
    }
    
}