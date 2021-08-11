<template>
    <div class="chatbox" :class="{ opened: opened }" @click="toggleChatState">
        <section class="chat-header">
          <span>Chat</span>
          <span v-if="unread > 0" class="chat-unread">{{ unread }} unread</span>
        </section>

        <section class="chat-contents" ref="messagebox" @click.stop>
            <div v-for="message in messages" :key="message.content" class="chat-message">
                <span class="chat-author">{{ message.author + ': ' }}</span>
                <span class="chat-message-content">{{ message.content }}</span>
            </div>
        </section>

        <section class="chat-input-bar" @click.stop>
          <input
            v-model="inputMessage" @keyup.enter="sendMessage"
            :disabled="!opened" placeholder="Say something!"
          >
          <button @click.stop="sendMessage" :disabled="!validMessage">Send</button>
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
      unread: 0,
    };
  },

  methods: {
    sendMessage() {
      if (!this.validMessage) return;

      socket.emit('chat-message', this.inputMessage);
      this.inputMessage = '';
    },

    receiveMessage(message: ChatMessage) {
      this.messages.push(message);
      if (!this.opened) this.unread += 1;
    },

    toggleChatState() {
      this.opened = !this.opened;
      if (this.opened) this.unread = 0;
    },
  },

  computed: {
    validMessage(): boolean {
      return this.inputMessage.length >= 1 && this.inputMessage.length <= 100;
    },
  },

  created() {
    // Setup listener for socket chat messsages
    socket.on('chat-message', this.receiveMessage);
  },

  updated() {
    // Scroll to bottom
    const box = this.$refs.messagebox as HTMLElement;
    box.scrollTop = box.scrollHeight;
  },

  beforeUnmount() {
    socket.off('chat-message');
  },
});
</script>

<style scoped lang="scss">
$chatbox-height: 240px;
$chatbox-header-height: 40px;

.chatbox {
  position: fixed;
  box-sizing: border-box;

  right: 16px;
  bottom: (-1 * $chatbox-height) + $chatbox-header-height;
  transition: bottom 0.3s ease-in-out;

  &.opened {
    bottom: 16px;
  }

  width: 25vw;
  max-width: 600px;
  height: $chatbox-height;

  background-color: $accent-color;
  border-radius: 8px;
  padding: 0 8px;

  .chat-header {
    color: white;
    font-weight: bold;
    height: $chatbox-header-height;
    font-size: 24px;
    line-height: 40px;

    .chat-unread {
      font-size: 16px;
      margin-left: 8px;
    }
  }

  .chat-contents {
    display: flex;
    flex-direction: column;
    height: $chatbox-height - $chatbox-header-height - 32px;

    background-color: white;
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
    box-sizing: border-box;
    height: 32px;
    padding: 6px 0;

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
