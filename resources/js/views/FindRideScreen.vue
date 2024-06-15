<template>
     <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4 text-center mb-14">Where are we going?</h1>
        <form action="#" @submit.prevent="">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left bg-white">
                <div class="px-4 py-5 sm:p-6">
                    <div>
                        <input
                            v-model="destination.display_name"
                            @input="handleOnChange"
                            placeholder="My destination"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
                    </input>
                    </div>
                </div>
                <div v-if="searchResponseCities">
                    <div v-for="city in searchResponseCities" class="m-8 max-w-md mx-auto bg-grey rounded-lg shadow-md overflow-hidden px-8 py-5">
                        <h2 @click="cityClick(city)" class="text-xl font-semibold mb-2">{{ city.display_name }}</h2>
                    </div>
                    <!-- <div v-for="city in searchResponseCities" class="p-8 text-bold border border-width-3 ">
                        {{ city.display_name }}
                    </div> -->
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                        @click.prevent="handleSelectLocation"
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
                        Find A Ride
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useLocationStore } from '../stores/location';

const destination = ref({})
var timer = null;
const searchResponseCities = ref(null)

const locationStore = useLocationStore()

const router = useRouter()

console.log(locationStore.$state);



const handleOnChange = () => {
    if (timer) {
        clearTimeout(timer)
    }   
    timer = setTimeout(() => {
        axios.get('https://nominatim.openstreetmap.org/search?q=' + destination.value.display_name + '&' + 'format=json').then((response) => {
            searchResponseCities.value =  response.data.map((city) => { 
                return {
                    display_name: city.display_name,
                    name : city.name,
                    lat : city.lat,
                    lng: city.lon
                }
            });
        }).catch((error) => {alert(error)})
    },900)
}

const cityClick = (city) => {
    console.log(city);
    destination.value = city;
    searchResponseCities.value = null;
}

const handleSelectLocation = () => {
    console.log(destination);
    locationStore.$patch({
        location : {
            name : destination.value.name,
            displayName : destination.value.display_name,
            lat : destination.value.lat,
            lng : destination.value.lng,
        }
    })

    router.push({
        name:'confirm'
    })
}


</script>