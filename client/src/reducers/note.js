import {CREATE_NOTE_FAIL, CREATE_NOTE_SUCCESS, CLEAR_NOTE, GET_ALL_NOTE_SUCCESS, GET_ALL_NOTE_FAIL, GET_A_NOTE_FAIL, GET_A_NOTE_SUCCESS, DELETE_A_NOTE_SUCCESS, DELETE_A_NOTE_FAIL} from '../actions/types';

const initialState = {
    notes: [],
    loading: true,
    error : {}
}


export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case CREATE_NOTE_SUCCESS:  
        case GET_ALL_NOTE_SUCCESS:
        case GET_A_NOTE_SUCCESS:
        case DELETE_A_NOTE_SUCCESS:
            return {
                ...state,
                notes : payload,
                loading: false
            }
        case CREATE_NOTE_FAIL :
        case GET_ALL_NOTE_FAIL:
        case GET_A_NOTE_FAIL:
        case DELETE_A_NOTE_FAIL:
            return {
                ...state, 
                loading: false,
                error: payload
            }
        case CLEAR_NOTE:
            return {
                ...state,
                notes: [],
                loading: false
            }
        default:
            return state
    }
}
