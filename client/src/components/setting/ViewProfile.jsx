import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import ProfileForm from '../auth/Form';
import {getProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import {updateUserProfile} from '../../actions/auth';

function ViewProfile({profiles : {profile, loading}, getProfile, updateUserProfile}) {


    const [formData, setFormData] = useState({
        firstname : '',
        lastname : '',
        username: '',
        email: '',
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

    const onChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(formData);
    }

    useEffect(() => {
        getProfile();
        
        setFormData({
            firstname: (loading || !profile)? '' : profile.user.firstname,
            lastname: (loading || !profile)? '' : profile.user.lastname,
            username: (loading || !profile)? '' : profile.user.username,
            email: (loading || !profile)? '' : profile.user.email,
            phone: (loading || !profile)? '' : profile.phone,
            street: (loading || !profile)? '' : profile.street,
            city: (loading || !profile)? '' : profile.city,
            state: (loading || !profile)? '' : profile.state,
            country: (loading || !profile)? '' : profile.country,
            zipcode: (loading || !profile)? '' : profile.zipcode,
            gender: (loading || !profile)? '' : profile.gender,
            question1: (loading || !profile)? '' : profile.question.question1,
            question2: (loading || !profile)? '' : profile.question.question2,
            question3: (loading || !profile)? '' : profile.question.question3,
            answer1: (loading || !profile)? '' : profile.answer.answer1,
            answer2: (loading || !profile)? '' : profile.answer.answer2,
            answer3: (loading || !profile)? '' : profile.answer.answer3,
        })
        
    }, [getProfile, loading]);

 
    return (
        <Fragment>
            <p style={{color: 'red'}}>Please refresh if nothin is loaded</p>
            { loading? <Spinner/> : <ProfileForm value={formData} onChange={onChange} onSubmit={onSubmit} title="Update Profile"/> }
        </Fragment>
    )
}

ViewProfile.propTypes = {
    profiles: PropTypes.object.isRequired,
    getProfile : PropTypes.func.isRequired,
    updateUserProfile : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profiles: state.profile
})

export default connect(mapStateToProps, {getProfile, updateUserProfile})(ViewProfile);

