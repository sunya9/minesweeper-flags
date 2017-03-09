import { settings, SCALE_MODES, Application } from 'pixi.js'
import '../css/main.css'
import GameMaster from './lib/GameMaster'

// TODO: resize
// window.addEventListener('resize', () => {
//   const size = Math.min(window.innerHeight, window.innerWidth)
//   app.renderer.resize(size, size)ththii
//   app.render()thithi
// })

class App {
  constructor() {
    this._app = new Application(800, 800, {
      backgroundColor: 0x2c3e50
    })

    settings.SCALE_MODE = SCALE_MODES.NEAREST

    const appView = document.getElementById('app')
    appView.appendChild(this._app.view)
  }

  start() {
    const gameMaster = new GameMaster(this._app)
    gameMaster.start()
  }
}

new App().start()