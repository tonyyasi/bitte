import React from 'react';
import {OrderListItem} from './OrderListItem';

export class OrderList extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
            {this.props.orders.map((order) => {
                return (
                  <OrderListItem showButtons={this.props.showButtons} key={order.key} order={order} />
                )
            })}       
            </div>
        ) 
    }
}