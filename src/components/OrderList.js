import React from 'react';
import {OrderListItem} from './OrderListItem';
import { ReorderListItem } from './ReorderListItem';

export class OrderList extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
            {this.props.orders.map((order) => {
                if (!this.props.reorder) {
                return (
                    
                  <OrderListItem showButtons={this.props.showButtons} key={order.key} order={order} />
                );
                } else {
                    return (
                        <ReorderListItem key={order.key} order={order} />
                    )
                }
            })}       
            </div>
        ) 
    }
}