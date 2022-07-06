<template>
    <div class="flex justify-center box-border w-[1648px] mb-5
        responsive search-wrapper
    ">
        <form class="w-full flex gap-5 search">
            <fieldset class="flex-1 flex gap-5 max-w-[440px] 1700:max-w-[300px] field">
                <fieldset class="bpm flex-1 max-w-[120px]
                    1700:max-w-[80px]
                ">
                    <p class="text-left text-base text-black font-semibold mb-2 select-none  ">Bpm</p>
                    <input
                        class="w-full input input-xs border-none focus:outline-none text-black shadow-lg  "
                        type="number"
                        size="3"
                        name="bpm"
                        min="1"
                        max="300"
                        placeholder="s1ke"
                        @input="debounceInputBpm"
                    >
                </fieldset>
                <fieldset class="flex-1 max-w-[300px]
                    1700:max-w-[200px] field
                ">
                    <p class="text-left text-base text-black font-semibold mb-2 select-none  ">Name</p>
                    <input
                        class="w-full input input-xs border-none focus:outline-none text-black shadow-lg  "
                        type="text"
                        placeholder="beats"
                        name="nm"
                        @input="debounceInputName"
                    >
                </fieldset>
            </fieldset>

            <fieldset class="flex-1">
                <p class="text-left text-base text-black font-semibold mb-[10px] select-none  ">Type</p>
                <ArtistList
                    @update-artist-query="updateArtistQuery"
                    :list="artistList"
                />
            </fieldset>
        </form>
    </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import ArtistList from './UI/ArtistList.vue';
const emit = defineEmits([ 'search', ])

// local search query value
const searchQuery = reactive({
    bpm: 0,
    name: '',
    artists: [],
})

// fires on emit from ArtistList, updates local search query with new artists list
function updateArtistQuery(list) {
    searchQuery.artists = list
}

// interval for debouncing bpm input
let debounceBpm
function debounceInputBpm(e) {
    clearTimeout(debounceBpm)
    debounceName = setTimeout(() => {
        searchQuery.bpm = +e.target.value
    }, 250, e)
}

// interval for debouncing name input
let debounceName
function debounceInputName(e) {
    clearTimeout(debounceName)
    debounceName = setTimeout(() => {
        searchQuery.name = e.target.value
    }, 250, e)
}

const artistList = ref([
    {
        name: 'Key Glock',
        id: 0,
    },
    {
        name: 'Lil Durk',
        id: 1,
    },
        {
        name: 'EST Gee',
        id: 2,
    },
        {
        name: 'Lil Tjay',
        id: 3,
    },
        {
        name: 'Drake',
        id: 4,
    },
    
])

// emit new search query on every update
watch(searchQuery, () => {
    emit('search', { bpm: searchQuery.bpm, name: searchQuery.name, artists: searchQuery.artists })
})
</script>

<style lang="scss">
.search {
    @media screen and (max-width: 1030px) {
        flex-direction: column;
        .field {
            max-width: 100%;
        }
    }
}
.search-wrapper {
    @media screen and (max-width: 700px) {
        max-width: 90%;
    }
}
</style>