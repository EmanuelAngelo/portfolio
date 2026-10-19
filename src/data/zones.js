/** Professional content and world coordinates. No DOM or rendering dependencies. */
export const zones = [
  {
    id: 'energy',
    name: 'Estação Energia',
    sub: 'GRUPO EQUATORIAL',
    x: 8,
    y: 2,
    c: '#e5b77b',
    icon: '⚡',
    title: 'Código que move energia.',
    intro: 'Dados, indicadores e automação a serviço de projetos de alta tensão.',
    jobs: [
      {
        period: 'Jun 2025 — presente',
        company: 'Grupo Equatorial',
        role: 'Analista Distribuição Pleno',
        description:
          'Gestão de dados de projetos de alta tensão, monitoramento de indicadores, automação de análises e desenvolvimento de protótipos funcionais.',
        skills: ['Django REST', 'Vue.js', 'Snowflake', 'SQL', 'KNIME', 'PowerApps'],
      },
    ],
  },
  {
    id: 'erp',
    name: 'Terminal de Integrações',
    sub: 'PVT SOFTWARE',
    x: 3,
    y: 2,
    c: '#93c9c0',
    icon: '⌘',
    title: 'Conectar sistemas. Simplificar rotinas.',
    intro: 'Um distrito dedicado a integrações, implantação de ERP e melhoria de processos.',
    jobs: [
      {
        period: 'Out 2023 — set 2025',
        company: 'PVT Software',
        role: 'Analista de Implantação',
        description:
          'Implantação do ERP TOTVS RM, migração de dados, parametrizações e suporte. Automações e middleware em JavaScript para conectar sistemas, com organização das entregas em Kanban.',
        skills: ['TOTVS RM', 'SQL Server', 'PostgreSQL', 'JavaScript', 'Git'],
      },
    ],
  },
  {
    id: 'education',
    name: 'Campus do Conhecimento',
    sub: 'UNDB · CONTROLLER',
    x: 2,
    y: 6,
    c: '#8faabf',
    icon: '⌂',
    title: 'Tecnologia que ensina e transforma.',
    intro: 'Sistemas acadêmicos, dashboards e produtos digitais para educação.',
    jobs: [
      {
        period: 'Nov 2022 — set 2023',
        company: 'UNDB',
        role: 'Analista de Desenvolvimento de Sistemas',
        description:
          'Desenvolvimento de sistemas web acadêmicos e administrativos, melhoria de performance e dashboards para apoiar decisões da diretoria.',
        skills: ['Django', 'Vue.js', 'Power BI', 'Docker', 'SQL'],
      },
      {
        period: 'Out 2021 — ago 2022',
        company: 'Controller Education',
        role: 'Desenvolvedor de Software',
        description:
          'Desenvolvimento backend em GoLang e PostgreSQL e componentes reutilizáveis no frontend. Padrões e automações para agilizar entregas no ambiente EdTech.',
        skills: ['GoLang', 'React', 'TypeScript', 'PostgreSQL'],
      },
      {
        period: 'Dez 2020 — ago 2021',
        company: 'UNDB',
        role: 'Analista de Desenvolvimento de Sistemas',
        description:
          'Sistema web para clínica universitária, integrações com ERP, documentação técnica e relatórios para gestão e operação.',
        skills: ['Python', 'Django', 'Vue.js', 'TOTVS RM'],
      },
    ],
  },
  {
    id: 'health',
    name: 'Distrito da Saúde',
    sub: 'HUUFMA · LOGFARMA',
    x: 8,
    y: 6,
    c: '#b2c9a7',
    icon: '+',
    title: 'A base de tudo: cuidar da operação.',
    intro: 'Infraestrutura, suporte e informação em ambientes de saúde.',
    jobs: [
      {
        period: 'Nov — dez 2020',
        company: 'LOGFARMA',
        role: 'IT Supervisor',
        description:
          'Relatórios e análises SQL para demandas governamentais e suporte operacional de TI, com organização de rotinas e alinhamento entre equipes.',
        skills: ['SQL', 'Gestão', 'Operações de TI'],
      },
      {
        period: 'Jan 2017 — out 2019',
        company: 'Hospital HUUFMA',
        role: 'IT Specialist',
        description:
          'Suporte e manutenção de infraestrutura hospitalar, inventário, redes e atendimento a sistemas, com práticas ITIL e ferramentas de gestão.',
        skills: ['ITIL', 'GLPI', 'AGHU', 'Infraestrutura', 'Redes'],
      },
    ],
  },
  {
    id: 'projects',
    name: 'Laboratório de Projetos',
    sub: 'IDEIAS EM PRODUÇÃO',
    x: 7,
    y: 10,
    c: '#c5a6cb',
    icon: '⌨',
    title: 'Do primeiro commit à solução.',
    intro: 'Explore repositórios e aplicações do meu portfólio.',
    projects: [
      {
        name: 'flow-control-dashboard',
        description: 'Verificação de fluxos dos sistemas PSA.',
        language: 'Vue',
        url: 'https://github.com/EmanuelAngelo/flow-control-dashboard',
      },
      {
        name: 'mamutes_pageweb',
        description: 'Página da Associação Esportiva Mamutes F.A.',
        language: 'Vue',
        url: 'https://github.com/EmanuelAngelo/mamutes_pageweb',
      },
      {
        name: 'ata-gide-es',
        description: 'Controle de atas para os Gideões, setor 812 de São Luís.',
        language: 'Vue',
        url: 'https://github.com/EmanuelAngelo/ata-gide-es',
      },
      {
        name: 'msn-reborn',
        description: 'Uma recriação do MSN para a galera das antigas.',
        language: 'Python',
        url: 'https://github.com/EmanuelAngelo/msn-reborn',
      },
      {
        name: 'estoque_cimento',
        description: 'Sistema de controle de estoque de cimento.',
        language: 'Python',
        url: 'https://github.com/EmanuelAngelo/estoque_cimento',
      },
    ],
  },
  {
    id: 'origin',
    name: 'Base de Origem',
    sub: 'EXÉRCITO BRASILEIRO',
    x: 3,
    y: 10,
    c: '#c1be8f',
    icon: '✦',
    title: 'Disciplina para construir o próximo passo.',
    intro: 'Antes do código, uma experiência de trabalho em equipe e responsabilidade.',
    jobs: [
      {
        period: 'Mar 2011 — mar 2012',
        company: 'Exército Brasileiro',
        role: 'Soldado',
        description:
          'Treinamento e rotinas operacionais que fortaleceram disciplina, liderança, resiliência e atuação sob pressão.',
        skills: ['Liderança', 'Trabalho em equipe', 'Disciplina'],
      },
    ],
  },
];
