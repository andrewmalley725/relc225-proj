import React, { useState } from 'react';
import '../css/styles.css';
import wordsJSON from '../js/words'

let numGuesses = 8;

function randomWord(words){
    let randIndex = Math.floor(Math.random() * words.length);
    return words[randIndex];
}

let word = randomWord(wordsJSON);

function Game(props){
    const [wordy, setWord] = useState(word['word'].toUpperCase().split(''));
    const [blanks, setBlanks] = useState(makeBlanks(wordy).split(''));
    const [alpha, setAlpha] = useState('abcdefghijklmnopqrstuvwxyz'.split(''));
    const [guess, setGuess] = useState('');

    function makeBlanks(word){
        let oString = '';
        for (let i = 0; i < word.length; i++){
            if (word[i] == ' ') {
                oString += ' ';
            }
            else{
                oString += '_';
            }
            
        }
        return oString;
    }

    function solved(lst){
        let vool = true;
        let lst2 = []
        for (let i of lst) {
            if (i != ' '){
                lst2.push(i);
            }
        }
        for (let i of lst2){
            if (i != '_'){
                vool = false;
            }
        }
        return vool;
    }

    function handleClick(e, guess){
        e.preventDefault();
        setGuess(guess);
        if (wordy.includes(guess)){
            for (let i = 0; i < blanks.length; i ++){
                if (wordy[i] == guess){
                    blanks[i] = guess;
                    wordy[i] = '_';
                }
            }
            
        }
        else{
            numGuesses -= 1;
        }

        if (numGuesses == 0){
            for (let i = 0; i < blanks.length; i ++){
                blanks[i] = word['word'][i].toUpperCase();
            }
        }

        alpha[alpha.indexOf(guess.toLowerCase())] = '_';
        
    }
    
    return(
        <div id='main'>
            <h1 id="title">Kirtland Revelations</h1>
            <div id='game'>
                <h1 id='word'>
                    {
                        blanks.map((i, index) => {
                            return(
                                <>
                                {
                                    index == blanks.length - 1 ?
                                    <>{i}</> : i == ' ' ? <br/> : <>{i + ' '}</>
                                }
                                </>
                            )
                        })
                    }
                </h1>
                <div id='alpha'>
                        {
                            solved(wordy) ? <p style={{color: 'green', fontSize: '30px'}}>Solved!</p> : numGuesses == 0 ? 
                            <p style={{color: 'red', fontSize: '30px'}}>Out of guesses!</p> :
                            alpha.map((letter, index) => {
                                return(
                                    <>
                                    {
                                        index == alpha.length - 1 ? letter == '_' ? <>{letter}</> :
                                        <a href='#' onClick={e => handleClick(e, letter.toUpperCase())}>{letter.toUpperCase()}</a> :
                                        index == 6 || index == 15 ? letter == '_' ? <><>{letter + ' '}</><br/></> :
                                        <><a href='#' onClick={e => handleClick(e, letter.toUpperCase())}>{letter.toUpperCase() + ' '}</a><br/></> :
                                        letter == '_' ? <>{letter + ' '}</> :
                                        <a href='#' onClick={e => handleClick(e, letter.toUpperCase())}>{letter.toUpperCase() + ' '}</a> 
                                    }
                                    </>
                                );
                            })
                        }
                        
                </div>
                        <div id="footer">
                            {
                                solved(wordy) || numGuesses == 0 ? <div>
                                                        <p>Fun fact: {word['info']}</p>
                                                        <p>Click <a id='info' target='blank' href={word['site']}>here</a> for more info</p>
                                                </div> :
                                <p style={{display: numGuesses > 0 ? 'block' : 'none'}}> Guesses remaining: {numGuesses}</p>
                            }
                        </div>
                <br></br>
                <button onClick={() => {window.location.reload()}}>Reset</button>
            </div>
        </div>
    )
}

export default Game;