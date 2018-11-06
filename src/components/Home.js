import React from "react";
import {logout} from "../helpers/auth";
import {Header} from './Header';

const appTokenKey = "appToken"; // also duplicated in Login.js
export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //firebaseUser: JSON.parse(localStorage.getItem("firebaseUser"))
        };

        //console.log("User:", this.state.firebaseUser);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        logout().then(function () {
            localStorage.removeItem(appTokenKey);
            this.props.history.push("/login");
            console.log("user signed out from firebase");
        }.bind(this));

    }

    render() {
        return (
            <div>
            <Header />
                <h1>Welcome to Bitte!</h1>
                <h3> Your food, when you need it!</h3>
            </div>
        );
    }
}