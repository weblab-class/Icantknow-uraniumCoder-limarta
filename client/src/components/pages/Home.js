import React, {Component} from "react";
import {Redirect} from "@reach/router";
import Banner from "../modules/Banner.js";
import MainGameButton from "../modules/MainGameButton.js";
import FindGamesButton from "../modules/FindGamesButton.js";

import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect : false
    };
  }
  componentDidMount(){

  }
  startCreating = () => {
    this.setState({redirect : "create"});
  }
  render(){
    if(this.state.redirect){
      return (<Redirect to="/create"/>);
    }
    return (
      <>
        <Banner/>
        <div className = "u-justifyCenter u-alignCenter">
          <div className = "u-textbox" onClick = {this.startCreating}> Start Creating </div>
        </div>
        <div className = "u-flex">
          <div className = "u-grow" >
            <MainGameButton />
          </div>
          <div className = "u-groow" >
            <FindGamesButton />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
