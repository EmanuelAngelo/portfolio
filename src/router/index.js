import { createRouter, createWebHistory } from 'vue-router';
import ConteudoPrincipal from '../components/ConteudoPrincipal.vue';
import MeusProjetos from '../components/MeusProjetos.vue';
import MinhasSkill from '../components/MinhasSkill.vue';
import SobreMim from '../components/SobreMim.vue';
import Contato from '../components/Contato.vue';
import Blog from '../components/Blog.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: SobreMim,
  },
  {
    path: '/projetos',
    name: 'projetos',
    component: MeusProjetos,
  },
  {
    path: '/skills',
    name: 'skills',
    component: MinhasSkill,
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog,
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: SobreMim,
  },
  {
    path: '/contato',
    name: 'contato',
    component: Contato,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
