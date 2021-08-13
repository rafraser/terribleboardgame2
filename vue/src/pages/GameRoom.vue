<template>
  <div v-if="status == 'lobby'" class="form-box">
    <h1>Lobby</h1>
    <h2>{{ roomCode }}</h2>

    <h3>Connected Players</h3>
    <span v-for="player in players" :key="player.username">{{ player.username }}<br></span>

    <button class="button offset-top" v-if="isHost" @click="requestStartGame">Start Game</button>
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

  <div v-if="status == 'ingame'">
    <component v-if="status == 'ingame'" :is="game"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RoomDetails } from '../types/room';
import { roomState, updateDetails } from '../roomstate';
import socket from '../socket';

import ChatBox from '../components/ChatBox.vue';
import PlayerInfo from '../components/PlayerInfo.vue';
import GameComponents from '../games';

export default defineComponent({
  name: 'Room',
  data() {
    return roomState;
  },

  methods: {
    requestStartGame() {
      if (!this.isHost || this.status !== 'lobby') return;
      socket.emit('request-start-game');
    },
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

    // Set this player as the room host
    socket.on('set-room-host', () => {
      console.log('Setting the room host!');
      this.isHost = true;
    });
  },

  components: {
    ChatBox,
    PlayerInfo,
    ...GameComponents,
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
