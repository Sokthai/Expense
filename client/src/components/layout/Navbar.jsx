import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  const authLinks = (
   
      <ul>
        <li>
          <Link to='/setting'>Setting</Link>
        </li>
        <li>
          <Link to='/create'>New Item</Link>
        </li>
        <li>
          <Link to='/main'>
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'>Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
    
  );

  const guestLinks = (
    <Fragment>
      <h3>PP Expense</h3>
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
    </Fragment>
  );

  return (
    <nav className='navbar bg-dark'>
      
      {!loading && (
        <Fragment>{isAuthenticated ? 
          <Fragment>
            <h4>{user && user.firstname.toUpperCase()}</h4>
            {authLinks }
          </Fragment>
          :
          guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps,{ logout })(Navbar);
