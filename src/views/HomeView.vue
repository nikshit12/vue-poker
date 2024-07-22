<template>
  <div class="container">
    <div class="fixed-grid has-3-cols">
      <div class="grid">
        <div class="cell">
          <div class="card p-4">
            <RouterLink to="/create">Create Room</RouterLink>
          </div>
        </div>
        <div class="cell">
          <div class="card p-4">
            <RouterLink to="/join">Join Room</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <h4 class="title is-4">Your Rooms</h4>
    <div class="grid is-col-min-12">
      <div v-for="room in useRoomStore.rooms" :key="room.id" class="cell">
        <div class="card p-4">
          <div class="mb-2">
            <p>{{ room.name }}</p>
            <span>Created by:</span> <span>{{ room.ownerEmail }}</span>
          </div>
          <button class="button" @click="$router.push(`/room/${room.id}`)">Join</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { roomStore } from '@/stores/roomStore';
import { RouterLink } from 'vue-router';
const useRoomStore = roomStore()


</script>