import React from 'react'
import PropTypes from 'prop-types'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

function Button({title, className, link, isAuthenticated}) {

    if(!isAuthenticated){
        return <Redirect to="/" />
    }

    return (
        <Link to={link} className={`btn btn-${className}`}>{title}</Link>
    )
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}




const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Button);

