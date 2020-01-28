import React, {Component} from "react"
import Item from "./Item.js"
import "../../utilities.css"

/**
 *
 * Proptypes
 *
 * @property {objects} items objects with attribute name and path
*/
class ItemBar extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let items = this.props.items.map((item)=><Item name={item.name} path={item.path}/>)
    return (<>
      <div>
      {items}
      </div>
    </>);
  }
}

export default ItemBar;
