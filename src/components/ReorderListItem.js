import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {customHistory} from './../index';

export class ReorderListItem extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    constructor(props) {
        super(props);
        const order = this.props.order;
        this.state = {
            order
        };
    }

    handleOrder = (e) => {
        e.preventDefault();
        customHistory.push({
            pathname: '/app/order',
            other: this.state.order
        });
    }

    
    render() {
        return (
            <div>
                    <Card style={{backgroundColor:'lightgray'}} >
                    <CardHeader
                    title={`Order Info`}
                    titleStyle={{fontSize:'24px'}}
                    subtitle={`${this.state.order.selectedCategory}`}
                    />
                    <CardText style={{fontSize: '18px'}} > <b>Order Description: </b></CardText>
                    <CardText > {this.state.order.orderDescription} </CardText>
                    <CardActions> <FlatButton onClick={this.handleOrder} label="Order!" style={{backgroundColor:'gray'}} />   </CardActions>
                    </Card>   
            </div>
        ) 
    }
}