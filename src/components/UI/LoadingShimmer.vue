<template>
    <div title="Loading" class="shimmer overflow-hidden relative w-full h-full bg-base-300">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'LoadingShimmer',
}
</script>
<style lang="scss">
.shimmer::before {
  content: '';
  position: absolute;
  background: linear-gradient(
  90deg,
  rgba(255,255,255,0) 0%,
  rgba(255,255,255,0.4) 50%,
  rgba(255,255,255,0) 100%
  );
  height: 100%;
  width: 100%;
  z-index: 1;
  animation: shimmer 1s infinite;
}
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>