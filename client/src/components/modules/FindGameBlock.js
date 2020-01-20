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
            return ( <div >
                <div > {
                    this.props.games.map((comment) => ( <
                        FindGames _id = {
                            comment._id
                        }
                        content = {
                            comment.content
                        }
                        />
                    ))
                }
            )
        } <
        /div> <
        /div>
);
}
}

export default GameBlock;
