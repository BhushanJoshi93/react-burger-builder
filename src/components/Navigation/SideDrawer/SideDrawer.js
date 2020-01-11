import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer =(props)=>{

    let attachedCss =[classes.SideDrawer, classes.Close ];
    console.log("mn",props.open);
    if(props.open){
        attachedCss = [classes.SideDrawer, classes.Open];
    }
    return(
        <> 
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedCss.join(' ')}>
            <div className={classes.Logo}>
            <Logo />
            </div>

            <nav>
                <NavigationItems />
            </nav>


        </div>
        </>
    );
}

export default sideDrawer;