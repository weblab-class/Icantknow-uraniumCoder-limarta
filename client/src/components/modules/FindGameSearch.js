import React, {Component} from "react";
import {get} from "../utilities.js"
/**
 * @typedef ContentObject
 * @property {string} _id
 * @property {string} content
 */
class FindGameSearch extends Component {
    constructor(props) {
        super(props);

    handleChange = (event) => {
      this.setState({
        value: event.target.value,
      });
    };
    handleSubmit = (event) => {
      event.preventDefault();s
      this.props.onSubmit && this.props.onSubmit(this.state.value);
      this.setState({
        value: "",
      });
    };
    componentDidMount(){
      post("/api/games",params={})
    }
    render() {
      return (
        <div>
          <input
          placeholder={this.props.defaultText}
          value={this.state.value}
          onChange={this.handleChange}
          />
          <button
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
          >
          {this.props.games.map((game) =>
            <GameCard _id = {game._id} name={game.name} content = {game.content}/>)}
          </div>
      )
    }
}

export default FindGameSearch;
