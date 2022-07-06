<template>
    <header
        class="w-full h-[65px] box-border flex items-center gap-[20px] px-[20px] font-medium text-center select-none"
    >
        <BeatstoreLogo
            class="600:flex-1"
        />
        <slot>
            <BeatstoreNav
                class="600:hidden"
                :classes="{}"
            />
            <button
                v-if="mobile"
                class="btn btn-primary btn-square btn-xs absolute right-5 hover:bg-primary hover:border-primary overlay-btn shadow-md"
                title="Toggle overlay"
                @click="emit('overlay')"
            >
            </button>
        </slot>
    </header>
</template>

<script setup>
import BeatstoreNav from '@/components/UI/BeatstoreNav.vue';
import BeatstoreLogo from '@/components/UI/BeatstoreLogo.vue';

//Window with < 600 check
import { useResize } from '@/components/composables/MobileCheck';
const mobile = useResize(600)
const emit = defineEmits([ 'overlay', ])
</script>

<style lang="scss">
.overlay-btn {
    background: center no-repeat url('@/assets/images/menu.svg');
    background-size: 18px;
}
</style>