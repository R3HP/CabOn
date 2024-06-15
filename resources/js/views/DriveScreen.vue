<template>
    <div class="p-16">
        <h1 class="text-3xl font-semibold mb-4 text-center">{{ title }}</h1>
        <div v-if="!tripStore.id" class="py-8 flex justify-center items-center ">
            <Loading class="flex justify" />
        </div>
        <div v-else>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div style="height:300px">
                        <OsmMap :origin="tripStore.origin" :destination="tripStore.destination" />
                    </div>
                    <div class="mt-2">
                        <p class="text-xl">Going to <strong>{{ tripStore.destination_name }}</strong></p>
                    </div>
                </div>
                <div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                        @click="handleDeclineTrip"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Decline</button>
                    <button
                        @click="handleAcceptTrip"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Accept</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Loading from '../components/Loading.vue'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { ref } from 'vue';
import {useTripStore} from '../stores/trip'
import OsmMap from '../components/OsmMap.vue';
import http from '../helpers/http';
import { useLocationStore } from '../stores/location';
import { useRouter } from 'vue-router';

const router = useRouter()

const Default_Title = 'Waiting For A Ride';

const FakeDriverLocation = {
lat: 37.1591699,
lng: 50.2069295
};
const title = ref(Default_Title)

const tripStore = useTripStore()

const locationStore = useLocationStore()

Pusher.ready()


console.log(Pusher.isReady);

console.log(Pusher.instances);

window.Pusher = Pusher; 

onMounted(() => {
    if (Pusher.isReady) {
        let echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        wsHost: window.location.hostname,
        wssHost: window.location.hostname,
        wsPort: 6001,
        wssPort: 6001,
        forceTLS: false,
        disableStats: false,
        enabledTransports: ['ws', 'wss'],
        })


        echo.channel('trips').listen('TripCreatedEvent',(event) => {
            title.value = 'Here is A Trip'
            tripStore.$patch({
                id : event.trip.id,
                user_id : event.trip.user_id,
                origin : event.trip.origin,
                destination : event.trip.destination,
                destination_name : event.trip.destination_name
            });
            console.log('store state');
            console.log(tripStore.$state);
        }).error((error) => {
            console.log('Error');
            console.log(error);
            alert(error)
        });
    }
    

})


const handleAcceptTrip = () => {
    console.log('api/trip/'+ tripStore.id + '/accept');
    http.post('api/trip/'+ tripStore.id + '/accept',{
        // FAKE DRIVER LOCATION
        // driver_location : locationStore.userCurrentLocation
        driver_location : FakeDriverLocation

    })
    .then((response) => {
        console.log(response);
        locationStore.$patch({
            location : {
                name: 'Passenger',
                lat : response.data.origin.lat,
                lng: response.data.origin.lng,
            },
        });
        tripStore.$patch(response.data)
        locationStore.updateCurrentLocation().then((res) => {
            router.push({
                name: 'navigate'
            })
        })
    })
    .catch((error) => {console.error(error);alert(error)})

}

const handleDeclineTrip = () => {
    title.value = Default_Title
    tripStore.reset()
} 


</script>