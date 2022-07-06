<template>
    <div class="flex flex-col w-[1648px]
      responsive
    ">
        <div class="flex flex-wrap gap-3 select-none">
            <transition-group name="list">
                <BeatstoreBeat
                    v-for="item in list"
                    :key="item.id"
                    :beat="item"
                />           
            </transition-group>
        </div>
    </div>
</template>
<script setup>
import BeatstoreBeat from './UI/BeatstoreBeat.vue';
const props = defineProps({
    list: Array,
})
</script>
<style lang="scss">
.list-enter-active {
  animation: bounce-in .1s;
}
.list-leave-active {
  animation: bounce-in .1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(.95);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>