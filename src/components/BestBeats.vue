<template>
    <section>
        <h1 class="text-center text-xl font-semibold my-5 select-none text-black">
            Hot 10
        </h1>
        <div class="flex justify-center">
            <BeatList
                :list="
                    hot10List
                "
            />
        </div>
        <div class="w-full text-center mb-[100px] mt-3 select-none">
            <router-link
                class="btn bg-black text-white hover:bg-black btn-xs w-[1648px] shadow-lg hover:brightness-95 transition-all responsive"
                to="/beats"
                title="View all beats"
            >
                View all beats
            </router-link>
        </div>
    </section>

</template>
<script setup>
import { computed } from '@vue/reactivity';
import BeatList from './BeatList.vue';
const props = defineProps({
    list: Array,
})

// last 10 beats computed property
const hot10List = computed(() => {
    return props.list.splice(0, 10)
})

</script>