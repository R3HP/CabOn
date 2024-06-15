<template>
    <l-map ref="mapController"  :use-global-leaflet="false" :center="centerOfUserAndDestination" :zoom="10" >
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></l-tile-layer>
        <l-polyline v-if="route_latlngs" :lat-lngs="route_latlngs" :color="route_color"></l-polyline>
        <l-marker v-if="origin" :lat-lng="[origin.lat,origin.lng]"></l-marker>
        <l-marker v-if="destination" :lat-lng="[destination.lat,destination.lng]"></l-marker>
    </l-map>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker , LPolyline } from "@vue-leaflet/vue-leaflet";
import { computed } from "vue";
// import { onMounted } from "vue";

const props = defineProps({
    route_latlngs : Array,
    route_color : String,
    origin : Object,
    destination : Object

})




const centerOfUserAndDestination = computed(() => {
        var mid;
        if (!props.destination || !props.origin) {
            mid = props.origin ?? props.destination ?? {lat : 37.19556347231648 , lng : 50.152845497703254}
        }else{
            mid = midpoint(props.destination.lat,props.destination.lng,props.origin.lat,props.origin.lng)
        }
        console.log('center');
        console.log(mid);
        // 37.2378014565274,49.86888576764425
        // 37.200841715867604,50.077866668792694
        return mid
})


function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    function midpoint(lat1, lon1, lat2, lon2) {
        // Convert latitude and longitude from degrees to radians
        lat1 = toRadians(lat1);
        lon1 = toRadians(lon1);
        lat2 = toRadians(lat2);
        lon2 = toRadians(lon2);

        // Calculate midpoint
        const Bx = Math.cos(lat2) * Math.cos(lon2 - lon1);
        const By = Math.cos(lat2) * Math.sin(lon2 - lon1);
        const lat_mid = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt(Math.pow(Math.cos(lat1) + Bx, 2) + Math.pow(By, 2)));
        const lon_mid = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

        // Convert back from radians to degrees
        const lat_mid_deg = toDegrees(lat_mid);
        const lon_mid_deg = toDegrees(lon_mid);

        return [lat_mid_deg, lon_mid_deg];
    }

    function calculateZoomLevel(lat1, lon1, lat2, lon2, mapWidth, mapHeight, padding = 20) {
        const deg2rad = Math.PI / 180;

        // Convert latitude and longitude from degrees to radians
        lat1 = lat1 * deg2rad;
        lon1 = lon1 * deg2rad;
        lat2 = lat2 * deg2rad;
        lon2 = lon2 * deg2rad;

        // Calculate the bounding box coordinates
        const minLat = Math.min(lat1, lat2);
        const maxLat = Math.max(lat1, lat2);
        const minLon = Math.min(lon1, lon2);
        const maxLon = Math.max(lon1, lon2);

        // Calculate the width and height of the bounding box
        const latDiff = maxLat - minLat;
        const lonDiff = maxLon - minLon;

        // Calculate the zoom level based on the bounding box size
        const zoomLat = Math.log2((mapHeight - padding * 2) / 360 / latDiff);
        const zoomLon = Math.log2((mapWidth - padding * 2) / 360 / lonDiff);

        // Return the minimum of the two zoom levels
        return Math.min(zoomLat, zoomLon);
    }




</script>