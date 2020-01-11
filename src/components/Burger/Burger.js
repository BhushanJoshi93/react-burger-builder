import React from 'react';
import classes from './burger.css';
import BurgerIngredients from './BurgerIngredient/BurgerIngredient'

const burger=(props)=>{
    
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey=>{
        // console.log("igkey ",igkey);
        // console.log("props.ingredients= ",props.ingredients);
        // console.log("props.ingredients[igkey]= ",props.ingredients[igkey]);

        return [...Array(props.ingredients[igkey])].map((el,i)=>{ 
           return <BurgerIngredients key={igkey+i} type={igkey}/>
        });
    });

   
   transformedIngredients=transformedIngredients.reduce((prev,current)=>{
        // console.log("Prev",prev);
        // console.log("Current",current);
        // console.log("Prev.concat(current)",prev.concat(current));
        return prev.concat(current);
    },[]);


    //you can also use .flat instead of reduce.

    // transformedIngredients=transformedIngredients.flat();


    if(transformedIngredients.length === 0){
        transformedIngredients=<p>Please start adding ingredients</p>;
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
           {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;