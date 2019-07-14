import axios from 'axios';
import { setAlert } from './alert';
import { ITEM_CREATE_FAIL, ITEM_CREATE_SUCCESS, GET_ITEM_FAIL, GET_ALL_ITEM_SUCCESS, GET_AN_ITEM_SUCCESS, ITEM_UPDATED_SUCCESS, ITEM_UPDATED_FAIL, DELETE_AN_ITEM_FAIL, DELETE_AN_ITEM_SUCCESS } from './types';



export const createItem = (formData) => async dispatch => {
    const config = {
        headers : {'Content-Type': 'application/json'}
    }
    try {
        // console.log(axios.defaults.headers.common['auth-token']);
        const res = await axios.post('/api/item', formData, config);
        dispatch({
            type: ITEM_CREATE_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert("Item created", "success"));
    } catch (error) {
        // console.log(error.response);
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: ITEM_CREATE_FAIL
        })
    }
}

//update item by id
export const updateItem = (formData, _id, history) => async dispatch => {
    const config = {
        headers : {'Content-Type': 'application/json'}
    }
    try {
        const res = await axios.put(`/api/item/${_id}`, formData, config);
        dispatch({
            type: ITEM_UPDATED_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert("Item updated", "success"));
        history.push('/main');//use history to redirect back to "main". in Compoentn we use <Redirect> instead
    } catch (error) {
        console.log(error);
        console.log(error.response.data.errors);
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: ITEM_UPDATED_FAIL
        })
    }
}

//get all items from current logged in user
export const getItems = () => async dispatch => {
    try {
        const res = await axios.get('/api/item');
        dispatch({
            type: GET_ALL_ITEM_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: GET_ITEM_FAIL
        })
    }
}

//get a item by id
export const getItemById = (_id) => async dispatch => {
    try {
        const res = await axios.get(`/api/item/${_id}`);
        dispatch({
            type: GET_AN_ITEM_SUCCESS, 
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: GET_ITEM_FAIL
        })
    }
}

//delete an item by id
export const deleteItemById = (_id, history) => async dispatch =>{
    try {
        console.log(`/api/item${_id}`);
        const res = await axios.delete(`/api/item/${_id}`);
        dispatch({
            type: DELETE_AN_ITEM_SUCCESS,
            payload: res.data
        });
        
        dispatch(setAlert('Item removed', 'success'));
        history.push('/main');
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: DELETE_AN_ITEM_FAIL
        })
    }
}

