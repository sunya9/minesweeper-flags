import { Graphics, Container, Text, TextStyle } from 'pixi.js'

class Tile {
  constructor(table, opt = {
    size: 40,
    x: 0,
    y: 0,
    number: -1
  }) {
    this.open = this.open.bind(this)
    this.isMine = this.isMine.bind(this)
    this.get = this.get.bind(this)
    this.isSpace = this.isSpace.bind(this)
    this.getNumber = this.getNumber.bind(this)
    this.dynamicOpen = this.dynamicOpen.bind(this)
    this.internalOpen = this.internalOpen.bind(this)
    this.isNumber = this.isNumber.bind(this)

    this._number = opt.number
    this._x = opt.x
    this._y = opt.y
    this._size = opt.size
    this._opend = false
    this._table = table

    const container = new Container()
    const background = new Graphics()
    background.clear()
    background.beginFill(Tile.unopenColor)
    background.drawRect(0, 0, opt.size - 1, opt.size - 1)
    background.endFill()

    const style = new TextStyle({
      fontSize: 24,
      fill: 0xecf0f1,
      align: 'center',
      // dropShadow: true,
      dropShadowDistance: 2,
      dropShadowAngle: Math.PI / 2,
      dropShadowBlur: 0
    })
    const drawNumber = opt.number === 0 ? '' : opt.number
    const text = new Text(drawNumber, style)
    text.anchor.set(0.5)
    text.x = opt.size / 2
    text.y = opt.size / 2
    container.addChild(background)
    container.addChild(text)
    container.x = opt.x * opt.size
    container.y = opt.y * opt.size
    container.interactive = true
    container.buttonMode = true
    container.on('pointerdown', this.open)
    this._container = container
    this._text = text
    this._background = background
    this._text.alpha = 0
  }
  get() {
    return this._container
  }
  getNumber() {
    return this._number
  }
  isNumber() {
    return this._number > 0
  }
  isMine() {
    return this._number === true
  }
  isSpace() {
    return this._number === 0
  }
  isOpened() {
    return this._opened
  }
  dynamicOpen() {
    this.internalOpen()
    if(this.isSpace()) {
      this._table.expose(this._x, this._y, this.isNumber())
    }
  }
  internalOpen() {
    this._background.clear()
    this._background.beginFill(Tile.openedColor)
    this._background.drawRect(0, 0, this._size - 1, this._size - 1)
    this._background.endFill()
    this._text.alpha = 1
    this._opened = true
  }
  open() {
    if(this.isOpened()) return
    this.internalOpen()
    if(this.isSpace()) {
      this._table.expose(this._x, this._y, false)
    }
    if(this.isMine()) {
      
    }
  }
  getState() {
    
  }
}

Tile.unopenColor = 0x2980b9
Tile.openedColor = 0x3498db

Tile.opened = 1
Tile.number = 2
Tile.mine = 4
Tile.space = 8

export default Tile