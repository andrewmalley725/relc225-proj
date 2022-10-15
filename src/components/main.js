import React, { useState } from 'react';
import '../css/styles.css';

function makeBlanks(word){
    let oString = '';
    for (let i = 0; i < word.length; i++){
        if (i == word.length - 1){
            oString += '_';
        }
        else{
            oString += '_ ';
        }
    }
    return oString;
}

function Game(props){
    const [blanks, setBlanks] = useState(makeBlanks(props.word));
    const [alpha, setAlpha] = useState('abcdefghijklmnopqrstuvwxyz'.split(''));
    
    return(
        <div>
            <h1>{blanks}</h1>
            <div id='alpha'>
                {
                    alpha.map((letter, index) => {
                        return(
                            <>
                            {
                                alpha.indexOf(letter) == alpha.length - 1 ?
                                <a href='#'>{letter.toUpperCase()}</a> :
                                alpha.indexOf(letter) == 7 || alpha.indexOf(letter) == 16 ?
                                <><a href='#'>{letter.toUpperCase() + ' '}</a><br/></> :
                                <a href='#'>{letter.toUpperCase() + ' '}</a>
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