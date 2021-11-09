import { render, html } from 'uhtml'
import state from 'callbag-state'
import subscribe from 'callbag-subscribe'
import './style.css'

const $state = state(0)
const root = document.querySelector<HTMLDivElement>('#app')!

const App  = () => html`
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>

  ${Counter($state)}
`

function Counter (s: typeof $state) {
  return html`
    <h3>${s.get()}</h3>
    <button onclick=${inc}>+</button>
    <button onclick=${dec}>-</button>
  `

  function inc () {
    let prev = s.get()
    s.set(prev + 1)
  }

  function dec () {
    let prev = s.get()
    s.set(prev - 1)
  }
}

const run = subscribe(function update () {
  render (root, App())
})

run($state)
