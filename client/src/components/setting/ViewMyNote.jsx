import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getNotes} from '../../actions/note';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';


function ViewMyNote({note : {notes, loading}, getNotes}) {


    useEffect(() => {
        getNotes();
    }, [getNotes])



    return (
        <Fragment>
            {(loading)? <Spinner/> : (!notes)? <h1>sorry, not item</h1> :
            
                <table className="table">
                {console.log(notes)}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Subject</th>
                            <th>Note</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.note.map((note, index)  => (
                            <tr key={note._id}>
                                <td>{index + 1}</td>
                                <td><Link to={`/api/note/${note._id}`}>{note.subject}</Link></td>
                                <td>{note.note.substring(0, 40)}...</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{moment.utc(note.date)}</Moment>
                                </td>
                            </tr>
                        ))}
                    </tbody>    
                </table>
            }
            
        </Fragment>
    )
}

ViewMyNote.propTypes = {
    note: PropTypes.object.isRequired,
    getNotes: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    note : state.note
})

export default connect(mapStateToProps, {getNotes})(ViewMyNote);

