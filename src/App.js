import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/MyOrders/MyOrder';

class App extends Component {
 
  render(){
    return(
      <div>
        <Layout>
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/orders'  component={Orders}/>
        
        </Layout>
        
      </div>
    )
  }
}

export default App;
