import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    server: { 
        hmr: {
            host: 'localhost',
        },
    }, 
    resolve: {
        alias: {
            '@': '/resources/ts',
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    // The Vue plugin will re-write asset URLs, when referenced
                    // in Single File Components, to point to the Laravel web
                    // server. Setting this to `null` allows the Laravel plugin
                    // to instead re-write asset URLs to point to the Vite
                    // server instead.
                    base: null,
 
                    // The Vue plugin will parse absolute URLs and treat them
                    // as absolute paths to files on disk. Setting this to
                    // `false` will leave absolute URLs un-touched so they can
                    // reference assets in the public directory as expected.
                    includeAbsolute: false,
                },
            },
        }),
    ],
});



// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import vue from '@vitejs/plugin-vue';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/js/app.js'],
//             refresh: true,
//         }),
//         vue(
//             {
//                 template: {
//                     transformAssetUrls: {
//                         // The Vue plugin will re-write asset URLs, when referenced
//                         // in Single File Components, to point to the Laravel web
//                         // server. Setting this to `null` allows the Laravel plugin
//                         // to instead re-write asset URLs to point to the Vite
//                         // server instead.
//                         base: null,
     
//                         // The Vue plugin will parse absolute URLs and treat them
//                         // as absolute paths to files on disk. Setting this to
//                         // `false` will leave absolute URLs un-touched so they can
//                         // reference assets in the public directory as expected.
//                         includeAbsolute: false,
//                     },
//                 },
//             }
//         )
//     ],
// });

// {
//     "private": true,
//     "type": "module",
//     "scripts": {
//         "dev": "vite",
//         "build": "vite build"
//     },
//     "devDependencies": {
//         "axios": "^1.6.4",
//         "laravel-vite-plugin": "^1.0.0",
//         "@vitejs/plugin-vue": "^5.0.3",
//         "vite": "^5.0.0"
//     },
//     "dependencies": {
//         "pinia": "^2.1.7",
//         "vue": "^3.4.21",
//         "vue-router": "^4.2.5"
//     }
// }

