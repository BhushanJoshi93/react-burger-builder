import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-instance';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

 class MyOrder extends Component {

    state={
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/order.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
                
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false});
            });
    }

    render() {
      //  console.log(this.state.orders);
        return (
            <div>
                {   
                    this.state.orders.map(order=>(
                         <Order key={order.id}
                            ingredients={order.ingredient}
                            totalPrice={order.totalPrice}
                            />
                    )
                    )
                
                }
            </div>
        )
    }
}

export default withErrorHandler(MyOrder,axios);
