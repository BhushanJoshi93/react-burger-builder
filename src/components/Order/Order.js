import React from 'react'
import classes from './order.css'

const Order = (props) => {
    const ingredient=[];

    for(let key in props.ingredients){
        ingredient.push({
            name:key,
            amount:props.ingredients[key]});
    }
    

    const ingredientOutput=ingredient.map(ig=>{
        console.log(ingredient)
        return <span 
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}
            key={ig.name}
        >
        
        {ig.name} : ({ig.amount})</span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>{props.totalPrice}</strong></p>

        </div>
    )
}
export default Order;