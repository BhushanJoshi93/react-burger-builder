import React from 'react';
import classes from './SingleNavigationItem.css';
import {NavLink} from 'react-router-dom';

const singleNavigationItem = (props)=>(
    <li className={classes.SingleNavigationItem}>
        <NavLink
        exact
        to={props.link} 
        // className ={props.active ? classes.active : null}
        //classname is automatically determined as we have it named active
        activeClassName={classes.active}
        >
        {props.children}
        </NavLink>
    </li>
);


export default singleNavigationItem;