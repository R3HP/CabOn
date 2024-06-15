import { defineStore } from "pinia";
import { reactive, ref } from "vue";


export const useTripStore = defineStore('trip', () => {
    
    const id = ref(null)
    const user_id = ref(null)
    const origin = reactive({
        lat:null,
        lng:null
    })
    const destination = reactive({
        lat:null,
        lng:null
    })

    const destination_name = ref(null)

    const driver = reactive({
        id: null,
        year: null,
        color: null,
        make: null,
        model: null,
        license: null,
        user: {
            name: null,
        }
    })



    const started_at = ref(null)
    const accepted_at = ref(null)
    const finished_at = ref(null)



    const driver_location = reactive({
        lat : null,
        lng : null,
    })


    const reset = () => {
        id.value = null;
        user_id.value = null;
        origin.lat = null;
        origin.lng = null;
        destination.lat =null;
        destination.lng = null;
        destination_name.value = null;
        driver.color = null;
        driver.id = null;
        driver.license = null;
        driver.make = null;
        driver.model = null;
        driver.user.name = null;
        driver.year = null;
        driver_location.lat = null;
        driver_location.lng = null;
        started_at.value = null;
        accepted_at.value = null;
        finished_at.value = null;
    }

    return {id,user_id,origin,destination,destination_name,driver,started_at,accepted_at,finished_at,driver_location,reset}
})



// {
//     "id": 5,
//     "user_id": 2,
//     "driver_id": 1,
//     "origin": {
//       "lat": 53.374,
//       "lng": 167.413
//     },
//     "destination": {
//       "lat": "37.2060727",
//       "lng": "50.0028774"
//     },
//     "destination_name": "Lahijan",
//     "driver_location": {
//       "lat": 37.1591699,
//       "lng": 50.2069295
//     },
//     "accepted_at": null,
//     "started_at": null,
//     "finished_at": null,
//     "driver": {
//       "id": 1,
//       "user_id": 1,
//       "year": 1996,
//       "model": "747",
//       "make": "Boeing",
//       "license": "AlluhAkbar",
//       "color": "White",
//       "created_at": "2024-03-30T14:48:54.000000Z",
//       "updated_at": "2024-03-30T14:48:54.000000Z",
//       "user": {
//         "id": 1,
//         "name": "Usama BinLaden",
//         "email": "logicdevrhp@gmail.com",
//         "created_at": "2024-03-30T14:46:46.000000Z",
//         "updated_at": "2024-03-30T14:48:54.000000Z"
//       }
//     }
//   }