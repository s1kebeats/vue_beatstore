<template>
    <BeatstoreTitle
        title="Home"
    />
    <div class="flex flex-col min-h-[calc(100vh-90px)]">
      <YoutubeLatest />
      <BestBeats
          class="flex-1"
          :list="beats"
      />
    </div>
    <BeatstoreUsage />
</template>
<script setup>
import { ref, } from 'vue'

// components
import YoutubeLatest from '@/components/YoutubeLatest.vue';
import BestBeats from '@/components/BestBeats.vue';
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
</script>