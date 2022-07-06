<template>
    <div
        class="custom-range relative cursor-pointer h-[3px] box-border flex items-center bg-base-200 focus:outline-none"
        
        @mousedown.prevent="thumbHandler"
        @focus="showThumb"
        @focusout="hideThumb"

        tabindex="0"
        ref="range"
    >
        <div
            ref="beforethumb"
            class="beforethumb h-full w-0 bg-primary"
        ></div>
        <transition name="thumb">
            <div
                ref="thumb"
                class="thumb opacity-0 absolute w-[12px] h-[12px] rounded-full bg-primary"
            >
            </div>        
        </transition>

    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
const emit = defineEmits(['changeValue', 'updateValue'])
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
    // range margins
    range.value.style.marginInline = (thumb.value.offsetWidth / 2) + 'px'
    // default thumb position
    thumb.value.style.left = -(thumb.value.offsetWidth / 2) + 'px'
    // movePrice initialization
    movePrice = +( props.max / range.value.clientWidth).toFixed(2)
})

watch(() => props.value, (newValue, oldValue) => {
    // react to props.value change
    if (newValue === oldValue) return
    if (newValue > props.max) {
        emit('updateValue', value.value = props.max)
        moveThumb(null, value.value)
        return
    }
    moveThumb(null, newValue)
})

const changeValue = (thumbPos) => {
    let newValue = (thumbPos / movePrice).toFixed(0)
    value.value = newValue
    // live mode = submit value on every move/change
    if (props.mode === 'live') return emit('changeValue', value.value)
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
    let newLeft = event.clientX - range.value.getBoundingClientRect().left - ( thumb.value.offsetWidth / 2 );
    let rightEdge = range.value.clientWidth - ( thumb.value.offsetWidth / 2 );
    //left side limitation
    if ( newLeft < -(thumb.value.offsetWidth / 2) ) {
        newLeft = -(thumb.value.offsetWidth / 2);
    }
    // right side limitation
    if ( newLeft > rightEdge ) {
        newLeft = rightEdge;
    }
    beforethumb.value.style.width = newLeft + (thumb.value.offsetWidth / 2) + 'px'
    thumb.value.style.left = newLeft + 'px'
    changeValue(newLeft + (thumb.value.offsetWidth / 2))
}

const thumbHandler = (event) => {
    range.value.focus()
    // click
    moveThumb(event)
    document.addEventListener('mousemove', moveThumb);
    document.addEventListener('mouseup', onMouseUp);
    // remove event listeners
    function onMouseUp() {
        // confirm range value
        emit('changeValue', value.value)
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', moveThumb);
    }
}

// show thumb on range focus
const showThumb = (e) => e.target.querySelector('.thumb').classList.add('active')
const hideThumb = (e) => {
    // keep thumb visible if range is focused
    if (e.target.querySelector('.custom-range') === document.activeElement) {
        return
    }
    e.target.querySelector('.thumb').classList.remove('active')
}
</script>

<style lang="scss" scoped>
.thumb {
    transition: opacity .2s;
    &.active {
        opacity: 100;
        transition: opacity .2s;
    }
}
</style>