import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class layout extends Component{

    state={
        showSideDrawer :false
        
    }
    sideDrawerClosedHandelr=()=>{

        console.log("Inside sidedrawer:", this.state.showSideDrawer);
        this.setState({
            showSideDrawer: !this.state.showSideDrawer
        })

    }



    render(){
        return(
            <Aux>
            <div>
                <Toolbar showToggle={this.sideDrawerClosedHandelr}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandelr}/>
            </div>
        
            <main className={classes.Content}>
                {/* //childrenof layout components would be burgerbuilder
                 component which is the main component of the app */}
                {this.props.children}
            </main>
        </Aux>
        );
    }

}


export default layout;