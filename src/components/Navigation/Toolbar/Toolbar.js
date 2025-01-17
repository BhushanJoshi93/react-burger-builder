import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar =(props)=>(
    <div>
        <header className={classes.Toolbar}>
            <div className={classes.DrawerToggle} onClick={props.showToggle}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Logo height = "80%"/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>

        </header>
    </div>
)

export default toolbar;