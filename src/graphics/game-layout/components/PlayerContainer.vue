<!-- This component handles each team's player information. -->
<!-- It listens to the data from nodecg-speedcontrol and creates PlayerInfo component instances. -->

<template>
  <div class="PlayerContainer">
    <player-info
      v-for="(player, index) in players"
      :key="`${index}${Date.now()}`"
      :players="player"
      :player-slot="(teamIndex >= 0 && coop < 0) ? teamIndex : -1"
      :team-index="teamIndex"
    ></player-info>
  </div>
</template>

<script>
import SpeedcontrolUtil from 'speedcontrol-util';
import clone from 'clone';
import PlayerInfo from './PlayerInfo.vue';

const sc = new SpeedcontrolUtil(nodecg);

export default {
  name: 'PlayerContainer',
  components: {
    PlayerInfo,
  },
  props: {
    teamIndex: {
      type: Number,
      default: -1,
    },
    single: {
      type: Boolean,
      default: false,
    },
    coop: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      players: [],
    };
  },
  mounted() {
    sc.runDataActiveRun.on('change', this.updateData);
  },
  destroyed() {
    sc.runDataActiveRun.removeListener('change', this.updateData);
  },
  methods: {
    updateData(data) {
      this.players.length = 0;
      const id = (this.teamIndex >= 0) ? this.teamIndex : 0;
      if (data.teams[id]) {
        const players = clone(data.teams[id].players);
        if (this.single) {
          this.players.push(players);
        } else if (this.coop >= 0) {
          this.players.push([players[this.coop]]);
        } else {
          players.forEach(player => this.players.push([player]));
        }
      }
    },
  },
};
</script>

<style scoped>
  .PlayerContainer {
    width: 100%;
  }

  .PlayerContainer >>> .PlayerInfoBox:nth-of-type(n+2) {
    margin-top: 3px;
  }
</style>
