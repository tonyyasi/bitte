import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Redirect, Route, Router} from "react-router";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import createBrowserHistory from "history/createBrowserHistory";
import Login from "./components/Login";
import Home from './components/Home';
import Order from './components/Order';

const muiTheme = getMuiTheme({
    appBar: {
        color: "#37517E",
        height: 50
    },
});

injectTapEventPlugin();

export const customHistory = createBrowserHistory();
const Root = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={customHistory}>
            <div>
                <Route path="/login" component={Login}/>
                <Route path="/app/home" component={Home}/>
                <Route path="/app/order" component={Order} />
                <Redirect from="/" to="/login"/>
            </div>
        </Router>
    </MuiThemeProvider>
);
ReactDOM.render(<Root />, document.getElementById('root'));

