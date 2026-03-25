
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import i18n from './i18n';

function installFatalErrorOverlay() {
	const show = (title, details) => {
		try {
			const existing = document.getElementById('fatal-error-overlay');
			if (existing) return;

			const el = document.createElement('div');
			el.id = 'fatal-error-overlay';
			el.style.position = 'fixed';
			el.style.inset = '0';
			el.style.zIndex = '2147483647';
			el.style.background = '#0a0a0b';
			el.style.color = '#e0e0e0';
			el.style.padding = '16px';
			el.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
			el.style.overflow = 'auto';

			const h = document.createElement('div');
			h.style.color = '#ffb800';
			h.style.fontSize = '12px';
			h.style.letterSpacing = '0.12em';
			h.style.textTransform = 'uppercase';
			h.textContent = title;

			const pre = document.createElement('pre');
			pre.style.whiteSpace = 'pre-wrap';
			pre.style.fontSize = '12px';
			pre.style.marginTop = '12px';
			pre.textContent = details;

			const hint = document.createElement('div');
			hint.style.marginTop = '12px';
			hint.style.fontSize = '12px';
			hint.style.color = '#e0e0e066';
			hint.textContent = 'Capture a tela e me envie esta mensagem.';

			el.appendChild(h);
			el.appendChild(pre);
			el.appendChild(hint);
			document.body.appendChild(el);
		} catch {
			// ignore
		}
	};

	window.addEventListener('error', (e) => {
		const msg = e?.error?.stack || e?.message || String(e);
		show('Runtime Error', msg);
	});

	window.addEventListener('unhandledrejection', (e) => {
		const reason = e?.reason;
		const msg = reason?.stack || reason?.message || JSON.stringify(reason) || String(reason);
		show('Unhandled Promise Rejection', msg);
	});
}

installFatalErrorOverlay();

const app = createApp(App);
app.use(i18n);
app.mount('#app');

document.documentElement.lang = String(i18n.global.locale.value || 'en');
