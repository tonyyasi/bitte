import React from 'react';
import {Header} from './Header';
import {database} from './../config/constants';

export default class MostOrdered extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    constructor(props) {
        super(props);

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
            
            console.log('food', foodOrders);
            console.log('drinks', drinksOrders);
            console.log('misc', miscOrders);
            // this.setState(() => {
            //     return {orders:this.openOrders}
            // });
        }).catch((err) => {
            console.log(err);
        });
    }

    snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));


    render() {
        return (
            <div>
                <Header />
                
                
            </div>
        )
    }
}