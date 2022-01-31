import React, { useState } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';

import Footer from './Footer.jsx';
import './App.css';

const choices = [
    { type: 'rock', id: 1, loseTo: 2, component: Rock },
    { type: 'paper', id: 2, loseTo: 3, component: Paper },
    { type: 'scissors', id: 3, loseTo: 1, component: Scissors },
];

export default function App() {
    const [status, setStatus] = useState({
        wins: 0,
        losses: 0,
        ties: 0,
    });

    const [gameState, setGameState] = useState(null);

    const [usersHand, setUsersHand] = useState(null);
    const [computersHand, setComputersHand] = useState(null);

    const checkForResults = idOfChoice => {
        const computersChoice =
            choices[Math.floor(Math.random() * choices.length)];

        const usersChoice = choices[idOfChoice];

        setUsersHand(usersChoice.component);
        setComputersHand(computersChoice.component);

        console.log('User Choice:', usersChoice.type);
        console.log('Computers Choice:', computersChoice.type);

        if (computersChoice === usersChoice) {
            setGameState('draw');
            return setStatus({ ...status, ties: status.ties + 1 });
        }

        if (usersChoice.id === computersChoice.loseTo) {
            setGameState('win');
            return setStatus({ ...status, wins: status.wins + 1 });
        }

        setGameState('lose');
        return setStatus({ ...status, losses: status.losses + 1 });
    };

    const restartGame = () => {
        setGameState(null);
    };

    return (
        <div className="app">
            {/* information goes here */}
            <div className="info">
                <h2>Rock. Paper. Scissors</h2>

                {/* wins vs losses stats */}
                <div className="wins-losses-ties">
                    <div className="wins">
                        <span className="number">{status.wins}</span>
                        <span className="text">
                            {status.wins === 1 ? 'Win' : 'Wins'}
                        </span>
                    </div>

                    <div className="losses">
                        <span className="number">{status.losses}</span>
                        <span className="text">
                            {status.losses === 1 ? 'Loss' : 'Losses'}
                        </span>
                    </div>

                    <div className="ties">
                        <span className="number">{status.ties}</span>
                        <span className="text">
                            {status.ties === 1 ? 'Tie' : 'Ties'}
                        </span>
                    </div>
                </div>
            </div>

            {/* the popup to show win/loss/draw */}
            {gameState && (
                <div className={`game-state ${gameState}`}>
                    <div>
                        <div className="game-state-content">
                            <p>{usersHand}</p>
                            <p>{gameState}</p>
                            <p>{computersHand}</p>
                        </div>
                        <button onClick={restartGame}>Play Again</button>
                    </div>
                </div>
            )}

            <div className="choices">
                {/* choices captions */}
                <div className="description">You</div>
                <div />
                <div className="description">Computer</div>

                {/* buttons for my choice */}
                <div>
                    <button onClick={() => checkForResults(0)} className="rock">
                        <Rock />
                    </button>
                    <button
                        onClick={() => checkForResults(1)}
                        className="paper"
                    >
                        <Paper />
                    </button>
                    <button
                        onClick={() => checkForResults(2)}
                        className="scissors"
                    >
                        <Scissors />
                    </button>
                </div>

                <div className="vs">vs</div>

                {/* show the computer's choice */}
                <div>
                    <button className="computer-choice">?</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
