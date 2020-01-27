import React, {Component} from "react";
import {useDrag} from "react-dnd";
import ItemTypes from "../../ItemTypes.js";
import "../../utilities.css"
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}
/**
 *
 * Proptypes
 *
 * @property {String} name each item name
 * @property {String} path lists each item's image path
*/
const Item = (props)=>{
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: ItemTypes.BOX },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  console.log("Dragging" + isDragging)
  return (<>
    <div ref={drag} style={{...style}}>
    <span>{props.name}</span>
    <img src={props.path} alt={props.path}/>
    </div>
  </>);
}

export default Item;
