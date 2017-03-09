import Tile from './Tile'
import _ from 'lodash'

const dx = [-1, 0, 1, 1, 1, 0, -1, -1]
const dy = [-1, -1, -1, 0, 1, 1, 1, 0]
const rdx = [0, 1, 0, -1]
const rdy = [-1, 0, 1, 0]

class Table {
  constructor(app, options = {
    width: 20,
    height: 20,
    mines: 51
  }) {
    this.detectNumber = this.detectNumber.bind(this)
    this.createStage = this.createStage.bind(this)
    this.expose = this.expose.bind(this)

    this._app = app
    this._width = options.width
    this._height = options.height
    if(options.mines % 2 === 0) {
      throw new Error('The number of mines needs to be odd.')
    }
    this._mines = options.mines,
    this._mineTable = []
    for(let i = 0; this._mines > i; i++) {
      this._mineTable.push(true)
    }
    const size = this.size - this._mines
    for(let i = 0; size > i; i++) {
      this._mineTable.push(false)
    }
    this._mineTable = _.chain(this._mineTable)
      .shuffle()
      .chunk(this._width)
      .value()
  }
  get size() {
    return this._width * this._height
  }
  createStage() {
    const rows = []
    for(let y = 0; this._height > y; y++) {
      const row = []
      for(let x = 0; this._width > x; x++) {
        const tile = new Tile(this, {
          x, y,
          size: 40,
          number: this.detectNumber(x, y)
        })
        row.push(tile)
        this._app.stage.addChild(tile.get())
      }
      rows.push(row)
    }
    this._table = rows
    return rows
  }
  getGameMaster() {
    return this._gameMaster
  }
  detectNumber(x, y) {
    let count = 0
    if(this._mineTable[y][x]) return this._mineTable[y][x]
    for(let i = 0; 8 > i; i++) {
      const nx = x + dx[i]
      const ny = y + dy[i]
      if(nx < 0 || ny < 0 || nx >= this._width || ny >= this._height) {
        continue
      } else if(this._mineTable[ny][nx]) {
        count++
      }
    }
    return count
  }
  expose(x, y, isNumber) {
    for(let i = 0; isNumber ? 4 : 8 > i; i++) {
      const nx = x + (isNumber ? rdx[i] : dx[i])
      const ny = y + (isNumber ? rdy[i] : dy[i])
      if(nx < 0 || ny < 0 || nx >= this._width || ny >= this._height) {
        continue
      }
      const tile = this._table[ny][nx]
      if(!tile.isMine() && !tile.isOpened()) {
        tile.dynamicOpen()
      }
    }
  }
}

export default Table