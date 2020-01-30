import React, {Component} from "react";
import {Link} from "@reach/router";
import {get} from "../../utilities.js";
import GoogleLogin, {GoogleLogout} from "react-google-login";

import "./NavBar.css";

const GOOGLE_CLIENT_ID = "479544640691-51g8t3fnavqe7g8l4fbarhcgk6ou5ofl.apps.googleusercontent.com"

class NavBar extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    // get("/api/whoami").then((user) => {
    //   this.setState({userId: user._id});
    // });
  }
  render(){
    console.log("rendering Navbar");
    return (
      <>
        <nav className="whole-nav">
          <div className="all-options-box">
            <div className="home-box link-box">
              <Link to = "/"> Home </Link>
            </div>
            <div className="create-box link-box">
              {this.props.userId &&(
                <Link to = "/create"> Create </Link>
              )}
            </div>
            <div className="find-box link-box">
              {this.props.userId &&(
                <Link to = "/public">Find</Link>
              )}
            </div>
          </div>
          <div className="login-box">
            {this.props.userId ? (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.props.handleLogout}
                onFailure={(err) => console.log(err)}
                className="NavBar-link NavBar-login"
              />
            ) : (
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
                className="NavBar-link NavBar-login"
              />
            )}
          </div>
        </nav>
      </>
    );
  }
}

export default NavBar;
