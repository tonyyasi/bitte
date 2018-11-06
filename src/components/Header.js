import * as React from 'react';

import '../styles/header.css';

import { NavLink } from 'react-router-dom';
import {logout} from "../helpers/auth";
import {customHistory} from '../index';

const appTokenKey = "appToken"; 

export class Header extends React.Component { 

    constructor(props) {
        super(props);
    }

    handleLogout() {
        logout().then(function () {
            localStorage.removeItem(appTokenKey);
            customHistory.push("/login");
            console.log("user signed out from firebase");
        });
    }

    render() {
        return (
    <header>
        <div >
        <NavLink className="nav navItems" activeClassName="is-active" exact={true} to ="/app/home">Home</NavLink>
        <NavLink className="nav navItems" activeClassName="is-active" to ="/app/order">Order</NavLink>
        <button className="logoutButton" onClick={this.handleLogout}>Logout</button>
        </div>
    </header>
        );

}

}