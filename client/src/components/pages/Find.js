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
    };
  }
  componentDidMount(){
      // let gameId = "5e276c98a47e9303ac4d462c";
      get("/api/games", {}).then((data)=>{
        console.log(data);
        this.setState({games:data.games});
        this.setState({games_viewed:data.games});
        //Rank games by number of players
      });

      // socket.on("recent", (data) => { //
      //   //Update live based on player count
      // });
  }
  // componentDidUpdate(){
  //   //Rerender based on search results.
  // }
  findGame = (value) => {
    this.setState({games_viewed:this.state.games.filter((game) => {return game.name === value;})});
  }
  render(){
    // let gameBlock = "No available games";
    // //console.log("Render find page");
    // //console.log(this.state.games);
    // if(this.state.games.length !== 0){
    //     console.log(this.state.games_viewed)
    //
    //     //gameBlock = this.state.games_viewed.map((game)=>(<FindGameBlock data={this.state.games}/>));
    // }
    console.log(this.state.games_viewed);
    return (<div>
      <h1>Find Games</h1>
      <SearchBar onSubmit={this.findGame}/>
      <FindGameBlock games={this.state.games_viewed}/>
    </div>);
  }
}

export default Find;
