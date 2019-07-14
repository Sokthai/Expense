import React, {useState}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {changePassword} from '../../actions/auth';

function ChangePassword({setAlert, changePassword}) {
    
    const [formData, setFormData] = useState({
        oldPassword : '',
        password : '',
        password2 : ''
    })

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});
    const {oldPassword, password, password2} = formData;

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2){
            setAlert("New password do not match", "danger");
        }else{
            changePassword(oldPassword, password);
        }

    }
    
    return (
        <form className="form" onSubmit={ (e) => onSubmit(e)}>
            <div>
                <div className="form-group">
                    <input type="password" placeholder="Old Password" name="oldPassword" minLength="6" value={oldPassword} onChange={ (e) => onChange(e)} autoComplete="on" required/>
                </div>

                <div className="form-group">
                    <input type="password" placeholder="New Password" name="password" minLength="6" value={password} onChange={ (e) => onChange(e)} autoComplete="on" required/>
                </div>
            </div>

            <div className="form-group">
                <input type="password" placeholder="Confirm Password" name="password2" minLength="6" value={password2} onChange={ (e) => onChange(e)} autoComplete="on" required/>
            </div>
            <input type="submit" className="btn btn-primary" value="Submit" />
        </form>

    )
}

ChangePassword.propTypes = {
    setAlert : PropTypes.func.isRequired,
    changePassword : PropTypes.func.isRequired,
}

export default connect(null, {setAlert, changePassword})(ChangePassword)

