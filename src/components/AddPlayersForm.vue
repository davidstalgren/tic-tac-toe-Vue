<script setup lang="ts">
import { ref } from 'vue';

const newPlayer1 = ref('');
const newPlayer2 = ref('');

const emit = defineEmits<{(e: 'addNewPlayers', newPlayers: string[]): void}>();

function handleSubmit(newPlayer1: string, newPlayer2: string) {
    emit('addNewPlayers', [newPlayer1, newPlayer2])
}

</script>

<template>
    <form class="addPlayerForm" @submit.prevent="handleSubmit(newPlayer1, newPlayer2)">
        <label>Player name for X: <input v-model="newPlayer1" type="text" /></label><br>
        <label>Player name for O: <input v-model="newPlayer2" type="text" /></label><br>
        <button>Start your game!</button>
    </form>
</template>

<style scoped>
input {
    margin-bottom: 1rem;
}

button {
    margin-top: 1rem;
}
</style>
