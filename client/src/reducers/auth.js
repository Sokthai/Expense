import {REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, RESET_PASSWORD_FAIL, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_FAIL} from '../actions/types';

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null
};

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case USER_LOADED:
            return {
                ...state,  //this state is the token
                user: payload,  //this payload is the user
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_SUCCESS:
        case USER_PROFILE_UPDATE_SUCCESS:
        case LOGIN_SUCCESS:
            
            (payload.token && localStorage.setItem("token", payload.token));
            return {
                ...state,  //this state is the user
                ...payload, //this payload is the token
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case RESET_PASSWORD_FAIL:
        case USER_PROFILE_UPDATE_FAIL:
            localStorage.removeItem("token");
            return {
                // ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}