<template>
    <div class="player-info">
        <div class="player-info-box">{{ boxContent }}</div>
        <div class="player-info-name">{{ player.username }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Player } from '../types/player';

export default defineComponent({
  name: 'PlayerInfoBox',

  props: {
    player: { type: Object as PropType<Player>, required: true },
    icon: String,
  },

  computed: {
    boxContent(): string {
      if (this.icon) {
        // todo - nicer formatting
        // font awesome?
        return this.icon;
      }
      return String(this.player.score);
    },
  },
});
</script>

<style scoped lang="scss">
.player-info {
  width: 96px;
  height: 80px;
  margin: 0 6px;
  text-align: center;
  background-color: $accent-color;

  .player-info-box {
    height: 60px;
    line-height: 60px;

    color: white;
    font-size: 32px;
    font-weight: bold;
  }

  .player-info-name {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 20px;
    font-size: 12px;
    overflow: hidden;

    color: white;
    background-color: rgba(0, 0, 0, 0.20);
  }
}
</style>
