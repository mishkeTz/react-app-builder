import React, { Component } from 'react'

import Order from '../../components/Order/';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandling';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios
            .get('/orders.json')
            .then(res => {

                const fetchedOrders = [];

                for (let key in res.data) {
                    if (key !== "ingredients") {
                        fetchedOrders.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                }

                this.setState({
                    orders: fetchedOrders,
                    loading: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        
        let orders = [];

        orders = this.state.orders.map(order => {
            return <Order 
                        key={order.id} 
                        ingredients={order.ingredients} 
                        price={order.price} />
        })

        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);