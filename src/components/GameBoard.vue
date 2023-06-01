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
    winner: null
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

    if(stateOfTheGame.value.winner) {
        console.log('we have a winner and it is!!!', stateOfTheGame.value.winner);  
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
        <span v-else class="winner"> "{{ stateOfTheGame.winner }}" is the winner!!</span>
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
.playersturn {
    display: block;
    font-size: 3rem;
    margin-bottom: 2rem;
}
.winner {
    display: block;
    font-size: 3rem;
    margin-bottom: 2rem;
}
.gameBoard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    outline: 2px solid grey;
}
.gameBoard__cell {
    width: 10rem;
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
