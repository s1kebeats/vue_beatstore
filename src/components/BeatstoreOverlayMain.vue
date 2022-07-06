<template>
    <BeatstoreOverlay
        :active="active"
    >
        <BeatstoreHeader
            class="bg-transparent min-h-[65px] text-white"
        >
            <button
                class="btn btn-primary btn-square btn-xs absolute right-5 hover:bg-primary hover:border-primary overlay-btn_close"

                title="Close overlay"
                @click="emit('overlay')"
            >
            </button>
        </BeatstoreHeader>
        <main
            class="grow flex items-center justify-center flex-col h-full w-full"
        >
            <BeatstoreNav
                :classes="{
                    main: 'grow-0 flex flex-col gap-[5px]', link: 'text-white text-xl'
                }"
                @click="emit('overlay')"
            />
        </main>
        <BeatstoreFooter
            class="w-full"
        />
    </BeatstoreOverlay>
</template>

<script setup>
// elements
import BeatstoreHeader from './BeatstoreHeader.vue';
import BeatstoreFooter from './BeatstoreFooter.vue';
import BeatstoreOverlay from '@/components/UI/BeatstoreOverlay.vue';
import BeatstoreNav from '@/components/UI/BeatstoreNav.vue';
const props = defineProps({
    active: Boolean,
})
const emit = defineEmits([ 'overlay'])
</script>

<style lang="scss">
.overlay {
    &-h {
        background: none;
        box-shadow: none;
        min-height: 65px;
        color: white;
    }
    &-b {
        flex-grow: 1;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    &-f {
        width: 100%;
    }
}
.overlay-nav-m {
    flex-grow: 0;
    display: flex;
    font-size: 2.2rem;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 30px;
    &__link {
        color: white;
    }
}
.overlay-nav {
    justify-content: flex-end;
    gap: 25px;
    flex-grow: 1;
    font-size: 1.7rem;
    &__link {
        max-width: 140px;
        color: white;
        transition: color .2s;

    }
}
.overlay-btn_close {
    background: center no-repeat url('@/assets/images/close.svg');
    background-size: 18px;
}
</style>