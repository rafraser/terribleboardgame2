import { createRouter, createWebHistory } from 'vue-router';

import Index from './pages/Index.vue';
import Lobby from './pages/Lobby.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/join', component: Lobby },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
