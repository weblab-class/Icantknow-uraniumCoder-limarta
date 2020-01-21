import React, {Component} from "react";
import {Redirect} from "@reach/router";
import FindGameBlock from "../modules/FindGameBlock.js";
// import "../modules/FindGameBlock.css";
import "../../utilities.css";
import {get} from "../../utilities.js";
class Find extends Component{
  constructor(props){
    super(props);
    this.state = {
        games : []
        mainGame : null
    }
  }
  componentDidMount(){
        get("/api/games").then((games)=>this.setState({games:games}))
        mainGam
  }
  render(){
    let gameBlock = "No available games"
    if(this.state.games.length!==0){
        gameBlock = this.state.games.map((game)=><FindGameBlock data={this.state.games}/>)
    }

    return (<div>
      <h1>Find Games</h1>
        {gameBlock}
    </div>);
  }
}

export default Find;
