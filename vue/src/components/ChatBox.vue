<template>
    <div v-show="opened" class="chatbox">
        <h1>Chat</h1>
        <section class="chat-contents">
            <div v-for="message in messages" :key="message.content" class="chat-message">
                <span class="chat-author">{{ message.author + ': ' }}</span>
                <span class="chat-message-content">{{ message.content }}</span>
            </div>
        </section>

        <section class="chat-input-bar">
          <input v-model="inputMessage" v-on:keyup.enter="sendMessage" placeholder="Say something!">
          <button v-on:click="sendMessage" v-bind:disabled="!validMessage">Send</button>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import socket from '../socket';

type ChatMessage = {
  author: string
  content: string
}

export default defineComponent({
  name: 'ChatBox',
  data() {
    return {
      opened: true,
      inputMessage: '',
      messages: [] as ChatMessage[],
    };
  },

  methods: {
    sendMessage() {
      if (!this.validMessage) return;

      socket.emit('chat-message', this.inputMessage);
      this.inputMessage = '';
    },
  },

  computed: {
    validMessage(): boolean {
      return this.inputMessage.length >= 1 && this.inputMessage.length <= 100;
    },
  },

  created() {
    // Setup listener for socket chat messsages
    socket.on('chat-message', (details: ChatMessage) => {
      this.messages.push(details);
    });
  },
});
</script>

<style scoped lang="scss">
.chatbox {
  background-color: $accent-color;
  border-radius: 8px;
  padding: 8px;
  max-width: 600px;

  h1 {
    color: white;
    margin: 0;
    padding: 0;
  }

  .chat-contents {
    display: flex;
    flex-direction: column;
    background-color: white;

    margin: 12px 0;
    height: 200px;
    overflow-y: scroll;

    .chat-message {
      padding: 4px;
      word-wrap: break-word;
      white-space: normal;

      .chat-author { font-weight: bold; }
      &:nth-of-type(2n) { background-color: #eee; }
    }
  }

  .chat-input-bar {
    display: flex;

    input {
      flex-grow: 19;
      outline: none;
      border: none;
    }

    button {
      flex-grow: 1;
      outline: none;
      border: none;
    }
  }
}
</style>
