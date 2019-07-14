import { GET_PROFILE, PROFILE_ERROR } from './types';
import axios from 'axios';
import { setAlert } from './alert';



//create profile or udpate profile
export const createProfile = (formData, edit = false) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const { phone, street, city, state, country, zipcode, gender, question1, question2, question3, answer1, answer2, answer3 } = formData;

        const bodyProfile = {phone, gender, street, city, state, country, zipcode, question1, question2, question3, answer1, answer2, answer3};
        // const bodyUser = {firstname, lastname, username, email};
        const resProfile = await axios.post('/api/profile', bodyProfile, config);
        // const resUser = await axios.put('/api/user', bodyUser, config);


        dispatch({
            type: GET_PROFILE,
            payload: resProfile.data
        });
        // dispatch({
        //     type: USER_LOADED,
        //     payload: resUser.data
        // }); 

        dispatch(setAlert(edit ? "Profile updated" : "Profile Created", "success"));

    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }

        dispatch({
            type: PROFILE_ERROR
        })
    }
}


//get current profile 
export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/user');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR
        })
    }
}


//get a profile by id (public)
export const getProfileById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/reset/${id}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR
        })
    }
}




