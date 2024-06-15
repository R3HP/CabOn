<template>
    <div class="p-16">
        <div v-if="!isWaitingForVerification">
            <h1 class="text-3xl font-semibold mb-16 text-center">
            Enter Your Email
        </h1>
        <form action="#" @submit.prevent="handleLogin">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-model="form.email"  v-maska data-maska="Z!@Z.***" data-maska-tokens="Z:[a-zA-Z0-9]:multiple" name="email" id="email" placeholder="YourEmail@Gmail.com" 
                        class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shdow-sm focus:border-black focus:outline-none"/>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button :disabled="!form.email" type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Login</button>
                </div>
            </div>
        </form>

        </div>
        <div v-else>
            <h1 class="text-3xl font-semibold mb-16 text-center">
            Enter Your Code
        </h1>
        <form action="#" @submit.prevent="handleVerification">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="number" v-model="form.otp_token"  v-maska data-maska="####"  name="code" id="code" placeholder="1000" 
                        class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shdow-sm focus:border-black focus:outline-none"/>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button :disabled="!form.otp_token" type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Verify</button>
                </div>
            </div>
        </form>
        </div>
    </div>
</template>

<script setup>
import { vMaska } from 'maska';
import { onMounted, reactive } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();


onMounted(()=>{
    if (localStorage.getItem('token')) {
        useRouter().push({
            name : 'index'
        })
    }
})


const form = reactive({
    email:null,
    otp_token:null
})

const isWaitingForVerification = ref(false) 


console.log('Auth Screen Script');
console.log(form.email);

const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handleLogin = () => {
    if (pattern.test(form.email)) {
        axios.post('http://localhost/api/login',form)
        .then((response)=>{
            isWaitingForVerification.value = true
            console.log(response);
        }).catch((error) => {
            console.log('ERRRRRORRRR'.error);
        })
    }else{
        console.log('is Not email');
    }
}

const handleVerification = () => {
    axios.post('http://localhost/api/login/verify',form).then((response) => {
        if (response.status == 200 && response.data.ApiKey) {
            
            localStorage.setItem('token',response.data.ApiKey);
            router.push({
                name: 'index'
            });
            
        }
    }).catch((error) => {
        console.log(error);
        alert(error);
    });
}
</script>