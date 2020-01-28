import React, {Component} from "react";
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
        this.state = {name: "", player_count: 0};
    }
    componentDidMount() {
      get("/api/gameInfo", {gameId: this.props.gameId}).then((data) => {
        this.setState({name: data.name, player_count: data.player_count});
      });
    }
    render() {
      return (
        <div>
        <p>{this.state.name}</p>
        <p>{this.state.player_count} online</p>
        </div>
      );
    }
}

export default GameCard;
