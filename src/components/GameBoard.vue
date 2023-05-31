<script setup lang="ts">
import { ref } from 'vue';
import AddPlayersForm from './AddPlayersForm.vue';
import { IStateOfTheGame } from '../models/IStateOfTheGame';
import { Player } from '../models/Player';

const stateOfTheGame = ref<IStateOfTheGame>({
    players: [],
    board: ['', '', '', '', '', '', '', '', ''],
    playerTurn: 'X',
    gameStarted: false
});

function addNewPlayers(newPlayers: string[]) {
    stateOfTheGame.value.players.push(new Player(newPlayers[0], 'X', false));
    stateOfTheGame.value.players.push(new Player(newPlayers[1], 'O', false));
    stateOfTheGame.value.gameStarted = true;
}

</script>

<template>
    <AddPlayersForm v-if="!stateOfTheGame.gameStarted" @addNewPlayers="addNewPlayers"></AddPlayersForm>
    
    <div class="gameBoard" v-if="stateOfTheGame.gameStarted">
        <div class="gameBoard__cell" v-for="item in stateOfTheGame.board"></div>
    </div>
</template>

<style scoped>
.gameBoard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    outline: 2px solid grey;
}
.gameBoard__cell {
    width: 15rem;
    height: 15rem;
    outline: 1px solid grey;
}
.gameBoard__cell:hover{
    background-color:rgb(23, 25, 27);
    cursor: pointer;
}
</style>
