<template>
    <div class="container">
        <div class="fixed-grid has-4-cols">
            <div class="grid">
                <div class="cell is-col-span-3">
                    <div class=" control">
                        <input class="input" v-model="ticketName" type="text" placeholder="Ticket number" />
                    </div>
                </div>
                <div class="cell">
                    <div class="control">
                        <button class="button" @click="handleAdd">Add Ticket</button>
                    </div>
                </div>
            </div>
        </div>
        <h4 class="title is-4">Your Tickets</h4>
        <div class="grid is-col-min-12">
            <div v-for="ticket in tickets" :key="ticket" class="cell">
                <div class="card p-4">
                    <div class="mb-2">
                        <p>{{ ticket.ticketName.toUpperCase() }}</p>
                    </div>
                    <button class="button" @click="handleEstimationClick(ticket)">Get Estimation</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { roomStore } from "@/stores/roomStore.js";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const useRoomStore = roomStore()
const route = useRoute()
const router = useRouter()
const ticketName = ref('')
const tickets = computed(() => {
    return useRoomStore.getTickets(route.params.id)
})

function handleEstimationClick(ticket) {
    useRoomStore.currentTicket = ticket
    router.push(`/estimate/${ticket.ticketId}`)
}

function handleAdd() {
    useRoomStore.addTicket(route.params.id, ticketName.value)
    ticketName.value = ""
}

</script>