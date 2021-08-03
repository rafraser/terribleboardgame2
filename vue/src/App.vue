<template>
  <h1>Hello, World</h1>
  <ChatBox></ChatBox>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChatBox from './components/ChatBox.vue';

export default defineComponent({
  name: 'App',
  components: {
    ChatBox,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
}
</style>
