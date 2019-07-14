import React from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';


function Landing({isAuthenticated}) {


    if (isAuthenticated){
        return <Redirect to="/main"/>
    }
    return (
        <div className="welcomePage">
            <h2>Welcome to PP Expense</h2>
            <h5>Please log in or sign up to continue</h5>
        </div>
    )
}

Landing.propTypes = {
    isAuthenticated : PropTypes.bool.isRequired,
}


const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
