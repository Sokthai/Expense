import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {sortArray} from '../../utility/util';

function Monthly({value}) {
    
    sortArray(value); //this function will sort the array and assign to itself 
    const [monthly, setMonthly] = useState();
    useEffect(() => {
        let month = value.map((items, index) => (
            <ul key={index} className="monthly">
                <li className="caption">{items.month.toUpperCase()}</li>
                {items.data.map((data, index) => (    
                    <li key={index} className={"cate" + index}><span >{data.category.toUpperCase()}</span> <span className="expense">{data.expense.toFixed(2)}</span></li>
                ))}
                    <li className="total"><span >Total</span> <span className="expense">{items.total.toFixed(2)}</span></li>
            </ul>
        ))
        // console.log(month)
        setMonthly(month);
    }, [value])
    // console.log(value);
    return (
        <div>
            {monthly}
        </div>
    )
}

Monthly.propTypes = {
    value: PropTypes.array.isRequired,
}

export default Monthly

