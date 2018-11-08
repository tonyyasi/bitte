import React from 'react';
import {Header} from './Header';
import { database } from './../config/constants';
import {OrderList} from './OrderList';
import {SegmentedControl} from 'segmented-control';

export default class Deliver extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    openOrders = [];
    progressOrders = [];

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
        database.ref('orders').once('value').then((snapshot) => {
            const orders = this.snapshotToArray(snapshot.val());
            this.openOrders = orders.filter((order) => {
                return (order.orderedById !== this.currentUser.uid && order.active);
            });
            this.progressOrders = orders.filter((order) => {
                return (order.orderedById !== this.currentUser.uid && !order.active && !order.delivered);
            });
            this.setState(() => {
                return {orders:this.openOrders}
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));

    handleValueChange = (newValue) => {
        if (newValue === 'openOrders') { 
            this.setState(() => ({orders:this.openOrders}))
        } else {
            this.setState(() => ({orders:this.progressOrders}))
        }
    }

    render() {
        return (
            <div>
                <Header />
                <SegmentedControl options={[
                    {label: 'Open orders', name: 'OpenOrders', value: 'openOrders', default: true},
                    {label: 'Orders in progress', name: 'Progress', value: 'inProgress'}
                ]} setValue={(newValue) => {this.handleValueChange(newValue)}} name="segmented-control" />
                <OrderList showButtons={true} orders={this.state.orders}></OrderList>
                
            </div>
        )
    }
}