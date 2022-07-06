<template>
    <nav :class="'flex gap-4 grow justify-end ' + classes.main">
        <router-link
            :class="'font-semibold text-white hover:brightness-95 transition-all ' + (showOverlay ? '' : '1200:text-black ') + classes.link "

            title="Home"
            
            to="/"
        >
            Home
        </router-link>
        <router-link
            :class="'font-semibold text-white hover:brightness-95 transition-all ' + (showOverlay ? '' : '1200:text-black ') + classes.link "

            title="Beats"
            
            to="/beats"
        >
            Beats
        </router-link>
        <router-link
            :class="'font-semibold text-white hover:brightness-95 transition-all ' + (showOverlay ? '' : '1200:text-black ') + classes.link "

            title="Terms of use"
            
            to="#usage"
        >
            Usage
        </router-link>
    </nav>
</template>

<script setup>
import { inject } from 'vue';
const props = defineProps({
    classes: Object,
})

const showOverlay = inject('showOverlay')
</script>