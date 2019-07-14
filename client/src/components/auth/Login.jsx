import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email : '',
        password: ''
    })

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = formData;
        login({email, password});
    }

    if (isAuthenticated){
        return <Redirect to="/main"/>
    }

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={e=> onSubmit(e)}>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" onChange={e=> onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" name="password" onChange={e=> onChange(e)} required/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account?
                    <Link to="register">Sign Up </Link>
                    <Link to="/recovery" className="forgetPassword"> Forget password</Link>
                </p>
            </section>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);
