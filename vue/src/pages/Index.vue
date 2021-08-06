<template>
  <div class="form-box">
    <h1>Terrible Board Game</h1>
    <h2>Deluxe Edition?</h2>

    <router-link to="/create-room" class="link-button">Create a Room</router-link>

    <p>To join a private game - request a link from the room creator</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Index',
});
</script>
