import React, {Component} from "react";
import {get} from "../utilities.js"
/**
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
        {this.props.games.map((game) =>
          <GameCard _id = {game._id} name={game.name} content = {game.content}/>)}
        </div>
      )
    }
}

export default FindGameBlock;
