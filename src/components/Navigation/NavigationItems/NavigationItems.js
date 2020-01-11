import React from 'react';
import SingleNavigationItem from './SingleNavigationItem/SingleNavigationItem';
import classes from './NavigationItems.css'


const navigationItems =()=>(
    <ul className={classes.NavigationItems}>
        <SingleNavigationItem
        link="/"
        // active
        > Burger Builder</SingleNavigationItem>

<SingleNavigationItem
        link="/orders"
        active={false}
        > My Orders</SingleNavigationItem>
        
    </ul>
);

export default navigationItems
