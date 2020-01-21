import React, {Component} from "react";
import {get} from "../../utilities.js"
/**
 * @typedef ContentObject
 * @property {string} _id of the game
 * @property {string} name of the game
 * @property {string} content of th game
 */
class GameCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <div>
          <p>{this.props.name}</p>
          {/* <img src="" alt="Icon"/> */}
        </div>
      );
    }
}

export default GameCard;
