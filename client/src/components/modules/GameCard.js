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
    }
    render() {
      return (
        <div>
        <p>{this.props.name}</p>
        <p>{this.props.player_count} online</p>
        </div>
      );
    }
}

export default GameCard;
