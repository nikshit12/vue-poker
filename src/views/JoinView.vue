<template>
    <div class="container">
        <div class="fixed-grid has-4-cols">
            <div class="grid">
                <div class="cell is-col-span-3">
                    <div class=" control">
                        <input class="input" v-model="searchText" type="text" placeholder="Search by room" />
                    </div>
                </div>
                <div class="cell">
                    <div class="control">
                        <button class="button" @click="hanldeSearch">Search</button>
                    </div>
                </div>
            </div>
        </div>
        <h4 class="title is-4">Searched Rooms</h4>
        <div class="grid is-col-min-12">
            <div v-for="room in roomStore().searchedRooms" :key="room.id" class="cell">
                <div class="card p-4">
                    <div class="mb-2">
                        <p>{{ room.name }}</p>
                        <span>Created by:</span> <span>{{ room.ownerEmail }}</span>
                    </div>
                    <button class="button" @click="handleJoin(room.id, room.ownerId)">Join</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { authStore } from "@/stores/authStore";
import { roomStore } from "@/stores/roomStore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
const searchText = ref('')
function hanldeSearch() {
    roomStore().searchRoomByName(searchText.value)
}

function handleJoin(roomId, ownerId) {
    if (authStore().isMainUser(ownerId)) {
        router.push(`/room/${roomId}`)
    } else {
        router.push(`/join-room/${roomId}`)
    }
}
</script>