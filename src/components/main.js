import React, { useState } from 'react';
import '../css/styles.css';

let numGuesses = 5;
const WORDS = ['Hello', 'Goodbye', 'Beans'];

function randomWord(words){
    let randIndex = Math.floor(Math.random() * words.length);
    return words[randIndex];
}

function Game(props){
    const [wordy, setWord] = useState(randomWord(WORDS).toUpperCase().split(''));
    const [blanks, setBlanks] = useState(makeBlanks(wordy).split(''));
    const [alpha, setAlpha] = useState('abcdefghijklmnopqrstuvwxyz'.split(''));
    const [guess, setGuess] = useState('');

    console.log(guess);
    console.log(wordy);
    console.log(blanks);
    console.log(alpha);

    function makeBlanks(word){
        let oString = '';
        for (let i = 0; i < word.length; i++){
                oString += '_';
        }
        return oString;
    }

    function revealWord(){
        for (let i = 0; i < blanks.length; i++){
            blanks[i] = wordy[i];
        }
    }

    function handleClick(e, guess){
        e.preventDefault();
        setGuess(guess);
        if (wordy.includes(guess)){
            for (let i = 0; i < blanks.length; i ++){
                if (wordy[i] == guess){
                    blanks[i] = guess;
                }
            }
            wordy[wordy.indexOf(guess)] = '_';
        }
        else{
            numGuesses -= 1;
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
                                numGuesses > 0 ?
                                alpha.indexOf(letter) == alpha.length - 1 ?
                                <a href='#' onClick={e => handleClick(e, letter.toUpperCase())}>{letter.toUpperCase()}</a> :
                                index == 6 || index == 15 ?
                                <><a href='#' onClick={e => handleClick(e, letter.toUpperCase())}>{letter.toUpperCase() + ' '}</a><br/></> :
                                <a href='#' onClick={e => handleClick(e, letter.toUpperCase())}>{letter.toUpperCase() + ' '}</a> :
                                <p></p>
                            }
                            </>
                        );
                    })
                }
            </div>
            {
                numGuesses > 0 ? <p>Guesses left: {numGuesses}</p> :
                <h1>Out of guesses!</h1>
            }
            <button onClick={() => {window.location.reload()}}>Reset</button>
        </div>
    )
}

export default Game;