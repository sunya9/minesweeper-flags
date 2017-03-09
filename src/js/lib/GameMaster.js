import Table from './Table'

class GameMaster {
  constructor(app) {
    this._player1
    this._player2
    this._turn = 0
    this._app = app
  }
  nextTurn() {
    this._turn++
  }
  getCurrentTurn() {
    return ([this._player1, this._player2])[this._turn % 2]
  }
  getApp() {
    return this._app
  }

  start() {
    const table = new Table(this._app)
    table.createStage()
  }
}

export default GameMaster