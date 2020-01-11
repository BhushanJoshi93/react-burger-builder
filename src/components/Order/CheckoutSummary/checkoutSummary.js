import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/CustomButton/CustomButton'
import classes from './checkoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.checkoutSummary}>
            <h1>Here is your order: </h1>
            <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnClicked={props.checkoutCancelled} btnType="Danger">Cancel</Button>
            <Button btnClicked={props.checkoutContinued} btnType="Success">Continue</Button>
         
        </div>
    )
}

export default checkoutSummary
