<template>
  <div class="flex flex-col min-h-screen">
    <Transition name="overlay">
      <BeatstoreOverlayMain
        v-if="mobile"
        :active="showOverlay"
        @overlay="toggleOverlay"
      />
    </Transition>

    <BeatstoreHeader
      @overlay="toggleOverlay"
    />

    <main
      :class="'main relative grow flex flex-col bg-cover bg-no-repeat pb-[75px]'"
    >
      <router-view />

    </main>
    <div class="fixed bottom-0 w-full">
      <BeatstorePlayer
      />
      <BeatstoreFooter
      />
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

// components
import BeatstoreHeader from './components/BeatstoreHeader.vue'
import BeatstoreFooter from './components/BeatstoreFooter.vue'
import BeatstoreOverlayMain from './components/BeatstoreOverlayMain.vue';
import BeatstorePlayer from './components/BeatstorePlayer.vue';

//Window with < 600 check
import { useResize } from '@/components/composables/MobileCheck';
const mobile = useResize(600)

// overlay state
const showOverlay = ref(false)
function toggleOverlay() {
  document.querySelector('#body').classList.toggle('overflow-y-hidden')
  showOverlay.value = !showOverlay.value
}

//Global states
provide('showOverlay', showOverlay)
</script>

<style lang="scss">
// fonts load
@import url("@/assets/fonts/fonts.css");

#app {
  background: no-repeat url('@/assets/images/mesh-gradient.png');
  background-size: cover;
  // background: linear-gradient(110deg, white 0%, #6c0de7 75%, #745fc7 100%);
}

// .shadowed  {
//   text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.255);
// }

.responsive {
  @media screen and (max-width: 1700px) {
    width: 1316px;
    max-width: 1316px;
  }
  @media screen and (max-width: 1368px) {
    width: 984px;
    max-width: 984px;
  }
  @media screen and (max-width: 1030px) {
    width: 652px;
    max-width: 652px;
  }
  @media screen and (max-width: 700px) {
    width: 320px;
    max-width: 320px;
  }
}

//Overlay fade transition
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity .2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

//Loading overlay fade transition
.loadingoverlay-enter-active,
.loadingoverlay-leave-active {
  transition: opacity .2s ease;
}
.loadingoverlay-enter-from,
.loadingoverlay-leave-to {
  opacity: 0;
}
</style>
