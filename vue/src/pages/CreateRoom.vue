<template>
  <div class="form-box">
    <h1>Create Room</h1>

    <form autocomplete="off" @submit.prevent>
      <label for="room-username">Nickname</label>
      <input type="text" id="room-username" placeholder="Nickname">

      <button class="link-button">Create Room</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateRoom',
});
</script>

<style lang="scss">
form {
    text-align: left;
    width: 75%;
    margin: 0 auto;
}

#room-username {
    display: block;
    margin-top: 4px;
    margin-bottom: 64px;
    padding: 4px;
    font-size: 16px;
    width: 100%;
}
</style>
