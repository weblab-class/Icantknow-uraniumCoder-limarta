import React, {Component} from "react"
import "../../utilities.css"

/**
 *
 * Proptypes
 *
 * @property {String} item_name each item name
 * @property {String} item_url lists each item's image path
*/
class ItemBar extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<>
      <div>
      {this.props.item_name}
      {this.props.item_url}
      </div>
    </>);
  }
}

export default ItemBar;
