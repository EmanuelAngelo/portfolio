<template>
  <section id="experience" ref="target" class="relative py-32 px-6 overflow-hidden">
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <img :src="bgImageUrl" alt="" class="w-full h-full object-cover opacity-10" />
      <div class="absolute inset-0 bg-obsidian/90" />
    </div>

    <div class="relative max-w-5xl mx-auto">
      <div
        class="mb-20 transition-all duration-700"
        :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
      >
        <span class="font-mono text-xs tracking-widest text-gold/60 uppercase">{{ $t('industrial.experience.label') }}</span>
        <h2 class="mt-4 text-4xl md:text-6xl font-inter font-black tracking-tight">
          {{ $t('industrial.experience.headingA') }} <span class="text-gold">{{ $t('industrial.experience.headingB') }}</span>
        </h2>
      </div>

      <div class="relative">
        <div class="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-border/10 to-transparent" />
        <div class="space-y-8">
          <ExperienceNodeIndustrial
            v-for="(exp, i) in experiences"
            :key="exp.id"
            :experience="exp"
            :index="i"
            :expanded="expandedId === exp.id"
            :inView="inView"
            @toggle="toggle(exp.id)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useInViewOnce } from '../../composables/useInViewOnce';
import ExperienceNodeIndustrial from './ExperienceNodeIndustrial.vue';

const { target, inView } = useInViewOnce({ rootMargin: '-120px' });

const bgImageUrl = '/experience-industrial.svg';

const expandedId = ref(null);
const toggle = (id) => {
  expandedId.value = expandedId.value === id ? null : id;
};

const experiences = [
  {
    id: 1,
    company: 'Grupo Equatorial',
    role: 'Analista Distribuição Pleno',
    period: 'Jun 2025 — Presente',
    location: 'São Luís, MA — Híbrido',
    industry: 'energy',
    color: '#FFB800',
    metrics: ['Vue.js 3 + Django REST', 'KNIME + PowerApps', 'Snowflake'],
    description:
      'Atuação com gestão de dados de projetos de alta tensão, monitoramento de indicadores e automação de análises. Desenvolvimento de protótipos funcionais e melhoria contínua do fluxo de dados.',
    skills: ['Django REST', 'Vue.js', 'Snowflake', 'SQL', 'KNIME', 'PowerApps'],
  },
  {
    id: 2,
    company: 'PVT Software',
    role: 'Analista de Implantação',
    period: 'Out 2023 — Set 2025',
    location: 'Remoto — Vila Velha, ES',
    industry: 'finance',
    color: '#4A9EFF',
    metrics: ['-30% onboarding', '98% SLA', 'ERP TOTVS RM'],
    description:
      'Implantação end-to-end do ERP TOTVS RM: migração de dados, parametrizações, suporte e integrações. Criação de automações e middleware em JavaScript, com organização do trabalho em Kanban.',
    skills: ['TOTVS RM', 'SQL Server', 'PostgreSQL', 'JavaScript', 'Git'],
  },
  {
    id: 3,
    company: 'UNDB',
    role: 'Analista Dev Sistemas',
    period: 'Nov 2022 — Set 2023',
    location: 'São Luís, MA — Presencial',
    industry: 'education',
    color: '#8AFF00',
    metrics: ['-40% tempo de análise', 'Power BI', 'Django + Vue'],
    description:
      'Desenvolvimento de sistemas web acadêmicos e administrativos. Melhoria de performance e criação de dashboards para diretoria, reduzindo tempo de análise e aumentando previsibilidade.',
    skills: ['Django', 'Vue.js', 'Power BI', 'Docker', 'SQL'],
  },
  {
    id: 4,
    company: 'Controller Education',
    role: 'Dev Software',
    period: 'Out 2021 — Ago 2022',
    location: 'Remoto — Joinville, SC',
    industry: 'education',
    color: '#8AFF00',
    metrics: ['-25% entrega', 'GoLang', 'React + TypeScript'],
    description:
      'Ambiente EdTech: desenvolvimento backend com GoLang e PostgreSQL e componentes reutilizáveis no frontend. Entregas mais rápidas com padrões e automações no fluxo de desenvolvimento.',
    skills: ['GoLang', 'TypeScript', 'PostgreSQL', 'Docker', 'Git'],
  },
  {
    id: 5,
    company: 'UNDB',
    role: 'Analista Dev Sistemas',
    period: 'Dez 2020 — Ago 2021',
    location: 'São Luís, MA — Híbrido',
    industry: 'health',
    color: '#FF6B6B',
    metrics: ['Django + Vue', 'TOTVS RM', 'Sistema Clínica'],
    description:
      'Desenvolvimento de sistema web para clínica universitária, com integrações e documentação técnica. Implementação de rotinas e relatórios para apoiar gestão e operação.',
    skills: ['Django', 'Vue.js', 'TOTVS RM', 'SQL', 'Python'],
  },
  {
    id: 6,
    company: 'LOGFARMA',
    role: 'IT Supervisor',
    period: 'Nov 2020 — Dez 2020',
    location: 'São Luís, MA',
    industry: 'health',
    color: '#FF6B6B',
    metrics: ['Relatórios SQL', 'Operações TI', 'Governo'],
    description:
      'Relatórios e análises SQL voltadas a demandas governamentais e suporte operacional de TI. Organização de rotinas e alinhamento entre times para execução rápida.',
    skills: ['SQL', 'Gestão', 'Comunicação'],
  },
  {
    id: 7,
    company: 'Hospital HUUFMA',
    role: 'IT Specialist',
    period: 'Jan 2017 — Out 2019',
    location: 'São Luís, MA',
    industry: 'health',
    color: '#FF6B6B',
    metrics: ['ITIL', 'GLPI', 'AGHU'],
    description:
      'Suporte e manutenção de infraestrutura de TI hospitalar, com processos ITIL e ferramentas de gestão. Atendimento, inventário, redes e suporte a sistemas.',
    skills: ['ITIL', 'Infra', 'Redes', 'GLPI'],
  },
  {
    id: 8,
    company: 'Exército Brasileiro',
    role: 'Soldado',
    period: 'Mar 2011 — Mar 2012',
    location: 'Brasil',
    industry: 'military',
    color: '#888888',
    metrics: ['Liderança', 'Resiliência', 'Disciplina'],
    description:
      'Treinamento e atuação em rotinas operacionais, fortalecendo disciplina, liderança e trabalho sob pressão.',
    skills: ['Leadership', 'Teamwork', 'Resilience'],
  },
];
</script>
