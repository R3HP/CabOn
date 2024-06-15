<template>
    <div class="p-16">
        <h1 class="text-3xl font-semibold mb-4 text-center">{{ title }}</h1>
        <div>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left" v-if="!tripStore.completed_at">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div style="height: 300px;">
                        <OsmMap :origin="locationStore.userCurrentLocation" :destination="locationStore.location" />
                    </div>
                    <div class="mt-2">
                        <p class="text-xl">Going to <strong>pick up a passenger</strong></p>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button v-if="tripStore.started_at"
                        @click="handleCompleteTrip"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
                        Complete Trip</button>
                    <button v-else
                        @click="handlePassengerPickedUp"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
                        Passenger Picked Up</button>
                </div>
            </div>
            <!-- <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left" v-else>
                <div class="bg-white px-4 py-5 sm:p-6">
                    <Tada />
                </div>
            </div> -->
        </div>
    </div>

</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import OsmMap from '../components/OsmMap.vue';
import { useTripStore } from '../stores/trip';
import { useLocationStore } from '../stores/location';
import http  from '../helpers/http';
import { useRouter } from 'vue-router';

const Default_Title = 'Driving to passenger...'
const tripStore = useTripStore()
const locationStore = useLocationStore()
const router = useRouter()
const title = ref(Default_Title)

const interval = ref(null)

onMounted(() => {
    interval.value = setInterval(updateLocation,1500)
})


const updateLocation = async () => {
    console.log('Update Location');
    await locationStore.updateCurrentLocation();
    console.log(locationStore.userCurrentLocation);
    http.post(`/api/trip/${tripStore.id}/updatelocation`,{
        driver_location : locationStore.userCurrentLocation
    });
}


onUnmounted(() => {
    clearInterval(interval.value)
    interval.value = null
})

const handleCompleteTrip = () => {
    http.post(`/api/trip/${tripStore.id}/finish`)
        .then((response) => {
            tripStore.$patch(response.data)

            title.value = 'Trip Completed, Stay Frosty'
            setTimeout(() => {
                locationStore.reset()
                tripStore.reset()

                router.push({
                    name: 'drive'
                })
            })
        })
        .catch((error) => {
            console.error(error);
            alert(error)
        })
}

const handlePassengerPickedUp = () => {
    locationStore.$patch({
        location : {
            name : tripStore.destination_name,
            lat : tripStore.destination.lat,
            lng : tripStore.destination.lng,
            displayName : tripStore.destination_name
        },
    })
    title.value = `Going To ${locationStore.location.name}`

    http.post(`api/trip/${tripStore.id}/start`)
        .then((response) => {
            tripStore.$patch(response.data)
        })
        .catch((error) => {
            console.error(error);
            alert(error)
        })
}
</script>