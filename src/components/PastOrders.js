import React from 'react';
import {Header} from './Header';
import {database} from './../config/constants';
import {OrderList} from './OrderList';

export default class PastOrders extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    constructor(props) {
        super(props);
        this.state = {
            userOrders: []
        };
        database.ref('orders').once('value').then((snapshot) => {
            const orders = this.snapshotToArray(snapshot.val());
            const userOrders = orders.filter((order) => {
                return order.orderedById === this.currentUser.uid
            });
            console.log(userOrders);
            this.setState(() => {
                return {userOrders}
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));

    render() {
        return (
            <div>
                <Header />
                <OrderList showButtons={false} orders={this.state.userOrders}></OrderList>

                
            </div>
        )
    }
}