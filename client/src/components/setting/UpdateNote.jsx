import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import NoteForm from './NoteForm';
import {connect} from 'react-redux';
import {updateNoteById, getNotes, deleteNoteById} from '../../actions/note';




function UpdateNote({note: {notes, loading}, updateNoteById, match, deleteNoteById}) {
    const [formData, setFormData] = useState({
        subject : '',
        note: '',
        title: 'Update'
    })

    useEffect(() => {
        getNotes();
        // console.log(notes.note);
        const updateIndex = notes.note.map(note => note._id).indexOf(match.params.id);
        if (updateIndex >= 0 ){
            setFormData({
                subject : (loading && updateIndex < 0)? '' : notes.note[updateIndex].subject,
                note : (loading && updateIndex < 0)? '' : notes.note[updateIndex].note,
                title: 'Update'
            })
        }
    }, [loading, notes.note, match.params.id])

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();
        updateNoteById(formData, match.params.id)
    }


    return (
        <NoteForm value={formData} onChange={onChange} onSubmit={onSubmit} deleteNoteById={deleteNoteById} _id={match.params.id}/>
    )
}

UpdateNote.propTypes = {
    getNotes : PropTypes.func.isRequired,
    updateNoteById: PropTypes.func,
    note : PropTypes.object.isRequired,
    deleteNoteById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    note : state.note
})


export default connect(mapStateToProps, {getNotes, updateNoteById, deleteNoteById})(UpdateNote);

