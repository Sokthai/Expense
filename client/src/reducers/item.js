import {ITEM_CREATE_FAIL, ITEM_CREATE_SUCCESS, GET_ALL_ITEM_SUCCESS, GET_AN_ITEM_SUCCESS, ITEM_UPDATED_FAIL, ITEM_UPDATED_SUCCESS, DELETE_AN_ITEM_FAIL, CLEAR_ITEM} from '../actions/types';

const initialState = {
    spending: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case ITEM_CREATE_SUCCESS:
        case GET_ALL_ITEM_SUCCESS:
        case GET_AN_ITEM_SUCCESS:
        case ITEM_UPDATED_SUCCESS:
            return {
                ...state,
                loading: false,
                spending : payload,
            }
        case ITEM_CREATE_FAIL:
        case ITEM_UPDATED_FAIL:
        case DELETE_AN_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case CLEAR_ITEM:
            return {
                ...state,
                spending: [],
                loading: false
            }
        default: 
            return state
    }
}