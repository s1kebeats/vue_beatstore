<template>
    <section class="flex flex-col items-center py-[50px] 600:py-[10px]">
        <!-- <button data-set-theme="" data-act-class="ACTIVECLASS" class="btn btn-sm"></button>
        <button data-set-theme="dark" data-act-class="ACTIVECLASS" class="btn btn-sm"></button>
        <button data-set-theme="pink" data-act-class="ACTIVECLASS" class="btn btn-sm"></button> -->
        
        <h1 class="text-xl my-5 text-black font-semibold select-none">
            Latest on Youtube
        </h1>
        <div class="h-[300px] w-[640px] bg-base-300 rounded-lg 700:w-[90%] 700:h-[25vh]">
            <iframe
                class="shadow-lg w-full h-full rounded-lg"
                v-if="videoUrl"
                :src="videoUrl"
                alt="youtube player"
                title="YouTube video player"
                frameborder="0"
                allowfullscreen
            >
            </iframe>
            <LoadingShimmer v-else></LoadingShimmer>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { themeChange } from 'theme-change'

const youtube_api_key = 'AIzaSyDK5cSuQLy3-Q2rYXDSEa4K4PJU5mGLV_0'
const apiUrl = ref(`https://www.googleapis.com/\
                    youtube/v3/playlistItems?part=snippet\
                    &playlistId=UUwiS4Xhzg6LH_tmIMsfQRcA\
                    &maxResults=1\
                    &key=${youtube_api_key}`.split(' ').join(''))
const videoUrl = ref('')

// load last youtube video
onMounted(() => {
    fetch(apiUrl.value)
        .then(response => response.json())
        .then(data => {
            let id = data.items[0].snippet.resourceId.videoId;
            videoUrl.value = `https://www.youtube.com/embed/${id}`
        })
        .catch(e => console.log(e))
    themeChange(false)
})
</script>
