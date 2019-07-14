import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_PROFILE, LOGOUT, CLEAR_ITEM, RESET_PASSWORD_FAIL, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_FAIL } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utility/setAuthToken';
import { createProfile } from './profile';


//loading user to redux store
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }

}


//register new user
export const register = ({ firstname, lastname, username, email, password, phone, street, city, state, country, zipcode, gender, question1, question2, question3, answer1, answer2, answer3}, history) => async dispatch => {

    const user = { firstname, lastname, username, email, password }
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/users', JSON.stringify(user), config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }) //this dispatch is store only the token to redux with same reducer ("auth")
        dispatch(loadUser()); //call this dispatch again to store user to redux with same reducer ("auth")
        const profile = { phone, street, city, state, country, zipcode, gender, question1, question2, question3, answer1, answer2, answer3 };
        

        dispatch(createProfile(profile));
        history.push('/main');
    } catch (error) {
        console.error(error);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}



//update user (profile)
export const updateUserProfile = ({ firstname, lastname, username, email, phone, street, city, state, country, zipcode, gender, question1, question2, question3, answer1, answer2, answer3 }) => async dispatch => {

    const user = { firstname, lastname, username, email}
    console.log(user);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/users', JSON.stringify(user), config);
        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: res.data
        }) //this dispatch is store only the token to redux with same reducer ("auth")
        
        dispatch(loadUser()); //call this dispatch again to store user to redux with same reducer ("auth")
        console.log("cn u reach me")
        // const profile = { phone, street, city, state, country, zipcode, gender, question1, question2, question3, answer1, answer2, answer3 };
        
        // dispatch(createProfile(profile));

    } catch (error) {
        console.error(error);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: USER_PROFILE_UPDATE_FAIL
        })
    }
}



//log user in
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }

    try {
        const res = await axios.post('/api/login', { email, password }, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.filter(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//change password
export const changePassword = (oldPassword, password) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    try {
        const res = await axios.put('/api/users/password',{oldPassword, password}, config)
        const msg = res.data.errors[0].msg;
        dispatch(setAlert(msg, 'success'));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.filter(error => dispatch(setAlert(error.msg, 'danger')));
        }
        // dispatch({
        //     type: PASSWORD_CHANGE_FAIL
        // }) 
    }
}


//sending reset password link
export const resetPassword = (email) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    try {
        const res = await axios.post('/api/email/forgetpassword',{email}, config)
        const msg = res.data.errors[0].msg;
        dispatch(setAlert(msg, 'success'));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.filter(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: RESET_PASSWORD_FAIL
        }) 
    }
}

//reset password
export const resetPasswordById = (password, id, history) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    try {
        const res = await axios.put(`/api/users/password/${id}`,{password}, config)
        const msg = res.data.errors[0].msg;
        dispatch(setAlert(msg, 'success'));
        history.push('/login');
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.filter(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: RESET_PASSWORD_FAIL
        }) 
    }
}



//log out
export const logout = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: CLEAR_ITEM
    });
    dispatch({
        type: LOGOUT
    });
}