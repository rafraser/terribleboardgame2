<template>
  <canvas
    ref="canvas" :width="width" :height="height"
    @onmousedown="onMouseDown" @onmouseup="onMouseUp" @onmousemove="onMouseMove"
  >
  </canvas>
</template>

<script lang="ts">
/* eslint no-param-reassign: ["error", { "props": false }] */
import { defineComponent } from 'vue';

type Point = { x: number, y: number };

export default defineComponent({
  name: 'ColorPalette',
  props: {
    width: { type: Number, default: 512 },
    height: { type: Number, default: 512 },
    color: { type: String, default: 'red' },
  },

  data() {
    return {
      pointCache: [] as Point[],
      lastPoint: null as Point | null,
      isDrawing: false,
    };
  },

  methods: {
    ctx(): CanvasRenderingContext2D|null {
      return (this.$refs.canvas as HTMLCanvasElement).getContext('2d');
    },

    drawStyle(ctx: CanvasRenderingContext2D) {
      ctx.strokeStyle = this.$props.color;
    },

    getPosition(event: MouseEvent): Point {
      const canvas = (this.$refs.canvas as HTMLElement);
      const mouseX = event.pageX - canvas.offsetLeft;
      const mouseY = event.pageY - canvas.offsetTop;
      return { x: mouseX, y: mouseY };
    },

    onMouseDown(event: MouseEvent) {
      this.isDrawing = true;
      this.lastPoint = this.getPosition(event);
    },

    onMouseMove(event: MouseEvent) {
      const ctx = this.ctx();
      if (!this.isDrawing || !ctx) return;

      const point = this.getPosition(event);
      this.pointCache.push(point);

      // Build the stroke as we go, but only network strokes on release
      if (this.lastPoint) {
        ctx.beginPath();
        this.drawStyle(ctx);
        ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
    },

    onMouseUp() {
      if (!this.isDrawing) return;
      this.$emit('draw', this.pointCache);

      this.pointCache = [];
      this.lastPoint = null;
      this.isDrawing = false;
    },
  },
});
</script>
