<template>
    <transition name="player">
        <div 
            id="player"
            class="bg-base-100 w-full h-[50px] select-none shadow-[0px_0px_25px_5px_rgba(0,0,0,.25)]"

            v-show="store.beat.audio.mp3"

            @mouseenter="showThumb"
            @mouseleave="hideThumb"
        >
            <CustomRange
                class="player__timeline drop-shadow-md"

                :max="audioDuration - 1"
                :value="store.copy ? currentCopy : audioCurrentTime"
                
                @update-value="updateAudioTime"
                @set-value="setAudioTime"
            />
            <div class="player__controls flex h-[47px] px-5 items-center 600:px-2">
                <div class="w-[150px] flex h-full items-center gap-5 600:gap-1 600:w-[80px]">
                    <button
                        :class="'play w-[26px] h-[26px] drop-shadow-md' + (store.playing ? ' pause' : '')"

                        @click="playPause"
                    >
                    </button>
                    <div class="flex items-center justify-center h-full w-[65px] text-xs 600:text-[.6rem] 600:w-[51px]">
                        <span class="text-center w-[30px] 600:w-[22px]">
                            {{ audioCurrentTimeOutput }}
                        </span>
                        <span class="text-center w-[5px]">
                            /
                        </span>
                        <span class="text-center w-[30px] 600:w-[22px]">
                            {{ audioDurationOutput }}
                        </span>
                    </div>
                </div>
                <div class="flex-1 flex h-full items-center gap-5">
                    <div class="flex items-center justify-center flex-1 gap-2">
                        <img
                            class="rounded-lg box-border object-cover w-[30px] h-[30px] drop-shadow-md"

                            :src="beat.wrap"

                            width="40px"
                            height="40px"
                            alt="wrap-image"
                        >
                        <div class="flex gap-2 600:gap-0">
                            <div class="flex items-center text-lg font-semibold text-black">
                                {{ beat.name }}
                            </div>
                            <div class="text-xs 600:hidden text-secondary">
                                <div>
                                    {{ beat.bpm }}BPM
                                </div>
                                <div>
                                    Type: {{ beat.artist.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-[175px] flex h-full items-center justify-end gap-5 600:w-[80px]">
                    <div
                        class="flex items-center gap-2 600:hidden"

                        @mouseenter="showThumb"
                        @mouseleave="hideThumb"
                    >
                        <VolumeRange
                            class="w-[65px] drop-shadow-md"

                            :value="audioVolume"
                            :max="100"
                            mode="live"

                            @change-value="setAudioVolume"
                        />
                        <button
                            :class="'block w-[26px] h-[26px] volume drop-shadow-md' + ( !audioVolume ? ' muted' : '' )"

                            @click="muteAudio"
                        >
                        </button>

                    </div>

                    <a
                        class="block w-[26px] h-[26px] download drop-shadow-md"
                        
                        :href="beat.audio.wav"

                        download
                    >
                    </a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
// elements
import CustomRange from '@/components/UI/CustomRange.vue';
import VolumeRange from '@/components/UI/VolumeRange.vue';
// global store
import { useStore } from '@/store/index';
import { storeToRefs } from 'pinia';
const store = useStore()

// global beat and playing values
const { beat, playing } = storeToRefs(store)

// audio
let audio = new Audio(beat.value.audio.mp3)

const audioCurrentTime = ref(0)
const currentCopy = ref(0)
const audioVolume = ref(0)
const audioDuration = ref(0)

// update refs and play audio when metadata is loaded
function audioInit() {
    // get previously selected audio volume from local storage or set it to 100
    setAudioVolume(localStorage.getItem('volume') !== undefined ? +localStorage.getItem('volume') : 100)
    // update local audioDuration state
    audioDuration.value = Math.ceil(audio.duration)
    // update local current time
    audioCurrentTime.value = audio.currentTime
    // play audio
    store.playing = true
    // play pause on space bind
    document.addEventListener('keydown', (e) => {
        // prevent scroll
        if (e.key === ' ') {
            e.preventDefault()
        }
    })
    document.addEventListener('keyup', (e) => {
        if (e.key === ' ') {
            playPause()
        }
    })
}

// watching global beat instance to maintain its changing
watch(beat, () => {
    // pausing audio when global beat changes
    store.playing = false
    // changing audio source
    audio.src = beat.value.audio.mp3
    // firing audioInit when audio metadata's loaded, turning audio on
    audio.addEventListener('loadedmetadata', audioInit)
})

// current time output interval
let int

// watching global playing value to play and pause audio
watch(playing, (newValue) => {
    // if audio is being turned on
    if (newValue) {
        // play
        audio.play()
        // interval which updates current time nad its output
        int = setInterval(() => {
            // if audio ended
            if (Math.ceil(audio.currentTime) === audioDuration.value) {
                setAudioTime(0)
                store.playing = false
            }
            // doesn't update current time if we are choosing it while audio is playing
            if (!store.copy) {
                updateAudioTime(Math.ceil(audio.currentTime))
            }
        }, 100)
        return
    }
    // if audio is being paused
    clearInterval(int)
    audio.pause()
})

// function to format seconds
const timeOutput = (seconds) => {
    if (seconds % 60 >= 10) {
        return `${Math.trunc(seconds / 60)}:${seconds % 60}`;
    } else {
        return `${Math.trunc(seconds / 60)}:0${seconds % 60}`;
    }
}

// computed property for current time output
const audioCurrentTimeOutput = computed(() => {
    // watch for store.copy to be able to select time when audio is playing
    return timeOutput(store.copy ? currentCopy.value : audioCurrentTime.value)
})
// computed property for audio duration output
const audioDurationOutput = computed(() => {
    return timeOutput(audioDuration.value)
})

// function is used to update current time output, not the value itself!
const updateAudioTime = (newValue) => {
    // normal behaviour (when audio isn't playing)
    if (!store.copy) {
        // updates audioCurrentTime
        audioCurrentTime.value = +newValue
        return
    }
    // updates copy (so we don't need to restart interval)
    currentCopy.value = +newValue 
}

// function updates audio.currentTime itself
const setAudioTime = (newValue) => {
    // if audio's already playing
    if (store.playing) {
        audioCurrentTime.value = audio.currentTime = +newValue
        return
    }
    // if audio isn't playing we just set the value
    audioCurrentTime.value = audio.currentTime = +newValue
}

// play pause function
const playPause = () => {
    store.playing = !store.playing
}

// function sets audio volume
const setAudioVolume = (newValue) => {
    // volume range has max=100 for the ease of perception
    audio.volume = +(newValue / 100).toFixed(2)
    audioVolume.value = audio.volume * 100
    localStorage.setItem('volume', audioVolume.value)
}

// previous audio volume level
let prev
const muteAudio = () => {
    // save prev if it's empty
    if (!prev) prev = audio.volume * 100
    // mute
    if (audio.volume) setAudioVolume(0)
    else {
        // unmute
        setAudioVolume(prev ? prev : +localStorage.getItem('volume') ? +localStorage.getItem('volume') : 100)
    }
}

// make thumb visible on player hover
const showThumb = (e) => {
    e.target.querySelector('.thumb').classList.add('active')
}
// hide thumb
const hideThumb = (e) => {
    if (e.target.querySelector('.custom-range') === document.activeElement) {
        return
    }
    e.target.querySelector('.thumb').classList.remove('active')
}
</script>

<style lang="scss" scoped>
.play {
    background: center no-repeat url('@/assets/images/play.svg');
    background-size: 26px;
    &.pause {
        background: center no-repeat url('@/assets/images/pause.svg');
        background-size: 26px;
    }
}
.download {
    background: center no-repeat url('@/assets/images/download.svg');
    background-size: 26px;
}
.volume {
    background: center no-repeat url('@/assets/images/volume-medium.svg');
    background-size: 24px;
    &.muted {
        background: -3px center no-repeat url('@/assets/images/volume-off.svg');
        background-size: 24px;
    }
}

.player-enter-active,
.player-leave-active {
  transition: .2s;
}

.player-enter-from {
    transform: translateY(63px);
}
.player-leave-to {
  transform: translateY(0px);
}
</style>