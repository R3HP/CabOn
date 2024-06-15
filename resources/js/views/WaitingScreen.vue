<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4 text-center">{{ title }}</h1>
        <div>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div style="height: 300px;">
                        <OsmMap v-if="tripStore.driver.id" :origin="locationStore.userCurrentLocation"  :destination="tripStore.driver_location"/>
                        <div v-else>
                            <iframe src="https://giphy.com/embed/um2kBnfo55iW4ZH1Fa" width="30%" height="30%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen>
                            </iframe>
                        </div>    
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <span>{{ message }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { onMounted, ref } from 'vue';
import { useTripStore } from '../stores/trip';
import { useLocationStore } from '../stores/location';
import OsmMap from '../components/OsmMap.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const title = ref('Waiting For A Driver')

const message = ref('When A Driver Accepts a Trip Their Info Will Be Shown Here')

const tripStore = useTripStore()

const locationStore = useLocationStore()

onMounted(() => {
    console.log(tripStore.user_id);
    window.Pusher = Pusher

    if(Pusher.isReady){
        console.log('pusher ready');
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

        echo.channel(`passenger_${tripStore.user_id}`)
        .listen('TripAcceptedEvent' , (event) => {
            title.value = "Hold On A Driver is On His Way"
            console.log(event.trip);
            tripStore.$patch(event.trip)
            console.log(tripStore.driver_location);
            console.log(locationStore.userCurrentLocation);
            message.value = `${event.trip.driver.user.name} is coming in a ${event.trip.driver.year} ${event.trip.driver.color} ${event.trip.driver.make} ${event.trip.driver.model} with a license plate #${event.trip.driver.license}`   
        })
        .listen('TripDriverLocationUpdatedEvent',(event) => {
            tripStore.$patch(event.trip);
        })
        .listen('TripStartedEvent', (event) => {
            tripStore.$patch(event.trip)
            locationStore.$patch({
                location : event.trip.destination
            })
            title.value = 'Your Trip Is Started,'
            message.value = 'Just Chill and Relax , Isnt Life Just a Big Long Trip With You Not On The Wheel???'
        })
        .listen('TripFinishedEvent' , (event) => {
            title.value = 'You Are Where You Wanted To Be'
            message.value = 'Wow Our Drivers Really Got You There ?hm Thanks For Choosing Our Service'

            setTimeout(() => {
                tripStore.reset()
                locationStore.reset()

                router.push({
                    name : 'index'
                })
            },2800)
        })
        .error((error) => {
            console.log('websocket error');
            console.error(error);
        })
    }
})

</script>