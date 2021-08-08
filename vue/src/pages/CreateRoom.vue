<template>
  <div class="form-box">
    <h1>Create Room</h1>
    <p v-if="validationError">{{ validationError }}</p>

    <form autocomplete="off" @submit.prevent="requestCreateRoom">
      <label for="room-username">Nickname</label>
      <input type="text" id="room-username" placeholder="Nickname" v-model="username">

      <button class="button">Create Room</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { joinLobby } from '../roomstate';
import socket from '../socket';
import { RoomDetails } from '../types/room';

export default defineComponent({
  name: 'CreateRoom',
  data() {
    return {
      username: '',
      submitted: false,
      validationError: '',
    };
  },

  methods: {
    requestCreateRoom() {
      if (!this.username) return;

      this.validationError = '';
      this.submitted = true;
      socket.emit('create-room', this.username);
    },
  },

  created() {
    // Setup listener for error messages
    socket.on('login-error', (message: string) => {
      this.validationError = message;
      this.submitted = false;
    });

    socket.on('login-success', (roomData: RoomDetails) => {
      joinLobby(roomData);
      this.$router.replace(`/game/${roomData.roomCode}`);
    });
  },
});
</script>
