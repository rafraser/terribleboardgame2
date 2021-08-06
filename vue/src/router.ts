import { createRouter, createWebHistory } from 'vue-router';

import CreateRoom from './pages/CreateRoom.vue';
import Index from './pages/Index.vue';
import Room from './pages/Room.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/create-room', component: CreateRoom },
  { path: '/room/:code', component: Room },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
