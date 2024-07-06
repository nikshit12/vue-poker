<template>
    <div class="container">
        <div class="fixed-grid has-4-cols">
            <div class="grid">
                <div class="cell is-col-span-3">
                    <div class=" control">
                        <input class="input" v-model="useRoomStore.roomName" type="text" placeholder="Create room" />
                    </div>
                </div>
                <div class="cell">
                    <div class="control">
                        <button class="button" @click="handleCreate">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { roomStore } from "@/stores/roomStore.js";
import { useRouter } from "vue-router";
const useRoomStore = roomStore()
const router = useRouter()
function handleCreate() {
    useRoomStore.createRoom()
    router.push("/")
    useRoomStore.roomName = ""
}

</script>