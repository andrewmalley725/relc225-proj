import React, { useState } from 'react';
import '../css/styles.css';

function Game(props){
    const [wordy, setWord] = useState(props.word.toUpperCase().split(''));
    const [blanks, setBlanks] = useState(makeBlanks(wordy).split(''));
    const [alpha, setAlpha] = useState('abcdefghijklmnopqrstuvwxyz'.split(''));
    const [guess, setGuess] = useState('');

    console.log(guess);
    console.log(wordy);
    console.log(blanks);

    function makeBlanks(word){
        let oString = '';
        for (let i = 0; i < word.length; i++){
                oString += '_';
        }
        return oString;
    }

    function handleClick(e, guess){
        e.preventDefault();
        setGuess(guess);
        if (wordy.includes(guess)){
            blanks[wordy.indexOf(guess)] = guess;
            wordy[wordy.indexOf(guess)] = '_'
        }

        alpha[alpha.indexOf(guess.toLowerCase())] = '_';
        
    }
    
    return(
        <div style={{textAlign: 'center'}}>
            <h1>
                {
                    blanks.map(i => {
                        return(
                            <>
                            {
                                blanks.indexOf(i) == blanks.length - 1 ?
                                <>{i}</> : <>{i + ' '}</>
                            }
                            </>
                        )
                    })
                }
            </h1>
            <div id='alpha'>
                {
                    alpha.map((letter, index) => {
                        return(
                            <>
                            {
                                alpha.indexOf(letter) == alpha.length - 1 ?
                                <a href='#' onClick={e => handleClick(e, letter.toUpperCase())}>{letter.toUpperCase()}</a> :
                                alpha.indexOf(letter) == 6 || alpha.indexOf(letter) == 15 ?
                                <><a href='#' onClick={e => handleClick(e, letter.toUpperCase())}>{letter.toUpperCase() + ' '}</a><br/></> :
                                <a href='#' onClick={e => handleClick(e, letter.toUpperCase())}>{letter.toUpperCase() + ' '}</a>
                            }
                            </>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Game;