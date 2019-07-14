import React, {useState} from 'react'
import PropTypes from 'prop-types';
import NoteForm from './NoteForm';
import {connect} from 'react-redux';
import {createNotes} from '../../actions/note';


function CreateNote({createNotes}) {

    const [formData, setFormData] = useState({
        title: "Create Note",
        note: '',
        subject: ''
    })

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();
        createNotes(formData);
    }


    return (
        <NoteForm value={formData} onSubmit={onSubmit} onChange={onChange}/>
    )
}

CreateNote.propTypes = {
    createNotes: PropTypes.func.isRequired,
}

export default connect(null, {createNotes})(CreateNote);

