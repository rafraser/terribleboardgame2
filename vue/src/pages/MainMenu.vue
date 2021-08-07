<template>
  <div class="form-box">
    <h1>Terrible Board Game</h1>
    <h2>Deluxe Edition?</h2>

    <div id="menu-buttons">
      <router-link to="/create" class="button menu-button">Create a Room</router-link>
      <router-link to="/join" class="button menu-button">Join a Room</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainMenu',
});
</script>

<style lang="scss">
#menu-buttons {
  display: flex;
  flex-direction: column;

  .menu-button {
    min-width: 40%;
  }
}
</style>
