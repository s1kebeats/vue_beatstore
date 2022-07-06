<template>
    <ul class="box-border w-full flex flex-wrap items-center gap-5">
        <li
            class="btn btn-xs bg-gradient-to-tr from-primary to-[#C165CC] border-none text-base-100 min-w-[120px] flex-1 shadow-lg hover:brightness-95 transition-all"
            v-for="artist in list"
            :value="artist.id"
            @click="selectArtist(artist.id, $event)"
        >
            {{ artist.name }}
        </li>
    </ul>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    list: Array
})
const emit = defineEmits([ 'updateArtistQuery', ])

// local artist query value
const artistQuery = ref([])

function selectArtist(id, e) {
    // change clicked button color to indicate that it is selected
    e.target.classList.toggle('bg-gradient-to-tr')
    e.target.classList.toggle('bg-black')
    // remove artist from query if query already includes it
    if (artistQuery.value.includes(id)) {
        artistQuery.value = artistQuery.value.filter(item => item !== id)
    } else {
        // add artist to the query
        artistQuery.value.push(id)
    }
    // send query
    emit('updateArtistQuery', artistQuery.value)
}
</script>