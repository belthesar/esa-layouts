import clone from 'clone';
import SpeedcontrolUtil from 'speedcontrol-util';
import Vue from 'vue';
import VueRouter from 'vue-router';
import CutBackground from '../_misc/cut_bg';
import * as Layouts from './layout-list';

Vue.use(VueRouter);
const layouts = nodecg.Replicant('layouts'); // schema this!
const currentLayout = nodecg.Replicant('currentLayout'); // schema this!
// eslint-disable-next-line import/prefer-default-export
export const serverBus = new Vue();
const sc = new SpeedcontrolUtil(nodecg);
let force = false;

// This controls the player name -> Twitch username animation timings.
let playerShowTwitchTO;
let playerShowTwitch = false;
function rotatePlayerInfo(init) {
  if (!init) {
    playerShowTwitch = !playerShowTwitch;
    serverBus.$emit('playerShowTwitch', playerShowTwitch);
  }
  if (playerShowTwitch) {
    playerShowTwitchTO = setTimeout(rotatePlayerInfo, 15000);
  } else {
    playerShowTwitchTO = setTimeout(rotatePlayerInfo, 45000);
  }
}
sc.runDataActiveRun.on('change', () => {
  clearTimeout(playerShowTwitchTO);
  playerShowTwitch = false;
  rotatePlayerInfo(true);
});

const routes = [
  { name: '4:3 1 Player', path: '/4x3-1p', component: Layouts.L_4x3_1p },
  { name: '4:3 2 Player', path: '/4x3-2p', component: Layouts.L_4x3_2p },
  { name: '4:3 2 Player (co-op)', path: '/4x3-2p-coop', component: Layouts.L_4x3_2p_CoOp },
  { name: '4:3 3 Player', path: '/4x3-3p', component: Layouts.L_4x3_3p },
  { name: '4:3 4 Player', path: '/4x3-4p', component: Layouts.L_4x3_4p },
  { name: '4:3 4 Player (co-op)', path: '/4x3-4p-coop', component: Layouts.L_4x3_4p_CoOp },
  { name: '16:9 1 Player', path: '/16x9-1p', component: Layouts.L_16x9_1p },
  { name: '16:9 2 Player', path: '/16x9-2p', component: Layouts.L_16x9_2p },
  { name: '16:9 2 Player (co-op)', path: '/16x9-2p-coop', component: Layouts.L_16x9_2p_CoOp },
  { name: '16:9 2 Player (bingo)', path: '/16x9-2p-bingo', component: Layouts.L_16x9_2p_Bingo },
  { name: '16:9 3 Player', path: '/16x9-3p', component: Layouts.L_16x9_3p },
  { name: '16:9 4 Player (MonHun)', path: '/16x9-4p-monhun', component: Layouts.L_16x9_4p_MonHun },
  { name: 'GameBoy 1 Player', path: '/GB-1p', component: Layouts.L_GB_1p },
  { name: 'GBA 1 Player', path: '/GBA-1p', component: Layouts.L_GBA_1p },
  { name: '3DS 1 Player', path: '/3DS-1p', component: Layouts.L_3DS_1p },
  { name: 'DS 1 Player', path: '/DS-1p', component: Layouts.L_DS_1p },
  { path: '*', redirect: '/4x3-1p' },
];

const router = new VueRouter({
  routes,
});

// Used to send when the layout is changed and make the correct clip-path.
function layoutChanged(route) {
  const url = new URL(window.location.href);
  force = url.searchParams.get('force');
  if (!force) {
    currentLayout.value = route.path;
  }
  CutBackground();
}

currentLayout.on('change', (newVal) => {
  const url = new URL(window.location.href);
  force = url.searchParams.get('force');
  if (newVal && !force) {
    router.push(newVal);
  }
});

router.afterEach((to, from) => {
  if (from.name) {
    Vue.nextTick().then(() => {
      layoutChanged(to);
    }).catch(() => {});
  }
});

function setUpVueApp() {
  // eslint-disable-next-line no-unused-vars
  const app = new Vue({
    router,
    mounted() {
      // Initial route.
      layoutChanged(this.$route);
    },
  }).$mount('#App');
}

NodeCG.waitForReplicants(layouts).then(() => {
  layouts.value = clone(routes);
  window.onunload = () => {
    layouts.value = {};
  };
  // Check if we're open in OBS, if not we don't want to do OBS stuff.
  if (window.obsstudio) {
    // Will only set up Vue app once OBS is ready.
    nodecg.sendMessage('hideAllCaptures').then(setUpVueApp).catch(() => {});
  } else {
    setUpVueApp();
  }
});
