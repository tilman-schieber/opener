import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';
import { registerServiceWorker } from './lib/sw.svelte.ts';

registerServiceWorker();

export default mount(App, { target: document.getElementById('app')! });
