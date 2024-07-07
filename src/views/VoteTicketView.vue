<template>
    <div v-if="voterStore().voteMode">
        <h4 class="title is-4">{{ `${voterStore().voterName},` }}Vote here</h4>
        <div v-if="showVoterBox" class="vote-box">
            <div class="left">
                <div class="grid">
                    <div class="cardBlock" :class="{ 'is-selected': selected == i }" v-for="i in fibSeries" :key="i"
                        @click="setValue(i)">
                        {{ i }}
                    </div>
                    <div class="cardBlock" :class="{ 'is-selected': unknownSelected }" @click="handleUnknown">
                        ?
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="box" v-for="ticket in voterStore().currentRoom?.tickets" :key="ticket.ticketId">
                    {{ ticket.ticketName.toUpperCase() }}
                </div>
            </div>
        </div>
        <div v-else class="grid mb-4">
            <input class="input cell is-col-span-2" v-model.trim="voterStore().voterName" type="text"
                placeholder="Your Name">
            <button class="cell button" @click="handleSubmit">Submit</button>
        </div>
    </div>
</template>
<script setup>
import { voterStore } from "@/stores/voterStore"
import { computed, onMounted, ref } from "vue";
const showVoterBox = ref(false)
const fibSeries = [1, 2, 3, 5, 8, 13, 21]
const selected = ref(0)
const unknownSelected = ref(false)
function handleSubmit() {
    if (voterStore().voterName.length > 0) {
        showVoterBox.value = true
    }
}

function setValue(val) {
    selected.value = val
    unknownSelected.value = false
}

function handleUnknown() {
    selected.value = 0
    unknownSelected.value = !unknownSelected.value

}
onMounted(() => {
    voterStore().getRoomById()
})
</script>

<style lang="scss" scoped>
.vote-box {
    position: relative;
    display: flex;
    gap: 12px;

    .right {
        flex: 1 0 25%;
    }

    .left {
        flex: 1 0 75%;
    }

}

.cardBlock {
    position: relative;
    padding: 40px;
    text-align: center;
    vertical-align: middle;
    border: 1px dashed #fff;
    font-size: 32px;

    &.is-selected {
        border-style: solid;
        border-width: 3px;
    }
}
</style>