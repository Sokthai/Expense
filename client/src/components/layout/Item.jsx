import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import moment from 'moment';
import {Link} from 'react-router-dom';

function Item({items}) {
    const item = items.map((item, index) => (
        <tr key={item._id}>
            <td>{index + 1}</td>
            <td className="hide-sm"><Link to={`/api/item/${item._id}`}>{item.item}</Link></td>
            <td className="hide-sm">{item.price}</td>
            <td className="hide-sm">{item.location}</td>
            <td>
                <Moment format="YYYY/MM/DD">{moment.utc(item.purchaseDate)}</Moment>
            </td>
            <td className="hide-sm">{item.description.substring(0, 15)}...</td>
            <td className="hide-sm">{item.paidBy}</td>
        </tr>
    ))


    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>PurchaseDate</th>
                        <th>Description</th>
                        <th>PaidBy</th>
                    </tr>
                </thead>
                <tbody>{item}</tbody>
            </table>
        </Fragment>
    )
}

Item.propTypes = {
    items : PropTypes.array.isRequired,
}

export default Item

