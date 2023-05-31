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
    console.log('from function addNewPlayers', newPlayers[0] + ' ' + newPlayers[1]);
    stateOfTheGame.value.players.push(new Player(newPlayers[0], 'X', false));
    stateOfTheGame.value.players.push(new Player(newPlayers[1], 'O', false));
    stateOfTheGame.value.gameStarted = true;
}

</script>

<template>
    <AddPlayersForm v-if="!stateOfTheGame.gameStarted" @addNewPlayers="addNewPlayers"></AddPlayersForm>
    
    <div v-if="stateOfTheGame.gameStarted">
        <p>
            Test players from player[] {{ stateOfTheGame.players[0].name }} and {{ stateOfTheGame.players[1].name }} is {{ stateOfTheGame.players[0].symbol }} and {{ stateOfTheGame.players[1].symbol }}
        </p>
    </div>
</template>

<style scoped>

</style>
