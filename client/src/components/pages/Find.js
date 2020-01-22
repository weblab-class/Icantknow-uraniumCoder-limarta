import React, {Component} from "react";
import {Redirect} from "@reach/router";
import FindGameBlock from "../modules/FindGameBlock.js";
import SearchBar from "../modules/SearchBar.js";
// import "../modules/FindGameBlock.css";
import "../../utilities.css";
import {get} from "../../utilities.js";

/**
 * @typedef ContentObject
 * @property {string} userId
 */
class Find extends Component{
  constructor(props){
    super(props);
    this.state = {
        games : [],
        games_viewed: [],
        mainGame : null
    }
  }
  componentDidMount(){
      let gameId = "5e276c98a47e9303ac4d462c";
      get("/api/found", {gameId:gameId}).then((games)=>{
        this.setState({games:games})
        this.setState({games_viewed:games})
        //Rank games by number of players
      });

      socket.on("recent", (data) => { //
        //Update live based on player count
      });
  }
  // componentDidUpdate(){
  //   //Rerender based on search results.
  // }
  findGame = (value) => {
    this.setState({games_viewed:this.state.games.filter((game) => game.name === value})
  };
  render(){
    let gameBlock = "No available games"
    console.log("Render find page")
    console.log(this.state.games)
    if(this.state.games.length !== 0){
        gameBlock = this.state.games_viewed.map((game)=><FindGameBlock data={this.state.games}/>)
    }

    return (<div>
      <h1>Find Games</h1>
      <SearchBar onSubmit={this.findGame}/>
      {gameBlock}
    </div>);
  }
}

export default Find;
