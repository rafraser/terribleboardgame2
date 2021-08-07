<template>
    <div class="form-box">
        <h1>LOBBY</h1>
        <p>please grab a drink, the game will start never</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { roomState } from '../roomstate';

export default defineComponent({
  name: 'Room',
  data() {
    return roomState;
  },

  created() {
    // If we're not connected, yeet back to the lobby
    if (!this.connected) {
      this.$router.replace(`/join/${this.$route.params.code}`);
    }
  },
});
</script>
