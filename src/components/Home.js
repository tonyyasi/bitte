import React from "react";
import {Header} from './Header';
import { customHistory } from "../index";
import FlatButton from "material-ui/FlatButton";
import { validateSession } from "../config/constants";

export default class Home extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    componentWillMount() {
        if (!validateSession) {
            customHistory.push('/');
        }
    }
   

    handleOrder = () => {
        customHistory.push('/app/order');
    }

    render() {
        console.log(this.currentUser);
        return (
            <div>
            <Header />
            <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontSize:'120%'}} >
                <h1>Welcome to Bitte, {this.currentUser.displayName}!</h1>
                <h3> Your food, when you need it!</h3>
                <p> Have you ever craved anything, but were not able to get it? Stop craving and start doing</p>
                <FlatButton backgroundColor='lightgrey' onClick={this.handleOrder} label="Order Now!">  </FlatButton>
                </div>
            </div>
        );
    }
}