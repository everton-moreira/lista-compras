const INITIAL_STATE = {
    modal: false,
    valid: false
}

export const modalReducer = (state = INITIAL_STATE, action) => {
    
    switch(action.type){
        case 'MODAL_SHOW':
            //console.log(action.modal)
            return {
                ...state,
                modal: action.modal
            }
        case 'MODAL_VALIDATE':
            //console.log(action.modal)
            return {
                ...state,
                valid: action.valid
            }
        default:
            return state;
    }
}