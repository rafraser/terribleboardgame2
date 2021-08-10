<template>
  <div>
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

    <div class="players-container">
      <PlayerInfo
        v-for="player in players"
        :key="player.username"
        :player="player"
      >
      </PlayerInfo>
    </div>

    <ChatBox></ChatBox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RoomDetails } from '../types/room';
import { roomState, updateDetails } from '../roomstate';
import socket from '../socket';

import ChatBox from '../components/ChatBox.vue';
import PlayerInfo from '../components/PlayerInfo.vue';

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

  components: {
    ChatBox,
    PlayerInfo,
  },
});
</script>

<style lang="scss">
.players-container {
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  box-sizing: border-box;

  width: 100%;
  height: 80px;
  background-color: $accent-gray;
}
</style>
