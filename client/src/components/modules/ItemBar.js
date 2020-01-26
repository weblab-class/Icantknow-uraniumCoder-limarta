import React, {Component} from "react"
import "../../utilities.css"

/**
 *
 * Proptypes
 *
 * @property {String} items lists each item name
 * @property {String} item_urls lists each item's image path
*/
class ItemBar extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<>
      <div>
      {this.props.items}
      {this.props.item_urls}
      </div>
    </>);
  }
}

export default ItemBar;
