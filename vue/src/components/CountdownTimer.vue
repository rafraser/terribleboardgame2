<template>
  <div class="timer-gradient" :style="this.gradient">
    <span>{{ Math.floor(this.remaining) }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// 70% is "roughly" full width of the circle (no idea as to the math behind that one)
const innerGradient = 'radial-gradient(#00a8ff 50%, transparent 51%, transparent 64%, #00a8ff 65%)';

export default defineComponent({
  name: 'CountdownTimer',
  props: {
    duration: { type: Number, required: true },
  },

  data() {
    return {
      start: Date.now(),
      elapsed: 0,
    };
  },

  computed: {
    remaining(): number {
      return Math.max(0, this.duration - this.elapsed);
    },

    percentage() {
      return (this.elapsed / this.duration) * 100;
    },

    gradient() {
      const p = 100 - this.percentage;
      return {
        background: `${innerGradient}, conic-gradient(#f5f6fa 0% ${p}%, #0097e6 ${p}% 100%)`,
      };
    },
  },

  methods: {
    calculateElapsed(): number {
      return (Date.now() - this.start) / 1000;
    },

    draw() {
      this.elapsed = this.calculateElapsed();
      if (this.remaining <= 0) {
        this.$emit('timeup');
        return;
      }

      requestAnimationFrame(this.draw);
    },

    startTimer() {
      this.start = Date.now();
      this.draw();
      console.log('Started countdown timer', this.start);
    },
  },

  watch: {
    duration(newVal) {
      console.log('duration changed');
      if (newVal <= 0) return;
      this.startTimer();
    },
  },

  created() {
    this.startTimer();
  },
});
</script>

<style lang="scss" scoped>
$timer-size: 96px;
$timer-offset: 16px;

.timer-gradient {
  position: absolute;
  top: $timer-offset;
  right: $timer-offset;

  width: $timer-size;
  height: $timer-size;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #f5f6fa;
    font-size: 40px;
    font-weight: bold;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
  }
}
</style>
