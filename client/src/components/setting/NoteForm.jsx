import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'; //the "withRouter" wil have the "history" object we need to pass to updateItem in action. read more in updateItem in action


function NoteForm(props) {
    const {title, note, subject} = props.value;
    return (
        <Fragment>
            <h1 className="large text-primary">{title}</h1>
            <form className="form" onSubmit={e => props.onSubmit(e)} encType="multipart/form-data">

                <div className="form-group">
                    <input type="text" placeholder="Subject" name="subject" value={subject} onChange={e => props.onChange(e)} required />
                </div>

                <div className="form-group">
                    <textarea rows="10" cols="10" name="note" placeholder="Note Text" value={note} onChange={e => props.onChange(e)}></textarea>
                </div>

                {/* <div className="custom-file">
                    <input type="file" className="custom-file-input" name="media" id="customFile" onChange={e=> props.onChange(e)} multiple/>
                </div> */}
                {/* <input hidden="spendId" value={spendingId} name="spendId" readOnly/> */}
                
                <input type="submit" className="btn btn-primary" value={title} />
            </form>
            {title === "Update" && <input type="submit" className="btn btn-danger delete" value="Delete" onClick={() => props.deleteNoteById(props._id, props.history)} />}

        </Fragment>
    )
}

NoteForm.propTypes = {
    value : PropTypes.object.isRequired
}

export default withRouter(NoteForm);


