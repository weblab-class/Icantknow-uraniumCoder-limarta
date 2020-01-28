import React, {Component} from "react";
import Item from "./Item.js";
import {useDrop} from 'react-dnd';
import ItemTypes from "../../ItemTypes.js";
import "../../utilities.css";

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
 * @property {objects[]} items components with positions
*/
const Board = (props)=>{
  const [{ canDrop, isOver }, drop] = useDrop({
      accept: ItemTypes.BOX,
      drop: () => ({ name: 'Board' }),
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    })
  let items = props.items.map(item => item.item);
  return (<>
    <div ref={drop} style={{...style}}>
      <h1>Board</h1>
      {items}
    </div>
  </>);
}

export default Board;
