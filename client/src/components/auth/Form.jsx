import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';


export default function Form(props){
    const {firstname, lastname, username, email, password, password2, phone, street, city, state, country, zipcode, gender, question1, question2, question3, answer1, answer2, answer3} = props.value;
    const register = (  
        <div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" minLength="6" value={password} onChange={e => props.onChange(e)} autoComplete="on" required/>
          </div>
    
          <div className="form-group">
            <input type="password" placeholder="Confirm Password" name="password2" minLength="6" value={password2} onChange={e => props.onChange(e)} autoComplete="on" required/>
          </div>
        </div>
    )


    return (
        <Fragment>
            <h1 className="large text-primary">{props.title}</h1>
            <p className="lead"><i className="fas fa-user"></i></p>
            <form className="form" onSubmit={e => props.onSubmit(e)}>
                                
                <div className="form-group">
                    <input type="text" placeholder="First Name" name="firstname" value={firstname} onChange={e => props.onChange(e)} required />
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Last Name" name="lastname" value={lastname} onChange={e => props.onChange(e)} required />
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Username" name="username" value={username} onChange={e => props.onChange(e)} required />
                </div>
                
                <div className="form-group">
                    {props.title === "Sign Up"? 
                    <input type="email" placeholder="Email" name="email" value={email} onChange={e => props.onChange(e)} required/>
                    :
                    <input type="email" placeholder="Email" name="email" value={email} onChange={e => props.onChange(e)} disabled required/>
                    }
                </div>

                {(props.title === "Sign Up")? register : ""}
            

                <div className="form-group">
                    <input type="number" placeholder="Phone" name="phone" value={phone} onChange={e => props.onChange(e)} required/>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Street" name="street"  value={street} onChange={e => props.onChange(e)} required/>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="City" name="city"  value={city} onChange={e => props.onChange(e)} required/>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="State/Province" name="state"  value={state} onChange={e => props.onChange(e)} required/>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Country" name="country"  value={country} onChange={e => props.onChange(e)} required/>
                </div>

                <div className="form-group">
                    <input type="number" placeholder="Zipcode" name="zipcode" minLength="5" maxLength="5" value={zipcode} onChange={e => props.onChange(e)} required/>
                </div>
                        
                <div className="form-group">
                    <select name="gender" value={gender} onChange={e => props.onChange(e)} required>
                        <option value="">Select your gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>

                <div className="form-group">
                    <select name="question1" value={question1} onChange={e => props.onChange(e)} required>
                        <option value="">--select a question---</option>
                        <option value="What is your favorite color">What is your favorite color</option>
                        <option value="What is your pet name">What is your pet name</option>
                        <option value="What brand is your first car">What brand is your first car</option>
                    </select>
                </div>

                <div className="form-group" required>
                    <input type="text" placeholder="" name="answer1" value={answer1} onChange={e => props.onChange(e)} required/>
                </div>

                    
                <div className="form-group">
                    <select name="question2" value={question2} onChange={e => props.onChange(e)} required>
                        <option value="">--select a question---</option>
                        <option value="What is your pet name">What is your pet name</option>
                        <option value="What is your favorite color">What is your favorite color</option>
                        <option value="What brand is your first car">What brand is your first car</option>
                    </select>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="" name="answer2" value={answer2} onChange={e => props.onChange(e)} required/>
                </div>

                <div className="form-group">
                    <select name="question3" value={question3} onChange={e => props.onChange(e)} required>
                        <option value="">--select a question---</option>
                        <option value="What brand is your first car">What brand is your first car</option>
                        <option value="What is your favorite color">What is your favorite color</option>
                        <option value="What is your pet name">What is your pet name</option>
                    </select>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="" name="answer3"  value={answer3} onChange={e => props.onChange(e)} required/>
                </div>

                <input type="submit" className="btn btn-primary" value={props.title} />

            </form>
            {props.title === "Sign Up" && 
                <p className="my-1">
                Already have an account? <Link to="login">Sign In</Link>
                </p>
            }
        </Fragment>
    )
}