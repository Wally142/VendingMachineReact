import React from 'react';
import './Title.css';

const Vending = (props) => {

    return (
        <div className="vend text-center">
            <p className="columnTitle">Name</p>
            <p>{props.name}</p>
            <p className="columnTitle">Price</p>
            <p>${props.price}</p>
            <p className="columnTitle">Quantity</p>
            <p>{props.quantity}</p>
            <button className="btn btn-primary" onClick={() => props.onClick(props.id)}>Select Item</button>
        </div>
    )
}

export default Vending;