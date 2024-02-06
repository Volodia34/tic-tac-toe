import React from 'react';

const initialGameBoard  = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]


function  GameBoard({onSelectSquare,board}) {

    // const [gameBodard, setGameBoard] = useState(initialGameBoard)
    //
    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBorad = [...prevGameBoard.map(innerArray => [...innerArray])]
    //         updatedBorad[rowIndex][colIndex] = activePlayerSymbol
    //         return updatedBorad
    //     })
    //
    //     onSelectSquare( )
    // }

    return (
        <ol id='game-board'>
            {board.map((row,rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex) => <li key={colIndex}><button onClick={() => onSelectSquare(rowIndex,colIndex)}disabled={playerSymbol !== null}>{playerSymbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    );
}

export default GameBoard;