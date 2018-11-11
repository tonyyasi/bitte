import React from 'react';
import {Header} from './Header';
import {database} from './../config/constants';
import { OrderList } from './OrderList';

export default class MostOrdered extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            mostOrdered: 'Loading...'
        };

        let foodOrders = [];
        let drinksOrders = [];
        let miscOrders = [];

        database.ref('orders').once('value').then((snapshot) => {
            const orders = this.snapshotToArray(snapshot.val());

            const deliveredOrders = orders.filter((order) => {
                return (order.delivered);
            });

            deliveredOrders.map((order) => {
                if (order.selectedCategory === 'Food') foodOrders.push(order);
                if (order.selectedCategory === 'Drinks') drinksOrders.push(order);
                if (order.selectedCategory === 'Misc') miscOrders.push(order);

            });

            const foodSize = foodOrders.length;
            const drinkSize = drinksOrders.length;
            const miscSize = miscOrders.length;

            if (foodSize > drinkSize && foodSize > miscSize) {
                this.setState(() => {
                return {orders:foodOrders.slice(0,5), mostOrdered: 'Food'}
            });
            } else if (drinkSize > foodSize && drinkSize > miscSize) {
                this.setState(() => {
                    return {orders:drinksOrders.slice(0,5), mostOrdered: 'Drinks'}
                });
            } else {
                this.setState(() => {
                    return {orders:miscOrders.slice(0,5), mostOrdered: 'Misc'}
                });
            }
            
        }).catch((err) => {
            console.log(err);
        });
    }

    snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));


    render() {
        return (
            <div>
                <Header />
                <h2>The most ordered category is {this.state.mostOrdered} </h2>
                <OrderList orders={this.state.orders} reorder={true} />
                
            </div>
        )
    }
}