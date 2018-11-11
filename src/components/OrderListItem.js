import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { database } from './../config/constants';

export class OrderListItem extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    constructor(props) {
        super(props);
        const order = this.props.order;
        this.state = {
            order
        };
    }

    handleFinishDeliveryClicked = (e) => {
        console.log('finish delivrty')
        const order = {...this.state.order, delivered: true};
        const { key, ...noKey } = order;
          database.ref('orders/' + key).update(noKey).then(() => {
            this.setState(() => {
                return {
                    order
                }
            });
        })
    }

    handleDeliverClicked = (e) => {
        console.log('deliver');
        const order = {...this.state.order, active:false, deliveredById: this.currentUser.uid};
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
        const titleText = (this.props.showButtons) ? `Order from: ${this.state.order.orderedByName}` : 'Order';
        return (
            <div>
                    <Card style={{backgroundColor:'lightgray', fontWeight:'550'}} >
                    <CardHeader
                    title={titleText}
                    titleStyle={{fontSize:'24px'}}
                    subtitle={`${this.state.order.selectedCategory}`}
                    />
                    <CardText style={{fontSize: '18px'}} > <b>Order Description: </b></CardText>
                    <CardText > {this.state.order.orderDescription + ` Tip: ${this.state.order.tip}`} </CardText>
                    <CardText style={{fontSize: '18px'}} > <b>Order Location: </b></CardText>
                    <CardText > {this.state.order.deliveryLocation} </CardText>
                    { this.props.showButtons ? (
                        this.state.order.active ? 
                        (<CardActions> 
                        <FlatButton label="Deliver!" onClick={this.handleDeliverClicked} style={{backgroundColor:'gray'}} /> 
                        </CardActions>) : ( (this.currentUser.uid === this.state.order.deliveredById) ? ( this.state.order.delivered ? <CardText> Status: Order Delivered!</CardText>
                            : <CardActions> 
                        <FlatButton label="Finish Delivery!" onClick={this.handleFinishDeliveryClicked} style={{backgroundColor:'gray'}} /> 
                        </CardActions>) :
                        <CardText> Status: Being delivered!</CardText>)) : ( this.state.order.delivered ? <CardText> Status: Order delivered!</CardText> : <CardText> Status: Order in progress</CardText>)
                    }
                    </Card>   
            </div>
        ) 
    }
}