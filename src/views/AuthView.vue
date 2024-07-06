<template>
    <div>
        <div class="tabs is-centered">
            <ul>
                <li :class="{ 'is-active': isLogin }" @click.prevent="isLogin = true"><a>Log in</a></li>
                <li :class="{ 'is-active': !isLogin }" @click.prevent="isLogin = false"><a>Register</a></li>
            </ul>
        </div>
    </div>
    <div class="card mt-5" style="min-width:350px;max-width:450px;margin-inline:auto;">
        <div class="title pt-3 has-text-centered">
            {{ loginOrRegisterText }}
        </div>
        <div class="card-content">
            <form @submit.prevent="handleSubmit">
                <div class="content">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" v-model.trim="credentials.email" type="email"
                                placeholder="Enter email">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" v-model.trim="credentials.password" type="password" autocomplete
                                placeholder="Enter password">
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="button is-primary is-dark">{{ loginOrRegisterText }}</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { computed, reactive, ref } from "vue";
import { authStore } from "@/stores/authStore.js"

const isLogin = ref(true)
const useAuthStore = authStore();

const loginOrRegisterText = computed(() => {
    return isLogin.value ? 'Login' : 'Register'
})

const credentials = reactive({
    email: "",
    password: ""
})

function handleSubmit() {
    if (!credentials.email || !credentials.password) {
        alert("Email and Password cannot be empty")
    } else {
        isLogin.value ? executeLogin() : executeRegistration()
    }
}
function executeLogin() {
    useAuthStore.loginUser(credentials)
}
function executeRegistration() {
    useAuthStore.registerUser(credentials)
}
</script>
