import React, {Component} from "react";
import GameCard from "./GameCard.js"
import {get} from "../../utilities.js"
/**
 * @typedef ContentObject
 * @property {string} _id
 * @property {string} content
 */
class FindGameBlock extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
      // console.log(this.props.data)
    }
    render() {
      // {this.props.games.map((game) =>
      //   <GameCard _id = {game._id} name={game.name} content = {game.content}/>)}
      return (
        <div>
          <h1>Games!</h1>
        </div>
      );
    }
}

export default FindGameBlock
