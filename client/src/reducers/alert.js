import {SET_ALERT, REMOVE_ALERT} from '../actions/types';

const initialState = []; //because we may have multiple of alert in the array

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case SET_ALERT:
            return [...state, payload]; //payload here will be an object of all info
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload)// payload here just only the id
        default:
            return state;
    }
}

