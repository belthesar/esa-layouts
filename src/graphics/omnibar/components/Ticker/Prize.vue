<template>
  <div
    v-if="prize"
    id="Prize"
    class="FlexContainer"
  >
    <div class="Line1">
      Prize Available: {{ prize.name }}
    </div>
    <div class="Line2">
      Provided by {{ prize.provided }}, minimum donation amount: ${{ prize.minimum_bid.toFixed(2) }}
      (donate in the next {{ getPrizeTimeUntilString(prize) }})
    </div>
  </div>
</template>

<script>
import clone from 'clone';
import moment from 'moment';

const prizes = nodecg.Replicant('prizes');

export default {
  name: 'Prize',
  props: {
    data: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      prize: undefined,
    };
  },
  created() {
    const fallback = setTimeout(() => this.$emit('end'), 5000);
    if (!prizes.value.length) {
      this.$emit('end');
    } else {
      const randNum = Math.floor(Math.random() * prizes.value.length);
      this.prize = clone(prizes.value[randNum]);
      clearTimeout(fallback);
      setTimeout(() => this.$emit('end'), 25 * 1000);
    }
  },
  methods: {
    getPrizeTimeUntilString(prize) {
      let timeUntil = moment(prize.end_timestamp).fromNow(true);
      timeUntil = timeUntil.replace('an ', ''); // Dirty fix for "Donate in the next an hour".
      timeUntil = timeUntil.replace('a ', ''); // Dirty fix for "Donate in the next a day".
      return timeUntil;
    },
  },
};
</script>

<style scoped>
  @import url('../../../_misc/components/FlexContainer.css');

  #Prize {
    padding: 0 17px;
    height: 100%;
    font-weight: 500;
    flex-direction: column;
    align-items: flex-start;
  }

  .Line1 {
    font-size: 26px;
  }
  .Line2 {
    font-size: 20px;
  }
</style>
