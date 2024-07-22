<template>
    <div class="container">
        <p>Ticket: {{ useTicketStore.currentTicket.name.toUpperCase() }}</p>
        <div class="card-container">
            <div class="card value-card" :class="{ 'selected': selectedCard === index }" v-for="(card, index) in cards"
                :key="card" @click="selectedCard = index">
                {{ card }}
            </div>
            <div class="card value-card" :class="{ 'selected': selectedCard === -1 }" @click="selectedCard = -1">
                ?
            </div>
        </div>
        <button class="button" @click="handleSubmit">Submit</button>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { ticketStore } from "@/stores/ticketStore.js";
import { useRoute } from "vue-router";

const useTicketStore = ticketStore()
const route = useRoute()
const ticketId = route.params.id
const cards = [1, 2, 3, 5, 8, 13, 21, 44]
const selectedCard = ref(-1)

function handleSubmit() {
    ticketId
    useTicketStore.setTicketValue(ticketId, selectedCard.value)
}
</script>

<style lang="scss" scoped>
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.value-card {
    text-align: center;
    height: 100px;
    align-content: center;
    flex: 0 0 calc(33.3% - 10px);
    box-sizing: border-box;
    cursor: pointer;

    &.selected {
        border: 1px solid greenyellow;
    }
}
</style>
