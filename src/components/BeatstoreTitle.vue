<template>
    <div></div>
</template>
<script setup>
import { watchEffect, } from 'vue';
const props = defineProps({
    title: String,
})

watchEffect(() => props.title, (newValue) => {
    document.title = newValue
})

</script>
<style lang="">
    
</style>