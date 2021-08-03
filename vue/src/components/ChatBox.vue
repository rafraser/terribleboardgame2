<template>
    <div class="chatbox">
        <section class="chat-contents">
            <div v-for="message in messages" :key="message.body" class="chat-message">
                <span class="chat-author">{{ message.author + ': ' }}</span>
                <span class="chat-message-content">{{ message.body }}</span>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import socket from '../socket';

type ChatMessage = {
  author: string
  body: string
}

export default defineComponent({
  name: 'ChatBox',
  data() {
    return {
      messages: [
        { author: 'SYSTEM', body: 'This is a testing message.' },
        { author: 'SYSTEM', body: 'Please do not be alarmed.' },
      ] as ChatMessage[],
    };
  },

  methods: {
    addMessage(author: string, body: string) {
      this.messages.push({ author, body });
    },

    sendMessage(content: string) {
      socket.emit('chat-message', content);
    },
  },

  created() {
    // Setup listener for socket chat messsages
    socket.on('chat-message', (details: ChatMessage) => {
      this.addMessage(details.author, details.body);
    });
  },
});
</script>

<style scoped lang="scss">
.chatbox {
  width: 500px;
  height: 500px;
  background-color: $accent-color;
  padding: 16px;

  .chat-contents {
    display: flex;
    flex-direction: column;

    .chat-message {
      .chat-author {
        font-weight: bold;
      }
    }
  }
}
</style>
