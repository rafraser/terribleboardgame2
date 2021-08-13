<template>
  <div class="color-palette-box">
    <div
      v-for="color in $props.colors"
      :key="color"
      :style="{ backgroundColor: color }"
      :class="{ selected: color == selectedColor }"
      @click="setColor(color)"
      class="color-palette-swatch"
    >
      <span v-if="color == selectedColor">✓</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ColorPalette',
  props: {
    colors: { type: Array as PropType<string[]>, required: true },
  },

  data() {
    return {
      selectedColor: this.$props.colors[0],
    };
  },

  methods: {
    setColor(color: string) {
      console.log('updating', color);
      this.selectedColor = color;
      this.$emit('update-color', color);
    },
  },
});
</script>

<style scoped lang="scss">
@use 'sass:math';
$swatch-size: 48px;
$padding-size: math.div($swatch-size, 4);
$half-size: math.div($swatch-size, 2);

.color-palette-box {
  display: inline-block;
  padding: $padding-size 0 0 $padding-size;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  .color-palette-swatch {
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    width: $swatch-size;
    height: $swatch-size;
    border-radius: 25%;
    margin: 0 $padding-size $padding-size 0;

    &.selected {
      box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.75);

      span {
        display: block;
        width: $half-size; height: $half-size;
        margin-top: $padding-size; margin-left: $padding-size;
        line-height: $half-size; text-align: center;

        color: white;
        font-weight: bold;
        border-radius: 100%;
        background-color: rgba(0, 0, 0, 0.25);
      }
    }
  }
}
</style>
