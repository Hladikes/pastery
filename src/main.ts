import App from './App.svelte'

if (!location.protocol.includes('https') && !location.host.includes(':')) {
  location.replace('https:' + document.URL.substring(5))
}

const app = new App({
  target: document.getElementById('app')
})

export default app
