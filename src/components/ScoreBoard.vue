<script setup lang="ts">
import { Player } from '../models/Player';

interface ScoreProps {
    players: Player[]
}

const props = defineProps<ScoreProps>();

const emits = defineEmits<{(e: 'closeScore'): void}>();

function handleClick() {
    emits('closeScore');
};

</script>

<template>
    <div class="scoreBoard">
        <h2>Scoreboard</h2>
        <div class="player__container" >
            <div class="player" v-for="player in props.players">
                <h3>{{ player.name }}</h3>
                <h3>is player "{{ player.symbol }}"</h3>
                <span>Total score is {{ player.score }} points!</span>
            </div>
        </div>
        <button @click="handleClick">Close</button>
    </div>    
</template>

<style scoped>
.scoreBoard {
    background-color: #242424;
    position: absolute;
    top: 30%;
    padding: 1rem;
    box-shadow: 5px 5px 10px gray;
    border-radius: 1rem;
    border: 2px solid gray;
}

h2 {
    margin-top: 0;
}

.player__container {
    
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5rem;
    padding: 2rem;
}

.player {
    padding: 1rem;
    box-shadow: 0px 0px 10px gray;
    border-radius: 0.5rem;
    border: 1px solid gray;
}

.player > span {
    display: block;
    margin-top: 1rem;
}

h3 {
 margin: 0;
}

button {
    margin: 1rem;
    outline: 1px solid gray;
    color: rgba(255, 255, 255, 0.87);
}
</style>
