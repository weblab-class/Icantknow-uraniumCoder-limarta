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
        games : [],
        mainGame : null
    }
  }
  componentDidMount(){
    let gameId = "5e276c98a47e9303ac4d462c";
    get("/api/found", {gameId:gameId}).then((games)=>{
      this.setState({games:games})
    });
  }
  render(){
    let gameBlock = "No available games"
    console.log("Render find page")
    console.log(this.state.games)
    if(this.state.games.length !== 0){
        gameBlock = this.state.games.map((game)=><FindGameBlock data={this.state.games}/>)
    }

    return (<div>
      <h1>Find Games</h1>
        {gameBlock}
    </div>);
  }
}

export default Find;
