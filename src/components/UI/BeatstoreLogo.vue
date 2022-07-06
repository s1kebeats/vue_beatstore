<template>
    <div :class="'flex justify-center transition-all' + (showOverlay ? ' text-white' : ' text-black') ">
        <router-link
            class="flex items-center gap-2"
            title="Home"
            to="/"
        >
            <img
                class="h-[30px] drop-shadow-sm"
                src="@/assets/images/S.svg"
            >
            <span class="text-2xl font-['Poppins']">s1kebeats</span>
        </router-link>
    </div>
</template>

<script setup>
import { inject } from 'vue';
const props = defineProps({
    style: String
})

const showOverlay = inject('showOverlay')
</script>