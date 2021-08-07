<template>
  <div class="form-box">
    <h1>Join Room</h1>
    <p v-if="validationError">{{ validationError }}</p>

    <form autocomplete="off" @submit.prevent="requestJoinRoom">
      <label for="room-roomcode">Room Code</label>
      <input
        type="text"
        id="room-roomcode"
        placeholder="Room Code"
        v-model="roomCode"
        :disabled="lockedRoomCode"
        maxlength="4"
      >

      <label for="room-username">Nickname</label>
      <input type="text" id="room-username" placeholder="Nickname" v-model="username">

      <button class="button">Join Room</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { joinLobby } from '../roomstate';
import socket from '../socket';

export default defineComponent({
  name: 'Room',
  data() {
    return {
      roomCode: '',
      lockedRoomCode: false,
      username: '',
      submitted: false,
      validationError: '',
    };
  },

  methods: {
    requestJoinRoom() {
      if (!this.username) return;

      this.validationError = '';
      this.submitted = true;
      socket.emit('join-room', this.roomCode, this.username);
    },
  },

  created() {
    // Check if the room code is specified in the URL or not
    if (this.$route.params.code) {
      this.roomCode = this.$route.params.code as string;
      this.lockedRoomCode = true;
    }

    // Setup listener for error messages
    socket.on('login-error', (message: string) => {
      this.validationError = message;
      this.submitted = false;
    });

    socket.on('login-success', (roomData: { roomCode: string }) => {
      joinLobby(roomData.roomCode, []);
      this.$router.replace(`/game/${roomData.roomCode}`);
    });
  },
});
</script>
