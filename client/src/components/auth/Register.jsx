import React, {Fragment, useState} from 'react';
import Form from './Form';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import {withRouter} from 'react-router-dom';

function Register({setAlert, register, history}){
    const [formData, setFormData] = useState({
        firstname : '',
        lastname : '',
        username: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        street : '',
        city : '',
        state : '',
        country: '',
        zipcode : '',
        gender :'',
        question1 : '',
        question2 : '',
        question3 : '',
        answer1 : '',
        answer2 : '',
        answer3 : ''
    })
    
    const {firstname, lastname, username, email, password, password2, phone, street, city, state, country, zipcode, gender, question1, question2, question3, answer1, answer2, answer3} = formData;
    const onChange = (e) => {setFormData({...formData, [e.target.name] : e.target.value})};
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== password2){
            setAlert("Password is not match", "danger");
        }else{
            const user = {firstname, lastname, username, email, password, phone, street, city, state, country, zipcode, gender, question1, question2, question3, answer1, answer2, answer3};
            register(user, history);
        }


    }

    return (
        <Fragment>
            <Form onChange={onChange} onSubmit={(e) => onSubmit(e)} value={formData} title='Sign Up'/>
        </Fragment>
    )
}


Register.propTypes = {
    setAlert : PropTypes.func.isRequired,
    register :PropTypes.func.isRequired,
}


export default connect(null, {setAlert, register})(withRouter(Register));


