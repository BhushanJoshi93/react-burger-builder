import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/checkoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state={
        price:0,
        ingredients:null
    }

    componentWillMount(){
        console.log("[Checkout Props]",this.props);
        const query=new URLSearchParams(this.props.location.search);
        console.log("[Checkout query]: ",query)
        const ingredients={};
        let price=0;
        for (let param of query.entries()){
//            console.log("[Checkout param]: ",param)
            //the + is used to convert the param[1] into number

            if(param[0]==='price'){
                price=param[1];
            }
            else{
            ingredients[param[0]]=+param[1];
            }
        }
        this.setState({ingredients:ingredients, price:price})
    }

     checkoutCancelledHandler =()=>{
        this.props.history.goBack();

    }
    checkoutContinuedHandler =()=>{
        this.props.history.replace('/checkout/contact')
    }
    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                />
             <Route 
                    path={this.props.match.path + '/contact'} 
                    render={(props) => (
                    <ContactData 
                    ingredients={this.state.ingredients} 
                    price={this.state.price} {...props} />)} />
            
                
                {/* //this props spread operator is to pass history etc props to the component
                //you can also use withRouter */}
                
            </div>
        )
    }
}

export default withRouter(Checkout) 