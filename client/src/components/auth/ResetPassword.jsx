import React, {useState}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {resetPasswordById} from '../../actions/auth';
import { withRouter } from 'react-router-dom'; //the "withRouter" wil have the "history" object we need to pass to updateItem in action. read more in updateItem in action


function ResetPassword({setAlert, resetPasswordById, match, history}) {
    
    const [formData, setFormData] = useState({
        password : '',
        password2 : ''
    })

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});
    const {password, password2} = formData;

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2){
            setAlert("Password do not match", "danger");
        }else{
            resetPasswordById(password, match.params.id, history);
        }

    }
    
    return (
        <form className="form" onSubmit={ (e) => onSubmit(e)}>
            <div>
                <div className="form-group">
                    <input type="password" placeholder="New Password" name="password" minLength="6" value={password} onChange={ (e) => onChange(e)} autoComplete="on" required/>
                </div>
            </div>

            <div className="form-group">
                <input type="password" placeholder="Confirm Password" name="password2" minLength="6" value={password2} onChange={ (e) => onChange(e)} autoComplete="on" required/>
            </div>

            <input type="submit" className="btn btn-primary" value="Reset" />
        </form>

    )
}

ResetPassword.propTypes = {
    setAlert : PropTypes.func.isRequired,
    resetPasswordById: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
}

export default connect(null, {setAlert, resetPasswordById})(withRouter(ResetPassword))

