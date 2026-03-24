import { createI18n } from 'vue-i18n';

export const LOCALE_STORAGE_KEY = 'portfolio_locale';

const messages = {
  en: {
    industrial: {
      hero: {
        status: 'LOCATION: BRAZIL | STATUS: OPEN TO GLOBAL | STACK: PYTHON_VUE_SQL',
        title: 'Full Stack Python Developer (Django/Vue.js) | SQL & BI Analyst',
        scroll: 'SCROLL',
      },
      about: {
        label: '01 / About',
        headingA: 'The Logic',
        headingB: 'Bridge',
        p1a: 'Full Stack Developer with over',
        p1b: '3 years of experience',
        p1c: 'building scalable apps for Finance, Education, Health and Energy.',
        p2: 'I bridge backend logic and intuitive UI, focused on Python (Django) and Vue.js.',
        p3: 'Experience optimizing processes, ERP integrations (TOTVS RM) and SQL/BI analysis for faster decisions.',
        competencies: {
          backendTitle: 'Backend & Data',
          backendDesc: 'Robust APIs with Django/DRF; SQL analysis and ETL pipelines for actionable insights.',
          frontendTitle: 'Frontend',
          frontendDesc: 'Responsive interfaces and dashboards with Vue.js, with focus on UX and performance.',
          processTitle: 'Processes & BI',
          processDesc: 'Workflow optimization, KPIs and reporting to speed decisions and reduce rework.',
          globalTitle: 'Global Collaboration',
          globalDesc: 'Native Portuguese and English B2/C1. Ready for international and remote teams.',
        },
      },
      experience: {
        label: '02 / Experience',
        headingA: 'Tactical',
        headingB: 'Timeline',
      },
      skills: {
        label: '03 / Skills',
        headingA: 'The',
        headingB: 'Engine',
        categories: {
          backend: 'Backend',
          frontend: 'Frontend',
          data: 'Data & BI',
          devops: 'DevOps & Tools',
        },
      },
      impact: {
        label: '04 / Impact',
        headingA: 'Metrics of',
        headingB: 'Success',
        sectors: 'Industries',
        cards: {
          onboarding: { metric: '-30%', label: 'Onboarding', desc: 'Reduced onboarding time through implementation flow and automations.', company: 'PVT Software' },
          analysis: { metric: '-40%', label: 'Analysis', desc: 'Less analysis time with dashboards and data pipeline improvements.', company: 'UNDB' },
          sla: { metric: '98%', label: 'SLA', desc: 'High SLA compliance and continuous support in critical environments.', company: 'PVT Software' },
          delivery: { metric: '-25%', label: 'Delivery', desc: 'Faster module delivery through standards and process evolution.', company: 'Controller Education' },
        },
      },
      projects: {
        label: '05 / Projects',
        headingA: 'Latest',
        headingB: 'Repos',
        headingC: 'Pinned on GitHub.',
        loading: 'LOADING_REPOS...',
        error: 'ERROR_FETCHING_REPOS',
        empty: 'NO_PUBLIC_REPOS_FOUND',
        updated: 'Updated',
        viewRepo: 'VIEW',
        noDescription: 'No description provided.',
      },
      contact: {
        label: '06 / Contact',
        headingA: "Let's",
        headingB: 'Optimize',
        headingC: 'your next system.',
        name: '$ name',
        email: '$ email',
        message: '$ message',
        namePh: 'Your name...',
        emailPh: 'your.email.com',
        messagePh: 'Tell me about your project...',
        send: 'SEND',
        sent: 'SENT',
        connect: '// CONNECT',
        location: 'Location',
        status: 'Status',
        open: 'Open to Remote (Global)',
        mailSubject: 'Portfolio contact — {name}',
        mailName: 'Name',
        mailEmail: 'Email',
      },
      footer: {
        operational: 'ALL SYSTEMS OPERATIONAL.',
      },
      language: {
        label: 'Language',
        pt: 'Português (BR)',
        en: 'English',
        es: 'Español',
      },
    },
    mainHero: {
      greeting: 'Hi, I am',
      description: 'Full Stack Developer with experience in projects for the financial, educational, and healthcare sectors. Skilled in Python, Django, Vue.js, and data analysis, developing scalable solutions integrated with ERP systems. I work with agile methodologies, creating interactive dashboards and optimizing business processes through BI and ETL.',
      hireMe: 'Hire me',
      downloadCV: 'Download resume.'
    },
    nav: {
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact'
    },
    services: {
      title: 'My Services'
    },
    projects: {
      title: 'My Git Projects',
      livePreview: 'Live Preview',
      codeSource: 'Code Source',
      noDescription: 'No description available'
    },
    contact: {
      title: 'Contact Me',
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'Message',
      sendMessage: 'Send message',
      location: 'Location',
      callMe: 'Call me',
      emailMe: 'Email me',
      whatsapp: 'WhatsApp'
    },
    education: {
      title: 'Education'
    },
    experience: {
      title: 'Experience'
    },
    footer: {
      rights: 'All rights reserved'
    }
  },
  es: {
    industrial: {
      hero: {
        status: 'LOCATION: BRAZIL | STATUS: OPEN TO GLOBAL | STACK: PYTHON_VUE_SQL',
        title: 'Full Stack Python Developer (Django/Vue.js) | SQL & BI Analyst',
        scroll: 'SCROLL',
      },
      about: {
        label: '01 / About',
        headingA: 'El Puente',
        headingB: 'Lógico',
        p1a: 'Desarrollador Full Stack con más de',
        p1b: '3 años de experiencia',
        p1c: 'creando apps escalables para Finanzas, Educación, Salud y Energía.',
        p2: 'Conecto la lógica del backend con interfaces intuitivas, con foco en Python (Django) y Vue.js.',
        p3: 'Experiencia optimizando procesos, integraciones ERP (TOTVS RM) y análisis SQL/BI para decisiones más rápidas.',
        competencies: {
          backendTitle: 'Backend & Datos',
          backendDesc: 'APIs robustas con Django/DRF; análisis SQL y pipelines ETL para insights accionables.',
          frontendTitle: 'Frontend',
          frontendDesc: 'Interfaces responsivas y dashboards con Vue.js, con foco en UX y rendimiento.',
          processTitle: 'Procesos & BI',
          processDesc: 'Optimización de flujos, KPIs y reportes para acelerar decisiones y reducir retrabajo.',
          globalTitle: 'Colaboración Global',
          globalDesc: 'Portugués nativo e inglés B2/C1. Listo para equipos internacionales y remoto.',
        },
      },
      experience: {
        label: '02 / Experience',
        headingA: 'Línea',
        headingB: 'Táctica',
      },
      skills: {
        label: '03 / Skills',
        headingA: 'El',
        headingB: 'Motor',
        categories: {
          backend: 'Backend',
          frontend: 'Frontend',
          data: 'Datos & BI',
          devops: 'DevOps & Herramientas',
        },
      },
      impact: {
        label: '04 / Impact',
        headingA: 'Métricas de',
        headingB: 'Éxito',
        sectors: 'Sectores',
        cards: {
          onboarding: { metric: '-30%', label: 'Onboarding', desc: 'Reducción del tiempo de onboarding con flujo de implementación y automatizaciones.', company: 'PVT Software' },
          analysis: { metric: '-40%', label: 'Análisis', desc: 'Menos tiempo de análisis con dashboards y mejoras en el pipeline de datos.', company: 'UNDB' },
          sla: { metric: '98%', label: 'SLA', desc: 'Alta conformidad de SLA y soporte continuo en entornos críticos.', company: 'PVT Software' },
          delivery: { metric: '-25%', label: 'Entrega', desc: 'Entrega más rápida con estándares y evolución del proceso.', company: 'Controller Education' },
        },
      },
      projects: {
        label: '05 / Projects',
        headingA: 'Últimos',
        headingB: 'Repos',
        headingC: 'Pinados no GitHub.',
        loading: 'CARGANDO_REPOS...',
        error: 'ERROR_AL_BUSCAR_REPOS',
        empty: 'NO_SE_ENCONTRARON_REPOS_PUBLICOS',
        updated: 'Actualizado',
        viewRepo: 'VER',
        noDescription: 'Sin descripción.',
      },
      contact: {
        label: '06 / Contact',
        headingA: 'Vamos a',
        headingB: 'Optimizar',
        headingC: 'tu próximo sistema.',
        name: '$ nombre',
        email: '$ email',
        message: '$ mensaje',
        namePh: 'Tu nombre...',
        emailPh: 'tu.email.com',
        messagePh: 'Cuéntame sobre tu proyecto...',
        send: 'ENVIAR',
        sent: 'ENVIADO',
        connect: '// CONECTAR',
        location: 'Ubicación',
        status: 'Estado',
        open: 'Open to Remote (Global)',
        mailSubject: 'Contacto por Portafolio — {name}',
        mailName: 'Nombre',
        mailEmail: 'Email',
      },
      footer: {
        operational: 'ALL SYSTEMS OPERATIONAL.',
      },
      language: {
        label: 'Idioma',
        pt: 'Português (BR)',
        en: 'English',
        es: 'Español',
      },
    },
    mainHero: {
      greeting: 'Hola, soy',
      description: 'Desarrollador Full Stack con experiencia en proyectos para los sectores financiero, educativo y de salud. Trabajo con Python, Django, Vue.js y análisis de datos, creando soluciones escalables e integradas con sistemas ERP. Utilizo metodologías ágiles, desarrollo dashboards interactivos y optimizo procesos empresariales con BI y ETL.',
      hireMe: 'Contrátame',
      downloadCV: 'Descargar CV.'
    },
    nav: {
      services: 'Servicios',
      projects: 'Proyectos',
      contact: 'Contacto'
    },
    services: {
      title: 'Mis Servicios'
    },
    projects: {
      title: 'Mis Proyectos Git',
      livePreview: 'Ver',
      codeSource: 'Código fuente',
      noDescription: 'No hay descripción disponible'
    },
    contact: {
      title: 'Contáctame',
      namePlaceholder: 'Nombre',
      emailPlaceholder: 'Correo',
      messagePlaceholder: 'Mensaje',
      sendMessage: 'Enviar mensaje',
      location: 'Ubicación',
      callMe: 'Llámame',
      emailMe: 'Envíame un correo',
      whatsapp: 'WhatsApp'
    },
    education: {
      title: 'Educación'
    },
    experience: {
      title: 'Experiencia'
    },
    footer: {
      rights: 'Todos los derechos reservados'
    }
  },
  pt: {
    industrial: {
      hero: {
        status: 'LOCATION: BRAZIL | STATUS: OPEN TO GLOBAL | STACK: PYTHON_VUE_SQL',
        title: 'Full Stack Python Developer (Django/Vue.js) | SQL & BI Analyst',
        scroll: 'SCROLL',
      },
      about: {
        label: '01 / About',
        headingA: 'A Ponte da',
        headingB: 'Lógica',
        p1a: 'Desenvolvedor Full Stack com mais de',
        p1b: '3 anos de experiência',
        p1c: 'criando aplicações escaláveis para Finanças, Educação, Saúde e Energia.',
        p2: 'Faço a ponte entre a lógica do backend e interfaces intuitivas, com foco em Python (Django) e Vue.js.',
        p3: 'Experiência com otimização de processos, integrações ERP (TOTVS RM) e análise SQL/BI para decisões mais rápidas.',
        competencies: {
          backendTitle: 'Backend & Dados',
          backendDesc: 'APIs robustas com Django/DRF; análises SQL e pipelines ETL para insights acionáveis.',
          frontendTitle: 'Frontend',
          frontendDesc: 'Interfaces responsivas e dashboards com Vue.js, com atenção a UX e performance.',
          processTitle: 'Processos & BI',
          processDesc: 'Otimização de fluxo, indicadores e relatórios para acelerar decisões e reduzir retrabalho.',
          globalTitle: 'Colaboração Global',
          globalDesc: 'Português nativo e inglês B2/C1. Pronto para times internacionais e remoto global.',
        },
      },
      experience: {
        label: '02 / Experience',
        headingA: 'Linha do Tempo',
        headingB: 'Tática',
      },
      skills: {
        label: '03 / Skills',
        headingA: 'O',
        headingB: 'Motor',
        categories: {
          backend: 'Backend',
          frontend: 'Frontend',
          data: 'Dados & BI',
          devops: 'DevOps & Ferramentas',
        },
      },
      impact: {
        label: '04 / Impact',
        headingA: 'Métricas de',
        headingB: 'Impacto',
        sectors: 'Setores de Atuação',
        cards: {
          onboarding: { metric: '-30%', label: 'Onboarding', desc: 'Redução do tempo de onboarding com fluxo de implantação e automações.', company: 'PVT Software' },
          analysis: { metric: '-40%', label: 'Análise', desc: 'Menos tempo de análise com dashboards e melhorias no pipeline de dados.', company: 'UNDB' },
          sla: { metric: '98%', label: 'SLA', desc: 'Alta conformidade com SLA e suporte contínuo em ambientes críticos.', company: 'PVT Software' },
          delivery: { metric: '-25%', label: 'Entrega', desc: 'Entrega mais rápida de módulos com padrões e evolução do processo.', company: 'Controller Education' },
        },
      },
      projects: {
        label: '05 / Projects',
        headingA: 'Últimos',
        headingB: 'Repos',
        headingC: 'Pinados no GitHub.',
        loading: 'CARREGANDO_REPOS...',
        error: 'ERRO_AO_BUSCAR_REPOS',
        empty: 'NENHUM_REPO_PUBLICO_ENCONTRADO',
        updated: 'Atualizado',
        viewRepo: 'VER',
        noDescription: 'Sem descrição.',
      },
      contact: {
        label: '06 / Contact',
        headingA: 'Vamos',
        headingB: 'Otimizar',
        headingC: 'seu próximo sistema.',
        name: '$ nome',
        email: '$ email',
        message: '$ mensagem',
        namePh: 'Seu nome...',
        emailPh: 'seu.email.com',
        messagePh: 'Me conte sobre seu projeto...',
        send: 'ENVIAR',
        sent: 'ENVIADO',
        connect: '// CONECTAR',
        location: 'Local',
        status: 'Status',
        open: 'Open to Remote (Global)',
        mailSubject: 'Contato pelo Portfólio — {name}',
        mailName: 'Nome',
        mailEmail: 'Email',
      },
      footer: {
        operational: 'ALL SYSTEMS OPERATIONAL.',
      },
      language: {
        label: 'Idioma',
        pt: 'Português (BR)',
        en: 'English',
        es: 'Español',
      },
    },
    mainHero: {
      greeting: 'Oi, Eu sou',
      description: 'Desenvolvedor Full Stack com experiência em projetos para os setores financeiro, educacional e saúde. Atuante em Python, Django, Vue.js e análise de dados, desenvolvendo soluções escaláveis e integradas a sistemas ERP. Atuo com metodologias ágeis, criando dashboards interativos e otimizando processos empresariais por meio de BI e ETL.',
      hireMe: 'Contrate-me',
      downloadCV: 'Download curriculo.'
    },
    nav: {
      services: 'Serviços',
      projects: 'Projetos',
      contact: 'Contato'
    },
    services: {
      title: 'Meus Serviços'
    },
    projects: {
      title: 'Meus Projetos Git',
      livePreview: 'Visualizar',
      codeSource: 'Código-fonte',
      noDescription: 'Projeto sem descrição disponível'
    },
    contact: {
      title: 'Contate-me',
      namePlaceholder: 'Nome',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'Mensagem',
      sendMessage: 'Enviar mensagem',
      location: 'Localização',
      callMe: 'Fale comigo',
      emailMe: 'Converse comigo',
      whatsapp: 'WhatsApp'
    },
    education: {
      title: 'Formação'
    },
    experience: {
      title: 'Experiência'
    },
    footer: {
      rights: 'Todos direitos reservados'
    }
  }
};

// Detecta o idioma do navegador
function getBrowserLocale(options = {}) {
  const defaultOptions = { countryCodeOnly: false };
  const opt = { ...defaultOptions, ...options };
  const navigatorLocale =
    navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language;
  if (!navigatorLocale) {
    return undefined;
  }
  return opt.countryCodeOnly
    ? navigatorLocale.trim().split(/-|_/)[0]
    : navigatorLocale.trim();
}

function normalizeLocale(value) {
  const raw = String(value || '').toLowerCase();
  if (raw.startsWith('pt')) return 'pt';
  if (raw.startsWith('en')) return 'en';
  if (raw.startsWith('es')) return 'es';
  return undefined;
}

const savedLocale = normalizeLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
const browserLocale = normalizeLocale(getBrowserLocale({ countryCodeOnly: true }));
const locale = savedLocale || browserLocale || 'pt';

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  fallbackLocale: 'pt',
  messages,
});

export default i18n;

export function persistLocale(newLocale) {
  const normalized = normalizeLocale(newLocale) || 'pt';
  localStorage.setItem(LOCALE_STORAGE_KEY, normalized);
  document.documentElement.lang = normalized;
  return normalized;
}
