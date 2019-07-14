import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import item from './item';
import note from './note';
import password from './password';

export default combineReducers({
    alert, auth, profile, item, note, password
})