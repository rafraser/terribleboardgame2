<template>
  <transition name="fade">
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <JoinRoom v-else-if="!loading && !errorMessage"></JoinRoom>
    <div v-else class="form-box"><h1>{{ errorMessage }}</h1></div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JoinRoom from '../components/JoinRoom.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

export default defineComponent({
  name: 'Room',
  data() {
    return {
      state: 'joining',
      loading: true,
      errorMessage: null as string|null,
    };
  },

  async created() {
    const roomCode = this.$route.params.code;
    const resp = await fetch(`${process.env.VUE_APP_API}/api/rooms/${roomCode}`);
    const roomState = await resp.json();

    if (!roomState.exists) {
      this.errorMessage = 'Room does not exist.';
    } else if (roomState.playerCount >= 8) {
      this.errorMessage = 'Room is already full.';
    } else if (roomState.status !== 'lobby') {
      this.errorMessage = 'Room is already in-game.';
    }
    this.loading = false;
  },

  components: {
    JoinRoom,
    LoadingSpinner,
  },
});
</script>
