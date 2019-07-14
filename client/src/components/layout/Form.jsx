import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'; //the "withRouter" wil have the "history" object we need to pass to updateItem in action. read more in updateItem in action


function getFullDate(date) {

    const year = date.substring(0, 4)
    let month = date.substring(5, 7)
    let myDate = date.substring(8, 10)
    const today = year + "-" + month + "-" + myDate
    return today
}

function todayDate(date) {
    let today = date.toString()
    today = today.split(" ")
    switch (today[1]) {
        case 'Jan':
            today[1] = '01'; break
        case 'Feb':
            today[1] = '02'; break
        case 'Mar':
            today[1] = '03'; break
        case 'Apr':
            today[1] = '04'; break
        case 'May':
            today[1] = '05'; break
        case 'Jun':
            today[1] = '06'; break
        case 'Jul':
            today[1] = '07'; break
        case 'Aug':
            today[1] = '08'; break
        case 'Sep':
            today[1] = '09'; break
        case 'Oct':
            today[1] = '10'; break
        case 'Nov':
            today[1] = '11'; break
        default:
            today[1] = '12'; break
    }
    let now = today[3] + "-" + today[1] + "-" + today[2]
    return now
}


function Form(props) {

    const { paidBy, item, category, location, price, description, purchaseDate, title} = props.value;
    let now = todayDate(new Date())

    return (
        <Fragment>
            <p className="lead title">{title}</p>
            <form className="form" onSubmit={e => props.onSubmit(e)} encType="multipart/form-data">

                <div className="form-group">
                    <input type="text" placeholder="Item" name="item" value={item} onChange={e => props.onChange(e)} required />
                </div>

                <div className="form-group">
                    <input type="number" placeholder="Price" name="price" value={price} onChange={e => props.onChange(e)} required />
                </div>

                {/* <div className="form-group">
                    <input type="text" placeholder="Categories" name="category" value={category}  onChange={e=> props.onChange(e)} required />
                </div> */}


                <div className="form-group">
                    <select name="category" value={category} onChange={e => props.onChange(e)} required>
                        <option value="">--select a categories---</option>
                        <option value="food">Food</option>
                        <option value="gas">Gas</option>
                        <option value="cloth">Cloth</option>
                        <option value="eatout">Eat Out</option>
                        <option value="electronic">Electronic</option>
                        <option value="merchandise">Merchandise</option>
                        <option value="service">Service</option>
                        <option value="fun">Fun</option>
                        <option value="travel">Travel</option>
                        <option value="mis">Miscellaneous</option>
                    </select>
                </div>




                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => props.onChange(e)} />
                </div>

                <div className="form-group">
                    <input type="date" name="purchaseDate" id="purchaseDate" value={getFullDate(purchaseDate)} max={now} onChange={e => props.onChange(e)} required />
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Paid By" name="paidBy" value={paidBy} onChange={e => props.onChange(e)} />
                </div>

                <div className="form-group">
                    <textarea rows="10" cols="10" name="description" placeholder="Description" value={description} onChange={e => props.onChange(e)}></textarea>
                </div>

                {/* <div className="custom-file">
                    <input type="file" className="custom-file-input" name="media" id="customFile" onChange={e=> props.onChange(e)} multiple/>
                </div> */}
                {/* <input hidden="spendId" value={spendingId} name="spendId" readOnly/> */}
              
                <input type="submit" className="btn btn-primary" value={title} />
            </form>
            {title === "Update" && <input type="submit" className="btn btn-danger delete" value="Delete" onClick={() => props.deleteItemById(props._id, props.history)} />}

        </Fragment>
    )
}
export default withRouter(Form);

