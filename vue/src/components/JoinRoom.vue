<template>
    <div>
      <h2>{{ $route.params.code }}</h2>
      <h3>Enter a username to join</h3>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JoinRoom',
});
</script>
