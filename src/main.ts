import App from './App.svelte'

if (!window.location.protocol.includes('https') && !window.location.host.includes(':')) {
  window.location.replace(`https:${document.URL.substring(5)}`)
}

const app = new App({
  target: document.getElementById('app'),
})

export default app
