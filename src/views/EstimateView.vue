<template>
    <div class="container">
        <h2 class="title is-4">Estimation for: {{ useRoomStore.currentTicket.ticketName.toUpperCase() }}</h2>
        <div class="estimation-block">
            <span class="tag is-primary is-medium">Average estimate : {{ useRoomStore.currentTicket.averageEstimation
                }}</span>
            <button class="button ml-3" :disabled="useTimerStore.isTimerRunning"
                @click="showEstimation = !showEstimation">{{ showEstimation ? 'Hide' : 'Show' }}
                Estimation</button>
            <button class="button ml-3" @click="handleCopy">Copy link</button>
        </div>
        <timer></timer>
        <div class="players-container">
            <div class="player" v-for="player in usePlayerStore.players" :key="player">
                {{ player.name }}

                <p v-if="showEstimation">{{ player.estimation }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { roomStore } from '@/stores/roomStore';
import { playerStore } from '@/stores/playerStore'
import timer from '@/components/timer.vue'
import { ref } from 'vue';
import { timerStore } from '@/stores/timerStore';
import useCopy from '@/utils/useCopy'
const useRoomStore = roomStore()
const usePlayerStore = playerStore()
const useTimerStore = timerStore()
const showEstimation = ref(false)

function handleCopy() {
    const url = `${window.location.href}/vote`
    useCopy().copyToClipboard(url)
}
</script>
<style lang="scss" scoped>
.players-container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 20px;

    .player {
        display: inline-block;
        position: relative;
        height: 200px;
        width: 200px;
        border: 1px solid #ffffff70;
        text-align: center;
        border-radius: 10px;
        padding: 20px;
    }
}

.estimation-block {
    display: flex;
    align-items: center;
}
</style>