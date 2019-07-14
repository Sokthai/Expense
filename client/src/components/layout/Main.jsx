import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import Form from './Form';
import {getItems} from '../../actions/item';
import Spinner from './Spinner';
import Item from './Item';


const Main = ({getItems, items : {spending, loading}, auth: {user}}) => {

    // const [item, setItem] = useState("");

    useEffect(() => {
        getItems()
    },[getItems])

    
    
    return (
      ((loading || spending.length === 0) && user === null) ? ( //first we need to filter the initial state . this is how redux work
        <Spinner/>
      ) : (
          <Item items={spending} />
      )
    )
}

Main.propTypes = {
    items : PropTypes.object.isRequired,
}

function mapStateToProps(state){
    return ({
        items: state.item,
        auth: state.auth
    })
}

export default connect(mapStateToProps, {getItems})(Main);
