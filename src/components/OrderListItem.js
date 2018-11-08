import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { database } from './../config/constants';

export class OrderListItem extends React.Component {

    constructor(props) {
        super(props);
        const order = this.props.order;
        this.state = {
            order
        };
    }

    handleDeliverClicked = (e) => {
        console.log('deliver');
        const order = {...this.state.order, active:false};
        const { key, ...noKey } = order;
        database.ref('orders/' + key).update(noKey).then(() => {
            this.setState(() => {
                return {
                    order
                }
            });
        })
        
        
    }  
    render() {
        return (
            <div>
                    <Card style={{backgroundColor:'lightgray'}} >
                    <CardHeader
                    title={`Order from: ${this.state.order.orderedByName}`}
                    titleStyle={{fontSize:'24px'}}
                    subtitle={`${this.state.order.selectedCategory}`}
                    />
                    <CardText style={{fontSize: '18px'}} > <b>Order Description: </b></CardText>
                    <CardText > {this.state.order.orderDescription + ` Tip: ${this.state.order.tip}`} </CardText>
                    <CardText style={{fontSize: '18px'}} > <b>Order Location: </b></CardText>
                    <CardText > {this.state.order.deliveryLocation} </CardText>
                    {this.state.order.active ? (<CardActions> 
                        <FlatButton label="Deliver!" onClick={this.handleDeliverClicked} style={{backgroundColor:'gray'}} /> 
                        </CardActions>) : (
                        <CardText> Being delivered!</CardText>)
                    }
                    </Card>   
            </div>
        ) 
    }
}