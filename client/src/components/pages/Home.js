import React, {Component} from "react";
import Banner from "../modules/Banner.js";
import {Link} from "@reach/router"

import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  startCreating(){

  }
  render(){
    return (
      <>
        <Banner />
        <div onClick = {this.startCreating}/> // some CSS code for this button to make it smaller
        <div className = "u-flex"/>
          <div className = "u-grow" />
            <MainGameButton userId = {this.props.userId}/>
          </div>
          <div className = "u-groow" />
            <FindGamesButton />
          </div>
        </div>
      </>
    )
  }
}
