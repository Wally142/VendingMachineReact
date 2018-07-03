import React from 'react';
import '../App.css';

const Change = (props) => {
    return (
        <div className="text-center">
            <h1>Your Change is:</h1>
            <h3 className="change">Quarters: {props.quarters}</h3>
            <h3 className="change">Dimes: {props.dimes}</h3>
            <h3 className="change">Nickels: {props.nickels}</h3>
            <h3 className="change">Pennies: {props.pennies}</h3>
            <h3 className="change">{props.message}</h3>
        </div>
    )
}
export default Change;