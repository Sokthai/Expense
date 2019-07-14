import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Form from './Form';
import {createItem} from '../../actions/item';



function CreateItem({auth: {loading, user}, createItem}) {
    const [formData, setFormData] = useState({
        paidBy : '', 
        item : '', 
        category : '', 
        location : '', 
        price : '', 
        description : '', 
        purchaseDate : '', 
        title: 'Create'
    })

    useEffect(()=> {
        setFormData({
            paidBy : loading? '' : user.username, 
            item : '', 
            category : '', 
            location : '', 
            price : '', 
            description : '', 
            purchaseDate : '', 
            title: 'Create'
        })
    }, [loading, user.username])

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();
        createItem(formData);
    }

    return (
        <Fragment>
            
            <Form value={formData} onChange={onChange} onSubmit={onSubmit}/>
        </Fragment>
    )
}

CreateItem.propTypes = {
    createItem : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})




export default connect(mapStateToProps, {createItem})(CreateItem);

