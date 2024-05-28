import Vue from 'vue';
import Router from 'vue-router';
import Sobre from '@/components/Sobre.vue';
import MinhasSkills from '@/components/MinhasSkills.vue';
import MeusProjetos from '@/components/MeusProjetos.vue';
import ContateMe from '@/components/ContateMe.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/sobre', component: Sobre },
    { path: '/skills', component: MinhasSkills },
    { path: '/projetos', component: MeusProjetos },
    { path: '/contate', component: ContateMe },
  ],
});
