import React, {Component} from "react";
import {Link} from "@reach/router";
import {get} from "../../utilities.js";
import GoogleLogin, {GoogleLogout} from "react-google-login";

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
        <Link to = "/"> Home </Link>
        {this.props.userId &&(
          <Link to = "/create"> Create </Link>
        )}
        {this.props.userId &&(
          <Link to = "/public">Find</Link>
        )}
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
      </>
    );
  }
}

export default NavBar;
