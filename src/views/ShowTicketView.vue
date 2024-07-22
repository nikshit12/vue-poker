<template>
    <div class="container">
        <h4 class="title is-4">Tickets</h4>
        <div class="grid is-col-min-12">
            <div v-for="ticket in useTicketStore.currentRoomTickets" :key="ticket" class="cell">
                <div class="card p-4">
                    <div class="mb-2">
                        <p>{{ ticket.name.toUpperCase() }}</p>
                    </div>
                    <button class="button" @click="handleEstimate(ticket.id)">Estimate</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { authStore } from "@/stores/authStore";
import { roomStore } from "@/stores/roomStore.js";
import { ticketStore } from "@/stores/ticketStore.js";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const useRoomStore = roomStore()
const useTicketStore = ticketStore()
const route = useRoute()
const router = useRouter()
const roomId = route.params.id

function handleEstimate(id) {
    router.push(`/estimate/${id}`)
}

onMounted(() => {
    useTicketStore.getCurrentRoomTickets(roomId)
})

</script>