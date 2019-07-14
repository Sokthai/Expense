import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux';
import {resetPassword} from '../../actions/auth';
import PropTypes from 'prop-types';

function Recovery({resetPassword}) {


    const [email, setEmail] = useState('');
    const onChange = (e) => setEmail(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        // const {email} = email;
        resetPassword(email);
    }

    return (
        <Fragment>
        <section className="container">
            <h1 className="large text-primary">Recovery your password</h1>
            <p className="lead"><i className="fas fa-user"></i> Please enter your email</p>
            <form className="form" onSubmit={e=> onSubmit(e)}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=> onChange(e)} required />
                </div>
                <input type="submit" className="btn btn-primary" value="Send" />
            </form>
        </section>
    </Fragment>
    )
}

Recovery.propTypes = {
    resetPassword: PropTypes.func.isRequired,
}

export default connect(null, {resetPassword})(Recovery);

