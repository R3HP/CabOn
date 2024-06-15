import { defineStore } from 'pinia'
import { reactive } from 'vue'

const getFakeCurrentPosition = async () => {
    // console.log(useLocationStore);
    const lat = getRandomInRange(-180, 180, 3);
    const lng = getRandomInRange(-180, 180, 3);
    // return {lat : 37.19556347231648 , lng : 50.152845497703254}
    return {lat : lat , lng : lng}
} 

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

export const useLocationStore = defineStore('location', () => {
    const location = reactive({
        name : null,
        displayName : null,
        lat:  null,
        lng : null
    })

    const userCurrentLocation =  reactive({
            lat: null,
            lng : null
    })

    const updateCurrentLocation = async () => {
        const currentLocation = await getFakeCurrentPosition()
        console.log(currentLocation);
        userCurrentLocation.lat = currentLocation.lat;
        userCurrentLocation.lng = currentLocation.lng;
        // userCurrentLocation.lat = {
        //     lat : currentLocation.lat,
        //     lng : currentLocation.lng
        // }
        console.log(userCurrentLocation);
    }

    const reset = () => {
        location.displayName = null;
        location.name = null;
        location.lat = null;
        location.lng = null;
        userCurrentLocation.lat = null;
        userCurrentLocation.lng = null;
    }


    return { location , userCurrentLocation , updateCurrentLocation , reset }
})