<template>
  <div
    v-show="show"
    id="AdTimer"
    class="BorderTop BorderLeft"
  >
    Twitch Ads Running: {{ time }}
  </div>
</template>

<script>
export default {
  name: 'AdTimer',
  data() {
    return {
      show: false,
      adEnds: 0,
      time: '0:00',
    };
  },
  created() {
    nodecg.listenFor('twitchAdStarted', 'nodecg-speedcontrol', (adInfo) => {
      this.show = true;
      this.adEnds = Date.now() + adInfo.duration * 1000;
      this.updateCountdown();
    });
  },
  methods: {
    updateCountdown() {
      const remainingAdTime = (this.adEnds - Date.now()) / 1000;
      if (remainingAdTime > 0) {
        const minutes = Math.floor(remainingAdTime / 60);
        const seconds = Math.floor(remainingAdTime - minutes * 60);
        this.time = `${minutes}:${this.pad(seconds)}`;
        setTimeout(this.updateCountdown, 1000);
      } else {
        this.time = '0:00';
        this.show = false;
      }
    },
    pad(num) {
      return num.toString().padStart(2, '0');
    },
  },
};
</script>

<style scoped>
  @import url('../../_misc/components/FlexContainer.css');

  #AdTimer {
    padding: 8px;
    font-size: 20px;
    background-color: rgba(0,0,0,0.3);
    width: 200px;
    text-align: center;
  }
</style>
