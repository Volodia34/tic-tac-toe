import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combination.js";
import log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";


const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
}
const initialGameBoard  = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X'

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = '0'
    }

    return currentPlayer
}

function deriveGameBoard(gameTurns) {
    let gameBodard = [...initialGameBoard.map(arr => [...arr ])]

    for (const turn of gameTurns) {
        const {square,player} = turn
        const {row, col} = square

        gameBodard[row][col] = player
    }
    return gameBodard
}

function deriveWinner(gameBodard,players) {
    let winner

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBodard[combination[0].row][combination[0].column]
        const secondSquareSymbol = gameBodard[combination[1].row][combination[1].column]
        const thirdSquareSymbol = gameBodard[combination[2].row][combination[2 ].column]

        if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol]
        }
    }
    return winner
}

function App() {
    const [players, setPlayers ] = useState(PLAYERS)
    const [gameTurns, setGameTurns] = useState([])

    const activePlayer = deriveActivePlayer(gameTurns)

    const gameBodard = deriveGameBoard(gameTurns)

    const winner = deriveWinner(gameBodard,players)

    const hasDraw = gameTurns.length === 9 && !winner
    console.log(players)

    function handleSelectSquare(rowIndex, colIndex) {
        //setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? '0' : 'X')
        setGameTurns(prevTurns => {
            const currentPlayer = deriveActivePlayer(prevTurns)
            const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: activePlayer}, ...prevTurns]


            return updatedTurns
        })

    }

    function handleRestart() {
        setGameTurns([])
    }

    function handlePlayerNameChange(symbol,newName) {
        setPlayers(prevPlayer => {
            return {
                ...prevPlayer,
                [symbol]: newName
            }
        })
    }

    return (
        <main>
            <div id='game-container'>
                <ol id='players' className='highlight-player'>
                    <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
                    <Player initialName={PLAYERS.O} symbol='0' isActive={activePlayer === '0'} onChangeName={handlePlayerNameChange}/>
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBodard}/>
            </div>
            <Log turns={gameTurns}/>
        </main>
    )
}

export default App
