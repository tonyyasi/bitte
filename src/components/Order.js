import React from 'react';
import {Header} from './Header';
import { TextField, DropDownMenu, MenuItem, FlatButton} from 'material-ui';
import {database, validateSession} from '../config/constants';
import {customHistory} from './../index';


export default class Order extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    constructor(props) {
        super(props);
        if(validateSession()) {
        if (customHistory.location.other) {
            const otherOrder = customHistory.location.other;
            this.state = {
                selectedCategory: otherOrder.selectedCategory,
                orderDescription: otherOrder.orderDescription,
                deliveryLocation: '',
                tip:5,
                extraInfo: '',
                active:true,
                orderedByName: this.currentUser.displayName,
                orderedById: this.currentUser.uid,
                deliveredByName: '',
                deliveredById: ''
            }
        } else {
        this.state = {
            selectedCategory: "Food",
            orderDescription:'',
            deliveryLocation: '',
            tip:5,
            extraInfo: '',
            active:true,
            orderedByName: this.currentUser.displayName,
            orderedById: this.currentUser.uid,
            deliveredByName: '',
            deliveredById: ''
        }
    }
}

    }

    componentWillMount() {
        if (!validateSession()) {
            customHistory.push('/');
            return;
        }
    }

    handleDropDownChange = (event, index, value) => {
        const selectedCategory = value[value.length - 1];
     
        this.setState(() => {
            return {selectedCategory}
        });
    }

    handleDescriptionChange = (e) => {
        const orderDescription = e.target.value;
        this.setState(() => ({orderDescription}))
    }

    handleDeliveryLocationChange = (e) => {
        const deliveryLocation = e.target.value;
        this.setState(() => ({deliveryLocation}));

    }

    handleTipChange = (e) => {
        const tip = e.target.value;
        if (this.validateTip(tip)) {
        this.setState(() => ({tip}));
        }
    }

    handleExtraInfoChange = (e) => {
        const extraInfo = e.target.value;
        this.setState(() => ({extraInfo}));
    }


    validateForm =() => {
        return (this.state.deliveryLocation && this.state.orderDescription && this.state.tip >= 5);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            // Create firebase order and redirect to /app/deliver
            database.ref(`orders`).push(this.state).then((ref) => {
                customHistory.push('/app/deliver');
            });

        } else {
            alert('Please check your order, remember that the minimum tip is of $5');
        }

    }


    validateTip(tip) {
        // Tip must be >= 5, not negative with no decimals and with no letters
        // Must have description
        // Must have location
        return (tip.indexOf('.') < 0 && tip.indexOf('0') !== 0 && tip.indexOf('-') < 0 && !tip.match(/[a-z]/i));
    }

    categories = ["Food", "Drinks", "Misc"];

    render() {
        if(this.currentUser)
        return (
            <div >
                <Header />
                <h2> New Order </h2>
               <div style={{margin:"auto"}}>
               <form onSubmit={this.handleFormSubmit}>
                    <TextField
                    id="orderDescription"
                    value={this.state.orderDescription}
                    onChange={this.handleDescriptionChange}
                    floatingLabelText="Order description"
                    style={{width:"70%"}}
                    />
                    <DropDownMenu
                    multiple={true}
                    
                    value={this.state.selectedCategory}
                    onChange={this.handleDropDownChange}
                    >
                    {this.categories.map((category) => {
                        return (
                            <MenuItem
                            value={category}
                            primaryText={category}
                            key={category}
                            />
                        )
                    })}
                    </DropDownMenu>
                    <TextField
                    id="deliveryLocation"
                    value={this.state.deliveryLocation}
                    onChange={this.handleDeliveryLocationChange}
                    floatingLabelText="Delivery location"
                    style={{width:"45%"}}
                    />

                    <TextField
                    id="tip"
                    value={this.state.tip}
                    onChange={this.handleTipChange}
                    floatingLabelText="Tip"
                    style={{width:"70%"}}
                    />
                    <TextField
                    id="extraInfo"
                    value={this.state.extraInfo}
                    onChange={this.handleExtraInfoChange}
                    floatingLabelText="Extra info (Optional)"
                    style={{width:"70%"}}
                    />
                    <br></br>
                    <FlatButton label="Order Now!" backgroundColor="lightgray" onClick={this.handleFormSubmit}></FlatButton>
                    </form>
                    </div>
                
            </div>
        );
        return <p>Order</p>
    }
}