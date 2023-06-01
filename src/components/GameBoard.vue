<script setup lang="ts">
import { ref } from 'vue';
import AddPlayersForm from './AddPlayersForm.vue';
import { IStateOfTheGame } from '../models/IStateOfTheGame';
import { Player } from '../models/Player';

const stateOfTheGame = ref<IStateOfTheGame>({
    players: [],
    board: ['', '', '', '', '', '', '', '', ''],
    playerTurn: 'X',
    gameStarted: false,
    winner: null,
    tiedGame: false
});

function addNewPlayers(newPlayers: string[]) {
    stateOfTheGame.value.players.push(new Player(newPlayers[0], 'X', false));
    stateOfTheGame.value.players.push(new Player(newPlayers[1], 'O', false));
    stateOfTheGame.value.gameStarted = true;
}

function makeMove(i: number) {

    if(stateOfTheGame.value.winner) {
        return;
    };

    if(stateOfTheGame.value.board[i] === 'X' || stateOfTheGame.value.board[i] === 'O') {
        return;
    } else {
        stateOfTheGame.value.board[i] = stateOfTheGame.value.playerTurn;
        if (stateOfTheGame.value.playerTurn === 'X') {
            stateOfTheGame.value.playerTurn = 'O';
        } else if (stateOfTheGame.value.playerTurn === 'O') {
            stateOfTheGame.value.playerTurn = 'X';
        };
    };
    stateOfTheGame.value.winner = checkForWinner(stateOfTheGame.value.board);

    const calculatedLength = stateOfTheGame.value.board.filter(v => v == '').length
    console.log(calculatedLength);
    
    if(stateOfTheGame.value.winner === null && calculatedLength === 0) {
        stateOfTheGame.value.tiedGame = true;
        console.log('we have a tie', stateOfTheGame.value.tiedGame);  
    };
};

function checkForWinner(board: string[]) {
    console.log('checkForWinner was invoked', board);
    const winnerCombos = [
        [0, 1 ,2],
        [3, 4 ,5],
        [6, 7 ,8],
        [0, 3 ,6],
        [1, 4 ,7],
        [2, 5 ,8],
        [0, 4 ,8],
        [2, 4 ,6],
    ];

    for (let i = 0; i < winnerCombos.length; i++) {
        const [a, b, c] = winnerCombos[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]
        };
    };
    return null;
};

</script>

<template>
    <header>
        <h1>TIC-TAC-TOE</h1>
    </header>
    <AddPlayersForm v-if="!stateOfTheGame.gameStarted" @addNewPlayers="addNewPlayers"></AddPlayersForm>
    <main v-else="stateOfTheGame.gameStarted">
        <span v-if="!stateOfTheGame.winner" class="playersturn">It's {{ stateOfTheGame.playerTurn }} turn</span>
        <div v-else class="winner">
            <span>"{{ stateOfTheGame.winner }}" is the winner!!</span><br>
            <span v-if="stateOfTheGame.winner === 'X'">Congratulations!! <br><span class="animated">{{ stateOfTheGame.players[0].name }}</span></span>
            <span v-if="stateOfTheGame.winner === 'O'">Congratulations!! <br><span class="animated">{{ stateOfTheGame.players[1].name }}</span></span>
        </div><br>
        <div class="gameBoard">
            <div class="gameBoard__cell" v-for="(cell, i) in stateOfTheGame.board" @click="makeMove(i)">
            <span>{{ stateOfTheGame.board[i] }}</span>
            </div>
        </div>
    </main>
    <footer>
        <span>Made by David in Vue for a school project</span>
    </footer>
</template>

<style scoped>
header {
    position: fixed;
    top: 0;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.playersturn {
    display: block;
    font-size: 2.5rem;
    margin-bottom: 2rem;
}
.winner {
    display: block;
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.animated {
  text-align: center;
  font-style: italic;
  font-weight: bold;  
  
  background: linear-gradient(to right, rgba(255, 255, 255, 0.87) 20%, #FF0 40%, #FF0 60%, rgba(255, 255, 255, 0.87) 80%);
  background-size: 200% auto;
  
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  animation: shine 1s linear infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
.gameBoard {
    display: grid;
    width: 30rem;
    grid-template-columns: repeat(3, 10rem);
    outline: 2px solid grey;
}
.gameBoard__cell {
    height: 10rem;
    outline: 1px solid grey;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 7rem;
}
.gameBoard__cell:hover{
    background-color:rgb(23, 25, 27);
    cursor: pointer;
}

footer {
    position: fixed;
    bottom: 0;
    text-align: right;
}
</style>
