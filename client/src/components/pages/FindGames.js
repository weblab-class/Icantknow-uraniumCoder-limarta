import React, {Component} from "react";
import {Redirect} from "@reach/router";
import "../../utilities.css";
import {get} from "../../utilities.js";

class FindGames extends Component{
  constructor(props){
    super(props);
    this.state = {
        games : []
    }
  }
  componentDidMount(){
        get("/api/games").then((games)=>this.setState({games:games}))
  }
  render(){
    let gameBlock = "No available games"
    if(games.length!==0){
        gameBlock = this.state.games.map((game)=><FindGameBlock data={this.state.games}/>)
    }

    return (<div>
        <FindGameBlock defaultText="" value=""/>
        {gameBlock}
    </div>);
  }
}

export default FindGames;
