<template>
  <div id="Layout">
    <!-- Game Captures -->
    <capture
      id="GameCapture1"
      class="GameCapture BorderLeft"
    ></capture>

    <!-- Camera Captures -->
    <capture
      id="CameraCapture1"
      class="CameraCapture"
    ></capture>

    <!-- Information Storage -->
    <info-storage-box>
      <player-container></player-container>
      <commentators></commentators>
      <div
        id="GameInfo"
        class="BorderBottom"
      >
        <game-name></game-name>
        <game-extra-info></game-extra-info>
        <timer></timer>
      </div>
      <sponsor-logos></sponsor-logos>
    </info-storage-box>

    <!-- Donations Bar -->
    <donations-bar class="BorderLeft"></donations-bar>
  </div>
</template>

<script>
import Capture from '../_misc/components/Capture.vue';
import Commentators from './components/Commentators.vue';
import DonationsBar from './components/DonationsBar.vue';
import GameExtraInfo from './components/GameExtraInfo.vue';
import GameName from './components/GameName.vue';
import InfoStorageBox from '../_misc/components/InfoStorageBox.vue';
import PlayerContainer from './components/PlayerContainer.vue';
import SponsorLogos from '../_misc/components/SponsorLogos.vue';
import Timer from './components/Timer.vue';

export default {
  name: 'Layout',
  components: {
    Capture,
    DonationsBar,
    PlayerContainer,
    Commentators,
    InfoStorageBox,
    GameName,
    GameExtraInfo,
    Timer,
    SponsorLogos,
  },
};
</script>

<style scoped>
  #GameCapture1 {
    left: 512px;
    top: 0px;
    width: 1408px;
    height: 940px;
  }

  #CameraCapture1 {
    left: 0px;
    top: 0px;
    width: 513px;
    height: 333px;
  }

  #DonationsBar {
    left: 512px;
    top: 940px;
    width: 1408px;
    height: 60px;
  }

  .InfoStorageBox {
    left: 0px;
    top: 333px;
    width: 512px;
    height: 667px;
  }

  #GameInfo {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  #TimerBox {
    margin-top: -0.07em;
  }
</style>
