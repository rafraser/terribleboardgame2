<template>
    <div class="form-box">
        <h1>LOBBY</h1>
        <p>please grab a drink, the game will start never</p>

        <h3>Connected Players</h3>
        <ul>
          <li v-for="player in players" :key="player.username">
            {{ player.username }}
          </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RoomDetails } from '../types/room';
import { roomState, updateDetails } from '../roomstate';
import socket from '../socket';

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

    // Setup top-level socket handlers
    socket.on('update-room-details', (roomData: RoomDetails) => {
      updateDetails(roomData);
    });
  },
});
</script>
