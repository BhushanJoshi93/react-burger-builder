import React from 'react';
import burgerlogo from '../../assets/images/burger-logo.png';
import classes from './logo.css';

const logo =(props)=>(
    <div className={classes.Logo } style={{height:props.height}}>
        <img alt='logo' src={burgerlogo}/>
    </div>
) 

export default logo;