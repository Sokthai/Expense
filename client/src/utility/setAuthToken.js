import axios from 'axios';
 //need to set this function at app.js since we need to always check if user is login or not
export default function(token){
    if (token){
        axios.defaults.headers.common['auth-token'] = token;
    }else{
        delete axios.defaults.headers.common['auth-token'];
    }
}