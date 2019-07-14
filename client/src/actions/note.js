import {CREATE_NOTE_FAIL, CREATE_NOTE_SUCCESS, GET_ALL_NOTE_SUCCESS, GET_ALL_NOTE_FAIL, GET_A_NOTE_FAIL, GET_A_NOTE_SUCCESS, UPDATE_NOTE_FAIL, UPDATE_NOTE_SUCCESS, DELETE_A_NOTE_SUCCESS, DELETE_A_NOTE_FAIL} from './types';
import axios from 'axios';
import {setAlert} from './alert';



//create new note
export const createNotes = (formData) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }

    try {
        const res = await axios.post('/api/note', formData, config);
        dispatch({
            type: CREATE_NOTE_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert("Note Created", "success"));
    } catch (error) {
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: CREATE_NOTE_FAIL
        })
    }
}

//get all notes
export const getNotes = () => async dispatch => {
    try {
        const res = await axios.get('/api/note');
        dispatch({
            type: GET_ALL_NOTE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: GET_ALL_NOTE_FAIL
        })
    }
}


//get a note by id
export const getNoteById = (_id) => async dispatch => {
    try {
        const res = await axios.get(`/api/note/${_id}`);
        dispatch({
            type: GET_A_NOTE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: GET_A_NOTE_FAIL
        })
    }
}


//update note by id
export const updateNoteById = (formData, _id) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    try {
        const res = await axios.put(`/api/note/${_id}`, formData, config);
        dispatch({
            type: UPDATE_NOTE_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert("Note udpated", "success"));
    } catch (error) {
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: UPDATE_NOTE_FAIL
        })
    }
}


//delete a note by id
export const deleteNoteById = (_id, history) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    try {
        const res = await axios.delete(`/api/note/${_id}`);
        dispatch({
            type: DELETE_A_NOTE_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert("Note deleted", "success"));
        history.push('/viewmynote');//use history to redirect back to "main". in Compoentn we use <Redirect> instead

    } catch (error) {
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: DELETE_A_NOTE_FAIL
        })
    }
}
