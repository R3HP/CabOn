<template>
    <div class="p-16" >
        <h1 class="text-3xl font-semibold mb-4 text-center">CabOn</h1>
        <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
            <div class="big-white px-4 py-5 sm:p-6">
                <div class="flex justify-between ">
                    <button @click="handleClickStartDriving" class="rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Start Driving</button>
                    <button @click="handleClickFindARide" class="rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Find A Ride</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import http from '../helpers/http';
const router = useRouter();

const handleClickFindARide = () => {
    router.push({
        name: 'ride'
    });
}

const handleClickStartDriving = () => {
    http.get('/api/driver')
    .then((response) => {
        if (response.data.driver) {
            router.push({
                name: 'drive'
            })
            
        } else {
            router.push({
                name:'driver'
            })
        }
    })
    .catch((error) => {
        console.log(error);
    })
    
}
</script>