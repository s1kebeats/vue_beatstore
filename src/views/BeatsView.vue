<template>
    <BeatstoreTitle
        title="Beats"
    />
    <div class="flex-1 flex flex-col items-center pb-[50px] min-h-[calc(100vh-90px)] select-none">
        <div class="w-[1648px] flex justify-between items-center py-5 relative z-2
          responsive beats-wrapper
        ">
            <button @click="changeCurrentSort" class="btn w-[70px] gap-1 border-none bg-base-100 text-black btn-xs hover:bg-base-100 shadow-lg">
              <span class="inline-block w-[30px]">
                {{ currentSort }}
              </span>
              <svg v-show="currentSort === 'New'" xmlns="http://www.w3.org/2000/svg" class="ionicon w-[15px]" viewBox="0 0 512 512"><title>Chevron Down</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 184l144 144 144-144"/></svg>
              <svg v-show="currentSort === 'Old'" xmlns="http://www.w3.org/2000/svg" class="ionicon w-[15px]" viewBox="0 0 512 512"><title>Chevron Up</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 328l144-144 144 144"/></svg>
            </button>
            <h1 class="text-xl font-semibold text-black text-center  ">Beats</h1>
            <button class="btn border-none bg-white text-black btn-xs hover:bg-white shadow-md hover:brightness-95 transition-all" @click="toggleSearch">Filters</button>
        </div>
        <transition name="search">
            <BeatstoreSearch
                v-show="showSearch"
                @search="updateSearchQuery"
            />
        </transition>

        <BeatList
            class="flex-1"
            :list="
                filteredBeats
            "
        />
    </div>
    <BeatstoreUsage />
</template>
<script setup>
import { ref, reactive, computed } from 'vue'

// components
import BeatList from '@/components/BeatList.vue';
import BeatstoreSearch from '@/components/BeatstoreSearch.vue'
import BeatstoreTitle from '@/components/BeatstoreTitle.vue';
import BeatstoreUsage from '@/components/BeatstoreUsage.vue';

// const for managing audio files and wraps
const publicPath = process.env.BASE_URL
const beats = ref([
  {
    id: 0,
    name: 'Dang',
    bpm: 130,
    artist: 
      {
        name: 'Key Glock',
        id: 0,
      },
    wrap: `${publicPath}images/wrap22.jpg`,
    audio: {
      mp3: `${publicPath}audio/Dang_KeyGlock_130BPM.mp3`,
      wav: `${publicPath}audio/Dang_KeyGlock_130BPM.mp3`,
    },
    date: 1,
  },
  {
    id: 1,
    name: 'OP',
    bpm: 126,
    artist: 
      {
        name: 'Lil Durk',
        id: 1,
      },
    wrap: `${publicPath}images/wrap24.jpg`,
    audio: {
      mp3: `${publicPath}audio/OP_LilDurk_126BPM.mp3`,
      wav: `${publicPath}audio/OP_LilDurk_126BPM.mp3`,
    },
    date: 2,
  },
  {
    id: 2,
    name: 'SRT moovin',
    bpm: 155,
    artist: 
      {
        name: 'EST Gee',
        id: 2,
      },
    wrap: `${publicPath}images/wrap25.jpg`,
    audio: {
      mp3: `${publicPath}audio/SRT_ESTGee_155BPM.mp3`,
      wav: `${publicPath}audio/SRT_ESTGee_155BPM.mp3`,
    },
    date: 3,
  },
  {
    id: 3,
    name: 'Right Key',
    bpm: 132,
    artist: 
      {
        name: 'Lil Tjay',
        id: 3,
      },
    wrap: `${publicPath}images/wrap26.jpg`,
    audio: {
      mp3: `${publicPath}audio/KEY_LilTjay_132BPM.mp3`,
      wav: `${publicPath}audio/KEY_LilTjay_132BPM.mp3`,
    },
    date: 4,
  },
  {
    id: 4,
    name: 'Vibes',
    bpm: 210,
    artist: 
      {
        name: 'Drake',
        id: 4,
      },
    wrap: `${publicPath}images/wrap27.jpg`,
    audio: {
      mp3: `${publicPath}audio/Vibes_Drake_210BPM.mp3`,
      wav: `${publicPath}audio/Vibes_Drake_210BPM.mp3`,
    },
    date: 5,
  },
])

// search panel state
const showSearch = ref(false)
const toggleSearch = (e) => {
  showSearch.value = !showSearch.value
  // show filters button styles
  e.target.classList.toggle('bg-white')
  e.target.classList.toggle('bg-black')
  e.target.classList.toggle('text-black')
  e.target.classList.toggle('text-white')
  e.target.classList.toggle('hover:bg-white')
  e.target.classList.toggle('hover:bg-black')
}

// choosen beats sort mode
const currentSort = ref('New')
// manage beats sort mode
const changeCurrentSort = () => {
  if (currentSort.value === 'New') {
    return currentSort.value = 'Old'
  }
  return currentSort.value = 'New'
}

// search query object
const searchQuery = reactive({
  bpm: '',
  name: '',
  artists: [],
})
// fires on search emit, updates local search query
function updateSearchQuery(query) {
  searchQuery.bpm = query.bpm
  searchQuery.name = query.name
  searchQuery.artists = query.artists
}

// computed property (watches local search query, then filters beats)
const filteredBeats = computed(() => {
    let filtered = beats.value
    if (searchQuery.bpm) {
        filtered = filtered.filter(item => item.bpm === searchQuery.bpm)
    }
    if (searchQuery.name) {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(searchQuery.name.toLowerCase()))
    }
    if (searchQuery.artists.length > 0) {
        let artistFiltered = []
        searchQuery.artists.forEach(id => {
            artistFiltered.push(...filtered.filter(item => item.artist.id === id))
        })
        filtered = artistFiltered
    }
    if ( currentSort.value === 'New' ) return filtered.sort( (a,b) => a.date < b.date )
    return filtered.sort( (a,b) => a.date > b.date )
})
</script>

<style lang="scss">
.beats-wrapper {
    @media screen and (max-width: 700px) {
        max-width: 90%;
    }
}
</style>