<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4 text-center">Driver and car details</h1>
        <form action="#" @submit.prevent="handleSaveDriver">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" name="name" v-maska data-maska="Z Z" data-maska-tokens="Z:[a-zA-Z]:multiple" id="name" v-model="driverDetails.name"  placeholder="Full Name"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
                    </div>
                    <div class="mt-2">
                        <input type="number" name="year" id="year" v-maska data-maska="#" data-maska-tokens="#:[0-9]:multiple" v-model="driverDetails.year" placeholder="Car Year"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
                    </div>
                    <div class="mt-2">
                        <input type="text" name="make" id="make" v-model="driverDetails.make" placeholder="Make"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
                    </div>
                    <div class="mt-2">
                        <input type="text" name="model" id="model" v-model="driverDetails.model" placeholder="Model"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
                    </div>
                    <div class="mt-2">
                        <input type="text" name="color" id="color" v-maska data-maska="Z" data-maska-tokens="Z:[a-zA-Z]:multiple" v-model="driverDetails.color" placeholder="Color"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
                    </div>
                    <div class="mt-2">
                        <input type="text" name="license_plate" v-model="driverDetails.license" id="license_plate"
                            placeholder="License Plate #"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit"
                        @click.prevent="handleSaveDriver"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Continue</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { vMaska } from 'maska';
    import { reactive } from 'vue';
    import http from '../helpers/http';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const driverDetails = reactive({
        name:null,
        year:null,
        make:null,
        model:null,
        color:null,
        license:null,
    })

    const handleSaveDriver = () => {
        http.post('/api/driver',driverDetails)
        .then((response) => {
            console.log(response);
            if (response.status == 200) {
                router.push({
                    name : 'drive' 
                })
            }
        })
        .catch((error) => {
            console.log(error);
            alert(error)
        })
        console.log(driverDetails);
    }








</script>