<template>
  <div id="Layout">
    <!-- Game Captures -->
    <capture
      id="GameCapture1"
      class="GameCapture BorderRight BorderBottom"
    ></capture>
    <capture
      id="GameCapture2"
      class="GameCapture BorderLeft BorderBottom"
    ></capture>
    <capture
      id="GameCapture3"
      class="GameCapture BorderLeft"
    ></capture>

    <!-- Camera Captures -->
    <capture
      id="CameraCapture1"
      class="CameraCapture BorderRight"
    ></capture>

    <!-- Players -->
    <info-storage-box
      id="InfoStorageBox1"
      class="PlayerStorageBox"
    >
      <player-container
        :team-index="0"
        single
      ></player-container>
    </info-storage-box>
    <info-storage-box
      id="InfoStorageBox2"
      class="PlayerStorageBox"
    >
      <player-container
        :team-index="1"
        single
      ></player-container>
    </info-storage-box>

    <info-storage-box id="InfoStorageBox4">
      <div
        id="GameInfo"
        class="FlexContainer BorderBottom"
      >
        <game-name></game-name>
        <game-extra-info></game-extra-info>
        <timer></timer>
      </div>
      <sponsor-logos></sponsor-logos>
    </info-storage-box>

    <info-storage-box id="InfoStorageBox5">
      <commentators></commentators>
    </info-storage-box>

    <!-- Donations Bar -->
    <donations-bar></donations-bar>
  </div>
</template>

<script>
import Vue from 'vue';
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
  mounted() {
    // This is dirty but I'm in a hurry and got stuck with the stlye tag ;)
    const pElems = document.getElementsByClassName('PlayerInfoBox');
    Vue.nextTick().then(() => {
      const p1Elem = pElems[0];
      const p2Elem = pElems[1];

      p1Elem.style.backgroundColor = 'rgb(45, 159, 220)';
      p2Elem.style.backgroundColor = 'rgb(0, 192, 22)';
    });
  },
};
</script>

<style scoped>
  .GameCapture {
    width: 765px;
    height: 430px;
  }

  #GameCapture1 {
    left: 0px;
    top: 40px;
  }
  #GameCapture2 {
    left: 1155px;
    top: 40px;
  }
  #GameCapture3 {
    left: 1155px;
    top: 470px;
    height: 470px;
  }

  #CameraCapture1 {
    left: 0px;
    top: 470px;
    width: 765px;
    height: 470px;
  }

  /* Players */
  .PlayerStorageBox {
    width: 765px;
    height: 40px;
  }
  .PlayerContainer >>> .PlayerInfoBox {
    height: 40px;
    font-size: 25px;
  }
  #InfoStorageBox1 {
    left: 0px;
    top: 0px;
  }
  #InfoStorageBox2 {
    left: 1155px;
    top: 0px;
  }

  #InfoStorageBox4 {
    left: 765px;
    top: 0px;
    width: 390px;
    height: 940px;
  }

  #InfoStorageBox5 {
    flex-direction: column-reverse;
    left: 0px;
    top: 470px;
    width: 765px;
    height: 470px;
  }

  #GameInfo {
    width: 100%;
    flex-direction: column;
    flex: 1;
  }
  #GameNameBox, #GameExtraInfoBox {
    white-space: normal;
  }
  #SponsorLogoBox {
    height: 550px;
    flex: unset;
  }

  #DonationsBar {
    left: 0px;
    top: 940px;
    width: 1920px;
    height: 60px;
  }
</style>
