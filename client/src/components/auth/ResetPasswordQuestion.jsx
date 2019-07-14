import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getProfileById} from '../../actions/profile';
import {validateResetLink} from '../../actions/password';
import {setAlert} from '../../actions/alert';
import { withRouter } from 'react-router-dom'; //the "withRouter" wil have the "history" object we need to pass to updateItem in action. read more in updateItem in action
import Spinner from '../layout/Spinner';



function ResetPasswordQuestoin({match, profile :{ loading, profile} , getProfileById, setAlert, history, validateResetLink, password}) {

    const [formData, setFormData] = useState({
        question1: 'af',
        question2: '',
        question3: '',
        answer1: '',
        answer2: '',
        answer3: '',
    });
    const [valid, setValid] = useState(false);

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});


    useEffect(() => {
        
        validateResetLink(match.params.id);
        setValid({
            valid: !password? false: password.valid
        });
        getProfileById(match.params.id);

        setFormData({
            question1: (loading || !profile.question)? '' : profile.question.question1,
            question2: (loading || !profile.question)? '' : profile.question.question2,
            question3: (loading || !profile.question)? '' : profile.question.question3,
            answer1 : (loading || !profile.answer)? '' : profile.answer.answer1,
            answer2 : (loading || !profile.answer)? '' : profile.answer.answer2,
            answer3 : (loading || !profile.answer)? '' : profile.answer.answer3,
        })
    }, [getProfileById, match.params.id, loading])
    
    const {question1, question2, question3, answer1, answer2, answer3} = formData;
    // const {valid} = valid;
    const onSubmit = (e) =>{
        e.preventDefault();
        if (answer1 !== profile.answer.answer1 || answer2 !== profile.answer.answer2 || answer3 !== profile.answer.answer3){
            setAlert("Incorrect answers", "danger");
        }else{
            history.push(`/newpassword/${match.params.id}`)
            // return <Redirect to="/resetpassword" /> //does not work when inside form submission 
        }
    }

console.log(valid);
// console.log(new Date());
(valid && valid.valid && console.log(new Date(valid.valid.expireDate) > new Date()))
    // if(!valid.valid || valid.expireDate > now()){
    //     return <p>sorry, the link is expired</p>
    // }
    if (valid){
        if (!valid.valid || (new Date(valid.valid.expireDate) <= new Date)){
            return <p className="alert alert-danger">Sorry, the link is expired</p>
        }
    }
    

    return (
       
        <Fragment>
            {loading? <Spinner/> : 
       
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="question1" value={question1} onChange={e => onChange(e)} disabled required>
                        <option value="">--select a question---</option>
                        <option value="What is your favorite color">What is your favorite color</option>
                        <option value="What is your pet name">What is your pet name</option>
                        <option value="What brand is your first car">What brand is your first car</option>
                    </select>
                </div>

                <div className="form-group" required>
                    <input type="text" placeholder="" name="answer1"  onChange={e => onChange(e)} required/>
                </div>

                    
                <div className="form-group">
                    <select name="question2" value={question2} onChange={e => onChange(e)} disabled required>
                        <option value="">--select a question---</option>
                        <option value="What is your pet name">What is your pet name</option>
                        <option value="What is your favorite color">What is your favorite color</option>
                        <option value="What brand is your first car">What brand is your first car</option>
                    </select>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="" name="answer2" onChange={e => onChange(e)} required/>
                </div>

                <div className="form-group">
                    <select name="question3" value={question3} onChange={e => onChange(e)} disabled required>
                        <option value="">--select a question---</option>
                        <option value="What brand is your first car">What brand is your first car</option>
                        <option value="What is your favorite color">What is your favorite color</option>
                        <option value="What is your pet name">What is your pet name</option>
                    </select>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="" name="answer3"  onChange={e => onChange(e)} required/>
                </div>

                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
            }
        </Fragment>
    )
}

ResetPasswordQuestoin.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    validateResetLink: PropTypes.func.isRequired,
    password: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile : state.profile,
    password: state.password
})

export default connect(mapStateToProps, {getProfileById, setAlert, validateResetLink})(withRouter(ResetPasswordQuestoin))

