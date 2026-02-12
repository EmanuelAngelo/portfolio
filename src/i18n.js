import { createI18n } from 'vue-i18n';

// Defina suas traduções aqui
const messages = {
  en: {
    mainHero: {
      greeting: 'Hi, I am',
      description: 'Full Stack Developer with experience in projects for the financial, educational, and healthcare sectors. Skilled in Python, Django, Vue.js, and data analysis, developing scalable solutions integrated with ERP systems. I work with agile methodologies, creating interactive dashboards and optimizing business processes through BI and ETL.',
      hireMe: 'Hire me',
      downloadCV: 'Download resume.'
    }
    // ...add more translations for other components
  },
  pt: {
    mainHero: {
      greeting: 'Oi, Eu sou',
      description: 'Desenvolvedor Full Stack com experiência em projetos para os setores financeiro, educacional e saúde. Atuante em Python, Django, Vue.js e análise de dados, desenvolvendo soluções escaláveis e integradas a sistemas ERP. Atuo com metodologias ágeis, criando dashboards interativos e otimizando processos empresariais por meio de BI e ETL.',
      hireMe: 'Contrate-me',
      downloadCV: 'Download curriculo.'
    }
    // ...adicione mais traduções para outros componentes
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

const locale = getBrowserLocale({ countryCodeOnly: true }) || 'en';

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages,
});

export default i18n;
