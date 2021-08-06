<template>
    <div class="spinner">
        <div class="spinner-rings"></div>
        <img src="@/assets/img/fox.png" alt="Fox logo">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'LoadingSpinner' });
</script>

<style scoped lang="scss">
$spinner-size: 300px;
$fox-size: 200px;

.spinner {
    display: inline-block;
    position: absolute;
    width: $spinner-size;
    height: $spinner-size;

    // Center in the page
    top: 50%;
    left: 50%;
    margin-left: -1 * $spinner-size/2;
    margin-top: -1 * $spinner-size/2;
    z-index: 100;

    // Spinny fox go brrr
    img {
        width: $fox-size;
        height: $fox-size;
        margin: ($spinner-size - $fox-size) / 2;
        animation: spinner-loading-ring 6s linear infinite;
    }

    // Add some nice rings around the fox
    .spinner-rings {
        content: '';
        display: block;
        position: absolute;
        width: $spinner-size;
        height: $spinner-size;
        box-sizing: border-box;

        border-radius: 50%;
        border: 12px solid transparent;
        border-color: $accent-color $accent-gray $accent-color $accent-gray;

        animation: spinner-loading-ring 2s linear infinite;
    }
}

@keyframes spinner-loading-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
