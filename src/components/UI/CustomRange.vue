<template>
    <div
        class="custom-range relative cursor-pointer h-[3px] w-full box-border flex items-center bg-base-200 focus:outline-none"

        ref="range"
        
        @mousedown.prevent="thumbHandler"
        @focus="showThumb"
        @focusout="hideThumb"

        tabindex="0"
    >
        <div
            class="beforethumb h-full w-0 bg-primary"

            ref="beforethumb"
        ></div>
        <transition name="thumb">
            <div
                class="thumb opacity-0 absolute w-[12px] h-[12px] rounded-full bg-primary "

                ref="thumb"
            >
            </div>        
        </transition>

    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
// global store
import { useStore } from '@/store/index';
const store = useStore()
const emit = defineEmits(['updateValue', 'setValue'])
const props = defineProps({
    max: Number,
    value: Number,
    mode: String,
})

// html elements
const range = ref(null)
const thumb = ref(null)
const beforethumb = ref(null)

// range value
const value = ref(props.value)

let movePrice
onMounted(() => {
    // default thumb position
    thumb.value.style.left = -(thumb.value.offsetWidth / 2) + 'px'
    // movePrice initialization
    movePrice = +( props.max / range.value.clientWidth).toFixed(2)
})

watch(() => props.value, (newValue, oldValue) => {
    // react to props.value change
    if (newValue === oldValue) return
    if (newValue > props.max) {
        emit('setValue', value.value = props.max)
        moveThumb(null, value.value)
        return
    }
    moveThumb(null, newValue)
})

// change value without submitting it
const changeValue = (thumbPos) => {
    let newValue = (thumbPos / movePrice).toFixed(0)
    value.value = newValue
    // live mode = submit value on every move/change
    if (props.mode === 'live') return emit('setValue', value.value)

    // update (used for current time output)
    emit('updateValue', value.value)
}

const moveThumb = (event, value) => {
    // updating movePrice to handle resize and zoom on the page
    movePrice = +(range.value.clientWidth / props.max).toFixed(2)
    if (value !== undefined) {
        // props value change
        beforethumb.value.style.width = Math.ceil(value * movePrice) + 'px'
        thumb.value.style.left = Math.ceil(value * movePrice) - (thumb.value.offsetWidth / 2) + 'px'
        return
    }
    let newLeft = event.clientX - ( thumb.value.offsetWidth / 2 );
    let rightEdge = range.value.clientWidth - ( thumb.value.offsetWidth / 2 );
    //left side limitation
    if ( newLeft < -(thumb.value.offsetWidth / 2) ) {
        newLeft = -(thumb.value.offsetWidth / 2);
    }
    let width = newLeft + ( thumb.value.offsetWidth / 2 )
    // right side limitation
    if ( newLeft + ( thumb.value.offsetWidth / 2 ) + 1 === range.value.clientWidth ) {
        newLeft = rightEdge;
        width = range.value.clientWidth
    }
    beforethumb.value.style.width = width + 'px'
    thumb.value.style.left = newLeft + 'px'
    changeValue(newLeft + (thumb.value.offsetWidth / 2))
}
const thumbHandler = (event) => {
    // setting copy to true to be able to choose time while audio is playing
    store.copy = true
    // focus range to make thumb visible
    range.value.focus()
    // move thumb on click
    moveThumb(event)
    document.addEventListener('mousemove', moveThumb);
    document.addEventListener('mouseup', onMouseUp);
    // remove event listeners
    function onMouseUp() {
        // confirm range value
        store.copy = false
        emit('setValue', value.value)
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', moveThumb);
    }
}

// show thumb on range focus
const showThumb = (e) => e.target.querySelector('.thumb').classList.add('active')
const hideThumb = (e) => e.target.querySelector('.thumb').classList.remove('active')
</script>

<style lang="scss">
.thumb {
    transition: opacity .2s;
    &.active {
        opacity: 100;
        transition: opacity .2s;
    }
}
</style>