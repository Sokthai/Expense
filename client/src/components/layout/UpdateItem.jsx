import React, {Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Form from './Form';
import { updateItem, getItems, deleteItemById } from '../../actions/item';
import { withRouter } from 'react-router-dom'; //the "withRouter" wil have the "history" object we need to pass to updateItem in action. read more in updateItem in action



const UpdateItem = ({ updateItem, item: { loading, spending }, match, history , deleteItemById}) => {
    const [formData, setFormData] = useState({
        paidBy: '',
        item: '',
        category: '',
        location: '',
        price: '',
        description: '',
        purchaseDate: '',
        title: 'Update'
    })

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        updateItem(formData, match.params.id, history);
    }

    useEffect(() => {
        getItems(); //use getItems instead of getItemById because when we want to go back, the page expect an array of all item. if we retrieve only 1 item, it will compain that the one item is an object, not an array
        const updateIndex = spending.map(spend => spend._id).indexOf(match.params.id);
        
        if (updateIndex >= 0){ //we do this because each time we update, mongoose will re-generate a new id. the old one will be not available
            setFormData({
                paidBy: (loading && spending.length <= 0) ? '' : spending[updateIndex].paidBy,
                item: (loading && spending.length <= 0) ? '' : spending[updateIndex].item,
                category: (loading && spending.length <= 0) ? '' : spending[updateIndex].category,
                location: (loading && spending.length <= 0) ? '' : spending[updateIndex].location,
                price: (loading && spending.length <= 0) ? '' : spending[updateIndex].price,
                description: (loading && spending.length <= 0) ? '' : spending[updateIndex].description,
                purchaseDate: (loading && spending.length <= 0) ? '' : spending[updateIndex].purchaseDate,
                title: 'Update'
            })
        }
    }, [loading, spending, match.params.id]);
    

    return (
        <Fragment>
            <Form value={formData} onChange={onChange} onSubmit={onSubmit} deleteItemById={deleteItemById} _id={match.params.id}/>
        </Fragment>
    )
}

UpdateItem.propTypes = {
    getItems: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItemById: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return ({
        item: state.item
    })
}
export default connect(mapStateToProps, { updateItem, getItems, deleteItemById })(withRouter(UpdateItem));
//when we wrap "withRouter", we can use "history" object in the props
