import React, {Component} from 'react';
import Square from "./Square"
import './Components.css'
import destroyer from './Destroyer.png';
import destroyer1 from './Destroyer1.png';
class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            board: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            counter: 0,
            gameState: false,
            shipSpots: [],
            hitSpots: [],
        }
    }


    startGame = () => {
        let newShipSpots = []
        let newBoard = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
        for(let i = 0; i < 5; i++){
            let randomNumber = Math.floor(Math.random() * 99)
            while(newShipSpots.includes(randomNumber)){
                randomNumber = Math.floor(Math.random() * 99)
            }
            newShipSpots.push(randomNumber);
        }
        this.setState({shipSpots: newShipSpots, counter: 25, gameState: true, board: newBoard})
    }

    handleLocation = (index) => {
        if (this.state.gameState) {
        let {counter, hitSpots, board, shipSpots} = this.state
        if(shipSpots.includes(index) && board[index] === ""){
            counter--
            board[index] = <img src={destroyer1} />
            hitSpots.push(index);
        }
        else if(board[index] === "") {
            counter--
            board[index] = "💥"
        }
            this.setState({board: board, counter: counter, hitSpots: hitSpots})
            this.checkWin()
            console.log(shipSpots)
        }
    }

    checkWin = () => {
        let {board, hitSpots, shipSpots, counter} = this.state
        if (hitSpots.length === shipSpots.length){
            alert("You Win")
            this.setState({counter: 0, gameState: false})
        }
        else if (counter <= 0 ) {
            alert("You Lose!")
            for(let i=0; i < shipSpots.length; i++)
            {board[shipSpots[i]] = <img src={destroyer} />}
            this.setState({board: board, counter: 0, gameState: false})
        }
    }

    render(){
        let square = this.state.board.map((value, index) => {
            return (
                <Square
                    handleLocation={ this.handleLocation }
                    index={ index }
                    value={ value }
                    key={ index }
                />
            )
          }
      )

    return(
        <>
            <div className="board">
                { square }
            </div>
            <div className="ctext">
                Counter: {this.state.counter}
                <button onClick={this.startGame}> Start Game </button>
            </div>
        </>
        );
    }
}

export default Board
