import {RESET_LINK_INVALID, RESET_LINK_VALID} from '../actions/types';


const initialState = {
    valid: false
}

export default function (state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case RESET_LINK_VALID:
            return{
                ...state,
                valid: payload
            }
        case RESET_LINK_INVALID:
            return{
                ...state,
                valid: false
            }
        default:
            return state
    }
}