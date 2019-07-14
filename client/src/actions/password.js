import { RESET_LINK_INVALID, RESET_LINK_VALID } from './types';
import axios from 'axios';
import {setAlert} from './alert';


//validate the reset link 
export const validateResetLink = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/password/${id}`);
        dispatch({
            type: RESET_LINK_VALID,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: RESET_LINK_INVALID
        })
    }
}