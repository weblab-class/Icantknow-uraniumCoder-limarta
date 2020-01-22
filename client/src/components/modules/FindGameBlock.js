import React, {Component} from "react";
import GameCard from "./GameCard.js"
import {get} from "../../utilities.js"
/**
 * Proptypes
 * @typedef ContentObject
 * @property {string} _id
 * @property {string} content
 */
class FindGameBlock extends Component {
    constructor(props) {
        super(props);
    }
    render() {

      return (
        <div>
          <h1>Games!</h1>
          {this.props.games.map((game) =>
            <GameCard _id = {game._id} name={game.name} player_count = {game.player_count}/>)}
        </div>
      );
    }
}

export default FindGameBlock
