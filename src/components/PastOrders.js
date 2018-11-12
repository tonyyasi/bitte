import React from 'react';
import {Header} from './Header';
import {database} from './../config/constants';
import {OrderList} from './OrderList';
import { customHistory } from "../index";
import {validateSession} from '../config/constants';
import { SegmentedControl } from 'segmented-control';

export default class PastOrders extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    finishedOrders = [];
    ordersInProgress = [];

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
            this.finishedOrders = userOrders.filter((order) => {
                return order.delivered;
            });

            this.ordersInProgress = userOrders.filter((order) => {
                return !order.delivered;
            });
            
            this.setState(() => {
                return {userOrders: this.finishedOrders.reverse()}
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    componentWillMount() {
        if (!validateSession) {
            customHistory.push('/');
        }
    }

    handleValueChange = (newValue) => {
        if (newValue === 'finished') { 
            this.setState(() => ({userOrders:this.finishedOrders}))
        } else {
            this.setState(() => ({userOrders:this.ordersInProgress}))
        }
    }

    snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));

    render() {
        return (
            <div>
                <Header />
                <SegmentedControl options={[
                    {label: 'Finished Orders', name: 'finished', value: 'finished', default: true},
                    {label: 'Orders in progress', name: 'Progress', value: 'inProgress'}
                ]} setValue={(newValue) => {this.handleValueChange(newValue)}} name="segmented-control" />
                <OrderList showButtons={false} orders={this.state.userOrders}></OrderList>

                
            </div>
        )
    }
}