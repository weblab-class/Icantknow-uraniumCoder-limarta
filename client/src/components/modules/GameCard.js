import React, {Component} from "react";
import {Redirect} from "@reach/router";
import {get} from "../../utilities.js"
/**
 * @typedef ContentObject
 * @property {string} _id of the game
 * @property {string} name of the game
 * @property {string} player_count of the game
 */
class GameCard extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "", player_count: 0, redirect: false};
    }
    componentDidMount() {
      get("/api/gameInfo", {gameId: this.props.gameId}).then((data) => {
        this.setState({name: data.name, player_count: data.player_count});
      });
    }
    enterGame = () => {
      this.setState({redirect: "game"});
    }
    render() {
      if(this.state.redirect){
        return (<Redirect to={`/game/${this.props.gameId}`} />);
      }
      return (
        <div>
          <button onClick = {this.enterGame}>{this.state.name}</button>
          <p>{this.state.player_count} online</p>
        </div>
      );
    }
}

export default GameCard;
