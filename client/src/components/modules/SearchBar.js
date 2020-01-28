import React, {Component} from "react";
import {get,post} from "../../utilities.js"
/**
 * @typedef ContentObject
 * @property onSubmit
 */
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value : ""
        }
    }
    handleChange = (event) => {
      this.setState({
        value: event.target.value,
      });
    };
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit && this.props.onSubmit(this.state.value);
      this.setState({
        value: "",
      });
    };
    componentDidMount(){
    }

    render() {
      return (
      <div>
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Search
        </button>
        </div>
      );
    }
}

export default SearchBar;
