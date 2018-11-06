import React from "react";
import {FontIcon, RaisedButton} from "material-ui";
import {loginWithGoogle} from "../helpers/auth";
import {firebaseAuth} from "../config/constants";
import {logout} from "../helpers/auth";

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false
        };

        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    handleGoogleLogin() {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); 
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
    }

    componentWillMount() {  
        // We have appToken relevant for our backend API, redirect home
        if (localStorage.getItem(appTokenKey)) {
            this.props.history.push("/app/home");
            return;
        }

        firebaseAuth().onAuthStateChanged(user => {
            if (user) {
                if (user.email.includes('@itesm.mx')) {

                localStorage.removeItem(firebaseAuthKey);

                // store key to avoid loging in everytime.
                localStorage.setItem(appTokenKey, user.uid);

                this.props.history.push("/app/home")
                } else {
                    logout().then(function () {
                        localStorage.removeItem(appTokenKey);
                        localStorage.removeItem(firebaseAuthKey);
                        alert('Please use an @itesm.mx account');
                        this.props.history.push("/login");
                    }.bind(this));
                }
            }
        });
    }

    render() {
        console.log(firebaseAuthKey + "=" + localStorage.getItem(firebaseAuthKey));
        // if (localStorage.getItem(firebaseAuthKey) === "1") return <SplashScreen />;
        return <LoginPage handleGoogleLogin={this.handleGoogleLogin}/>;
    }
}

const iconStyles = {
    color: "#ffffff"
};
const LoginPage = ({handleGoogleLogin}) => (
    <div>
        <h1>Login</h1>
        <div>
            <RaisedButton
                label="Sign in with Google"
                labelColor={"#ffffff"}
                backgroundColor="#dd4b39"
                icon={<FontIcon className="fa fa-google-plus" style={iconStyles}/>}
                onClick={handleGoogleLogin}
            />
        </div>
    </div>
);