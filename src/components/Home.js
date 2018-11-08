import React from "react";
import {logout} from "../helpers/auth";
import {Header} from './Header';
import { customHistory } from "../index";

const appTokenKey = "appToken"; // also duplicated in Login.js
export default class Home extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    constructor(props) {
        super(props);

        //console.log("User:", this.state.firebaseUser);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        logout().then(function () {
            localStorage.removeItem(appTokenKey);
            customHistory.push("/login");
            console.log("user signed out from firebase");
        }.bind(this));

    }

    render() {
        console.log(this.currentUser);
        return (
            <div>
            <Header />
                <h1>Welcome to Bitte!</h1>
                <h3> Your food, when you need it!</h3>
            </div>
        );
    }
}