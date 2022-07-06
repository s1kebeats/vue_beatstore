<template>
    <div
        class="absolute z-10 w-full h-screen bg-[rgba(0,0,0,.99)] flex items-center justify-center flex-col"
        v-show="active"
    >
        <slot></slot>
    </div>
</template>

<script setup>
const props = defineProps({
    active: Boolean,
})
</script>