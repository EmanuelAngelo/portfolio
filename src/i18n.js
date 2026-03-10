import { createI18n } from 'vue-i18n';

export const LOCALE_STORAGE_KEY = 'portfolio_locale';

const messages = {
  en: {
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
  pt: {
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
  return undefined;
}

const savedLocale = normalizeLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
const browserLocale = normalizeLocale(getBrowserLocale({ countryCodeOnly: true }));
const locale = savedLocale || browserLocale || 'en';

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  fallbackLocale: 'en',
  messages,
});

export default i18n;

export function persistLocale(newLocale) {
  const normalized = normalizeLocale(newLocale) || 'en';
  localStorage.setItem(LOCALE_STORAGE_KEY, normalized);
  document.documentElement.lang = normalized;
  return normalized;
}
