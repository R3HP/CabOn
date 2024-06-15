
<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4 text-center">Here's your trip</h1>
        <div>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div  style="height:300px">
                        <OsmMap :route_latlngs="polyline.latlngs" :route_color="polyline.color" :origin="locationStore.userCurrentLocation" :destination="locationStore.location" />
                    </div>
                    <div class="mt-2">
                        <p class="text-xl">Going to <strong>{{ locationStore.location.name }}</strong></p>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                        @click="handleConfirmTrip"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
                        Let's Go!</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, nextTick, onMounted, reactive, ref } from 'vue';
    import { useLocationStore } from '../stores/location';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import http from '../helpers/http'
    import OsmMap from '../components/OsmMap.vue';
    import { useTripStore } from '../stores/trip';

    const locationStore = useLocationStore();
    const tripStore = useTripStore()

    const x = ref(locationStore.$state)

    // const mapController = ref(null)

    const polyline = reactive({
        latlngs : null,
        color : 'blue'
    })


    // const appropiateZoomLevel = computed(() => {
    //     var z = calculateZoomLevel(locationStore.location.lat,locationStore.location.lng,locationStore.userCurrentLocation.lat,locationStore.userCurrentLocation.lng,336,300)
    //     console.log(z);
    //     return Math.abs(z)
    // })

    const router = useRouter()

    

    onMounted( async () => {
        if (locationStore.location.lat == null) {
            router.push({
                name: 'ride'
            })
        }
        await locationStore.updateCurrentLocation()
        console.log(locationStore.location);
        console.log(locationStore.userCurrentLocation);

        getRouteToDestination()
    })



    const getRouteToDestination = () => {
        const url = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62481fa53a5051c0453d8ab353a3922bfc56&start='+ locationStore.userCurrentLocation.lat + ',' + locationStore.userCurrentLocation.lng +'&end=' + locationStore.location.lat + ',' + locationStore.location.lng;
        console.log(url);
        axios.get('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62481fa53a5051c0453d8ab353a3922bfc56&start='+ locationStore.userCurrentLocation.lat + ',' + locationStore.userCurrentLocation.lng +'&end=' + locationStore.location.lat + ',' + locationStore.location.lng)
        .then((response) => {
            if (response.status == 200 ) {
                const routeCoordinates =  response.data.features[0].geometry.coordinates;
                polyline.latlngs = routeCoordinates
            }
        }).catch((error) => {
            console.log('Routing Error :' + error.response.data.error.message);
        })
    }


    const handleConfirmTrip = () => {

        http.post('/api/trip',{
            origin : locationStore.userCurrentLocation,
            destination : { lat : locationStore.location.lat, lng : locationStore.location.lng },
            destination_name : locationStore.location.name
        }).then((response) => {
            tripStore.$patch(response.data)
            router.push({
                name : 'waiting'
            });
        }).catch((error) => {
            alert(error);
            console.log(error);
        })
    }
</script>