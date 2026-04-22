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
      showcase: {
        label: '05 / Case Studies',
        headingA: 'Delivered',
        headingB: 'Projects',
        headingC: 'A sales-oriented showcase of solutions I can build: business websites, dashboards and internal systems with clear outcomes and client feedback.',
        prev: 'Previous slide',
        next: 'Next slide',
        goTo: 'Go to slide',
        problem: 'Problem',
        solution: 'Solution',
        result: 'Result',
        clientFeedback: 'Client feedback',
        cta: 'I WANT SOMETHING LIKE THIS',
        ctaHint: 'Opens WhatsApp with a prefilled message.',
        prefilledMessage: 'Hello Emanuel! I saw the case study for {project} on your portfolio and I want to build something similar for my business.',
        items: {
          operations: {
            badge: 'OPERATIONS PLATFORM',
            title: 'Operational Control Platform',
            category: 'Internal web system for field teams and managers',
            summary: 'A custom platform that centralizes operational requests, SLA tracking and approval flow, giving leadership real-time visibility.',
            problem: 'Teams were managing requests through spreadsheets and scattered messages, with low traceability.',
            solution: 'I designed a responsive system with role-based access, status workflow, dashboard and automated notifications.',
            result: 'Faster follow-up, fewer manual bottlenecks and a more professional operation for the client.',
            review: 'The system gave us exactly the visibility we were missing. It became much easier to track delivery, approvals and delays.',
            author: 'Operations Manager',
            role: 'Energy segment client',
            metrics: ['Workflow automation', 'Manager dashboard', 'Approval history'],
            slides: {
              0: { alt: 'Operational control platform dashboard', caption: 'Executive dashboard with queue, SLA and workflow visibility.' },
                1: { alt: 'Operational control platform detail screen', caption: 'Detailed management view for requests, filters and execution history.' },
                2: { alt: 'Materials list view', caption: 'Materials catalog and stock overview.' },
            },
          },
          sales: {
            badge: 'COMMERCIAL WEBSITE',
            title: 'Lead Generation Website',
            category: 'High-conversion landing pages and commercial presentation',
            summary: 'A commercial website focused on positioning, lead capture and clear service presentation to help the client sell more with credibility.',
            problem: 'The business had no structured digital presence and lost opportunities because the offer was unclear online.',
            solution: 'I built a high-conversion website with sections for authority, benefits, FAQ, CTA and responsive contact flow.',
            result: 'A stronger online presence and a much better first impression for new inbound leads.',
            review: 'The new website finally communicates the value of our service. We started receiving far more qualified contacts.',
            author: 'Commercial Director',
            role: 'B2B services client',
            metrics: ['Responsive UX', 'Clear offer positioning', 'CTA for leads'],
            slides: {
              0: { alt: 'Lead generation website homepage', caption: 'Homepage focused on authority, offer clarity and conversion.' },
              1: { alt: 'Lead generation website sections', caption: 'Conversion blocks with testimonials, benefits and strong calls to action.' },
            },
          },
          service: {
            badge: 'SERVICE PORTAL',
            title: 'Customer Service Portal',
            category: 'Support, scheduling and self-service experience',
            summary: 'A customer-facing portal created to reduce friction in support and provide a more organized service experience from request to follow-up.',
            problem: 'Clients depended on informal communication and had no easy way to track service progress.',
            solution: 'I structured a portal with request opening, status monitoring, service history and simplified support touchpoints.',
            result: 'More trust, more transparency and a service operation that scales better with demand.',
            review: 'Our customers started to feel more secure because they can see what is happening and what the next step is.',
            author: 'Founder',
            role: 'Healthcare services client',
            metrics: ['Client self-service', 'Status tracking', 'Service transparency'],
            slides: {
              0: { alt: 'Customer service portal overview', caption: 'Overview page with requests, categories and support highlights.' },
              1: { alt: 'Customer service portal detail screen', caption: 'Tracking area for status, timeline and customer communication.' },
            },
          },
        },
      },
      projects: {
        label: '06 / Repositories',
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
        label: '07 / Contact',
        headingA: "Let's",
        headingB: 'Optimize',
        headingC: 'your next project on WhatsApp.',
        name: '$ name',
        email: '$ email',
        message: '$ message',
        namePh: 'Your name...',
        emailPh: 'your.email.com',
        messagePh: 'Tell me about your project...',
        send: 'SEND TO WHATSAPP',
        sent: 'OPENED',
        connect: '// CONNECT',
        location: 'Location',
        status: 'Status',
        open: 'Open to Remote (Global)',
        waIntro: 'Hello Emanuel! I came from your portfolio and want to talk about a project.',
        mailName: 'Name',
        mailEmail: 'Email',
        messageLabel: 'Message',
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
      showcase: {
        label: '05 / Casos',
        headingA: 'Proyectos',
        headingB: 'Entregados',
        headingC: 'Una vitrina comercial de soluciones que puedo construir: sitios, dashboards y sistemas internos con resultados claros y feedback del cliente.',
        prev: 'Slide anterior',
        next: 'Siguiente slide',
        goTo: 'Ir al slide',
        problem: 'Problema',
        solution: 'Solución',
        result: 'Resultado',
        clientFeedback: 'Comentario del cliente',
        cta: 'QUIERO ALGO ASÍ',
        ctaHint: 'Abre WhatsApp con un mensaje listo.',
        prefilledMessage: 'Hola Emanuel, vi el caso {project} en tu portafolio y quiero crear algo parecido para mi negocio.',
        items: {
          operations: {
            badge: 'PLATAFORMA OPERATIVA',
            title: 'Plataforma de Control Operativo',
            category: 'Sistema web interno para equipos de campo y gestores',
            summary: 'Una plataforma a medida para centralizar solicitudes operativas, SLA y flujo de aprobación con visibilidad en tiempo real.',
            problem: 'Los equipos administraban solicitudes en planillas y mensajes dispersos, con poca trazabilidad.',
            solution: 'Diseñé un sistema responsivo con perfiles de acceso, workflow por estados, dashboard y notificaciones automáticas.',
            result: 'Seguimiento más rápido, menos cuellos de botella manuales y una operación más profesional.',
            review: 'El sistema nos dio exactamente la visibilidad que necesitábamos. Ahora es mucho más fácil acompañar entregas, aprobaciones y retrasos.',
            author: 'Gerente de Operaciones',
            role: 'Cliente del sector energía',
            metrics: ['Automatización de flujo', 'Dashboard gerencial', 'Historial de aprobación'],
            slides: {
              0: { alt: 'Dashboard de control operativo', caption: 'Dashboard ejecutivo con cola, SLA y visibilidad del workflow.' },
              1: { alt: 'Pantalla detallada del control operativo', caption: 'Vista detallada de solicitudes, filtros e historial de ejecución.' },
              2: { alt: 'Vista de lista de materiales', caption: 'Catálogo de materiales y visión general de estoques.' },
            },
          },
          sales: {
            badge: 'SITIO COMERCIAL',
            title: 'Sitio Web para Generar Leads',
            category: 'Landing pages de conversión y presentación comercial',
            summary: 'Un sitio comercial orientado a posicionamiento, captación de leads y presentación clara del servicio para vender con más credibilidad.',
            problem: 'La empresa no tenía presencia digital estructurada y perdía oportunidades porque la oferta no se entendía online.',
            solution: 'Construí un sitio de alta conversión con autoridad, beneficios, FAQ, CTA y flujo de contacto responsivo.',
            result: 'Más presencia online y una primera impresión mucho mejor para nuevos leads.',
            review: 'El nuevo sitio por fin comunica el valor de nuestro servicio. Empezamos a recibir contactos mucho más calificados.',
            author: 'Director Comercial',
            role: 'Cliente B2B de servicios',
            metrics: ['UX responsiva', 'Posicionamiento claro', 'CTA para leads'],
            slides: {
              0: { alt: 'Homepage del sitio comercial', caption: 'Homepage enfocada en autoridad, claridad de oferta y conversión.' },
              1: { alt: 'Secciones del sitio comercial', caption: 'Bloques de conversión con testimonios, beneficios y CTA fuertes.' },
            },
          },
          service: {
            badge: 'PORTAL DE ATENCIÓN',
            title: 'Portal de Atención al Cliente',
            category: 'Soporte, agenda y experiencia de autoservicio',
            summary: 'Un portal de atención creado para reducir fricción y ofrecer una experiencia más organizada desde la solicitud hasta el seguimiento.',
            problem: 'Los clientes dependían de comunicación informal y no tenían una forma simple de seguir el servicio.',
            solution: 'Estructuré un portal con apertura de solicitudes, seguimiento de estado, historial y puntos de soporte simplificados.',
            result: 'Más confianza, más transparencia y una operación de atención que escala mejor.',
            review: 'Nuestros clientes empezaron a sentirse más seguros porque pueden ver qué está pasando y cuál es el siguiente paso.',
            author: 'Fundador',
            role: 'Cliente del sector salud',
            metrics: ['Autoservicio del cliente', 'Seguimiento de estado', 'Transparencia'],
            slides: {
              0: { alt: 'Visión general del portal de atención', caption: 'Página general con solicitudes, categorías y destaques de soporte.' },
              1: { alt: 'Pantalla detallada del portal de atención', caption: 'Área de seguimiento con estado, timeline y comunicación con el cliente.' },
            },
          },
        },
      },
      projects: {
        label: '06 / Repositorios',
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
        label: '07 / Contacto',
        headingA: 'Vamos a',
        headingB: 'Optimizar',
        headingC: 'tu próximo proyecto por WhatsApp.',
        name: '$ nombre',
        email: '$ email',
        message: '$ mensaje',
        namePh: 'Tu nombre...',
        emailPh: 'tu.email.com',
        messagePh: 'Cuéntame sobre tu proyecto...',
        send: 'ENVIAR POR WHATSAPP',
        sent: 'ABIERTO',
        connect: '// CONECTAR',
        location: 'Ubicación',
        status: 'Estado',
        open: 'Open to Remote (Global)',
        waIntro: 'Hola Emanuel, llegué desde tu portafolio y quiero hablar sobre un proyecto.',
        mailName: 'Nombre',
        mailEmail: 'Email',
        messageLabel: 'Mensaje',
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
      showcase: {
        label: '05 / Cases',
        headingA: 'Projetos',
        headingB: 'Entregues',
        headingC: 'Uma vitrine comercial de soluções que eu posso construir: sites, dashboards e sistemas internos com resultado claro e comentário de cliente.',
        prev: 'Slide anterior',
        next: 'Próximo slide',
        goTo: 'Ir para o slide',
        problem: 'Problema',
        solution: 'Solução',
        result: 'Resultado',
        clientFeedback: 'Comentário do cliente',
        cta: 'QUERO ALGO ASSIM',
        ctaHint: 'Abre o WhatsApp com mensagem pronta.',
        prefilledMessage: 'Olá Emanuel! Vi o case {project} no seu portfólio e quero criar algo parecido para o meu negócio.',
        items: {
          operations: {
            badge: 'Sistema de Gestão em Material de Construção',
            title: 'Plataforma de Controle Operacional',
            category: 'Sistema web interno para times de campo e gestão',
            summary: 'Uma plataforma sob medida para centralizar solicitações operacionais, SLA e fluxo de aprovação com visibilidade em tempo real.',
            problem: 'Os times controlavam solicitações em planilhas e mensagens soltas, com pouca rastreabilidade.',
            solution: 'Desenhei um sistema responsivo com perfis de acesso, workflow por status, dashboard gerencial e notificações automáticas.',
            result: 'Acompanhamento mais rápido, menos gargalo manual e uma operação mais profissional para o cliente.',
            review: 'O sistema nos deu exatamente a visibilidade que faltava. Ficou muito mais fácil acompanhar entregas, aprovações e atrasos.',
            author: 'Gerente de Operações',
            role: 'Cliente do segmento de energia',
            metrics: ['Automação de fluxo', 'Dashboard gerencial', 'Histórico de aprovação'],
            slides: {
              0: { alt: 'Dashboard da plataforma operacional', caption: 'Dashboard executivo com fila, SLA e visibilidade do workflow.' },
                1: { alt: 'Tela detalhada da plataforma operacional', caption: 'Gestão detalhada de solicitações, filtros e histórico de execução.' },
                2: { alt: 'Visão de lista de materiais', caption: 'Catálogo de materiais e visão geral de estoque.' },
            },
          },
          sales: {
            badge: 'SITE COMERCIAL',
            title: 'Site para Geração de Leads',
            category: 'Landing pages de conversão e apresentação comercial',
            summary: 'Um site comercial focado em posicionamento, captação de leads e apresentação clara do serviço para vender mais com credibilidade.',
            problem: 'A empresa não tinha presença digital estruturada e perdia oportunidades porque a oferta não ficava clara online.',
            solution: 'Construí um site de alta conversão com autoridade, benefícios, FAQ, CTA e fluxo de contato responsivo.',
            result: 'Mais presença online e uma primeira impressão muito melhor para novos leads.',
            review: 'O novo site finalmente comunica o valor do nosso serviço. Começamos a receber contatos bem mais qualificados.',
            author: 'Diretor Comercial',
            role: 'Cliente B2B de serviços',
            metrics: ['UX responsiva', 'Oferta clara', 'CTA para leads'],
            slides: {
              0: { alt: 'Homepage do site comercial', caption: 'Homepage focada em autoridade, clareza da oferta e conversão.' },
              1: { alt: 'Seções do site comercial', caption: 'Blocos de conversão com depoimentos, benefícios e CTAs fortes.' },
            },
          },
          service: {
            badge: 'PORTAL DE ATENDIMENTO',
            title: 'Portal de Atendimento ao Cliente',
            category: 'Suporte, agendamento e experiência de autoatendimento',
            summary: 'Um portal voltado ao cliente para reduzir atrito no atendimento e organizar melhor a jornada da solicitação ao acompanhamento.',
            problem: 'Os clientes dependiam de comunicação informal e não tinham uma forma simples de acompanhar o serviço.',
            solution: 'Estruturei um portal com abertura de chamados, acompanhamento de status, histórico e pontos de suporte simplificados.',
            result: 'Mais confiança, mais transparência e uma operação de atendimento que escala melhor com a demanda.',
            review: 'Nossos clientes passaram a se sentir mais seguros porque conseguem ver o que está acontecendo e qual é o próximo passo.',
            author: 'Fundador',
            role: 'Cliente do setor de saúde',
            metrics: ['Autoatendimento', 'Acompanhamento de status', 'Transparência no serviço'],
            slides: {
              0: { alt: 'Visão geral do portal de atendimento', caption: 'Tela principal com solicitações, categorias e destaques de suporte.' },
              1: { alt: 'Tela detalhada do portal de atendimento', caption: 'Área de acompanhamento com status, timeline e comunicação com o cliente.' },
            },
          },
        },
      },
      projects: {
        label: '06 / Repositórios',
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
        label: '07 / Contato',
        headingA: 'Vamos',
        headingB: 'Otimizar',
        headingC: 'seu próximo projeto no WhatsApp.',
        name: '$ nome',
        email: '$ email',
        message: '$ mensagem',
        namePh: 'Seu nome...',
        emailPh: 'seu.email.com',
        messagePh: 'Me conte sobre seu projeto...',
        send: 'ENVIAR NO WHATSAPP',
        sent: 'ABERTO',
        connect: '// CONECTAR',
        location: 'Local',
        status: 'Status',
        open: 'Open to Remote (Global)',
        waIntro: 'Olá Emanuel! Vim pelo seu portfólio e quero conversar sobre um projeto.',
        mailName: 'Nome',
        mailEmail: 'Email',
        messageLabel: 'Mensagem',
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
