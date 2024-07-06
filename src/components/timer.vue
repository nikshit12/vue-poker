<template>
    <div class="timer-container">
        <h2>Timer</h2>
        <div class="select is-small">
            <select v-model="selectedTime" @change="resetTimer">
                <option v-for="time in availableTimes" :key="time" :value="time">
                    {{ time === 0.5 ? '30 seconds' : time + ' minute(s)' }}
                </option>
            </select>
        </div>
        <div class="timer-display">
            <span>{{ minutes }}</span>:<span>{{ seconds }}</span>
        </div>
        <div class="button-group">
            <button class="button" @click="startTimer" :disabled="isRunning">Start</button>
            <button class="button" @click="stopTimer" :disabled="!isRunning">Stop</button>
            <button class="button" @click="resetTimer">Reset</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { timerStore } from '@/stores/timerStore'
const availableTimes = ref([0.5, 1, 5, 10, 15, 30, 60]); // Available timer durations in minutes and 30 seconds
const selectedTime = ref(1); // Default to 1 minute
const timeLeft = ref(selectedTime.value * 60); // Time left in seconds
const isRunning = ref(false);
let timerInterval = null;
const useTimerStore = timerStore()
const minutes = computed(() => Math.floor(timeLeft.value / 60).toString().padStart(2, '0'));
const seconds = computed(() => (timeLeft.value % 60).toString().padStart(2, '0'));

const startTimer = () => {
    if (isRunning.value) return;

    isRunning.value = true;
    timerInterval = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--;
        } else {
            stopTimer();
            alert('Time is up!');
        }
    }, 1000);
};

const stopTimer = () => {
    isRunning.value = false;
    clearInterval(timerInterval);
};

const resetTimer = () => {
    stopTimer();
    timeLeft.value = selectedTime.value * 60;
};


watch(isRunning, (value) => {
    useTimerStore.isTimerRunning = value
})
onMounted(() => {
    resetTimer();
});

onUnmounted(() => {
    stopTimer();
});
</script>

<style scoped>
.timer-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.timer-display {
    font-size: 2em;
    margin: 10px 0;
}

button {
    margin: 5px;
}

.button-group {
    display: flex;
    gap: 12px;
}
</style>