import { createRouter, createWebHistory } from 'vue-router';

import CreateRoom from './pages/CreateRoom.vue';
import MainMenu from './pages/MainMenu.vue';
import JoinRoom from './pages/JoinRoom.vue';

const routes = [
  { path: '/', component: MainMenu },
  { path: '/create', component: CreateRoom },
  { path: '/join', component: JoinRoom },
  { path: '/join/:code', component: JoinRoom },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
