import React from 'react';
import {Header} from './Header';

export default class PastOrders extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    render() {
        return (
            <div>
                <Header />
                
                
            </div>
        )
    }
}