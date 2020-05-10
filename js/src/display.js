class Display {
  static DEFAULT_CELL_COLOR = 'transparent';
  static CELL_COLORS = [
    '#fec901', '#fc9a00', '#ff2905', '#fe5744', '#ff8970', // R
    '#348680', '#00bd89', '#33847e', '#30606c', '#73ceaf', // G
    '#775a79', '#fc87b1', '#47a3e2', '#a5ebe9', '#3979c0'  // B
  ];

  constructor(canvas, grid) {
    this._screen = canvas.getContext('2d');
    this._screenSize = canvas.offsetWidth;
    this._cellSize = canvas.offsetWidth / grid.cellCount;
    canvas.setAttribute('style', this._canvasStyle());

    this._grid = grid;
  }

  addStarter(starter) {
    this._grid.addStarter(starter);
    this._display();
  }

  update() {
    this._grid.applyRules();
    this._clearScreen();
    this._display();
  }

  _display() {
    for (let row = 0; row < this._grid.cellCount; row++) {
      for (let cell = 0; cell < this._grid.cellCount; cell++) {
        this._setCellColor(row, cell);
        this._screen.fillRect(cell * this._cellSize, row * this._cellSize, this._cellSize, this._cellSize);
      }
    }
  }

  _clearScreen() {
    this._screen.clearRect(0, 0, this._screenSize, this._screenSize);
  }

  _setCellColor(row, cell) {
    this._screen.fillStyle = this._grid.getState(row, cell) === Grid.ALIVE ?
      this._randomColor() :
      Display.DEFAULT_CELL_COLOR;
  }

  _randomColor() {
    let randomIndex = Math.floor(Math.random() * Display.CELL_COLORS.length);
    return Display.CELL_COLORS[randomIndex];
  }

  _canvasStyle() {
    return `background-image:
        linear-gradient(white 1px, transparent 1px),
        linear-gradient(90deg, white 1px, transparent 1px),
        linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px);
      background-size: ${5 * this._cellSize}px ${5 * this._cellSize}px,
                       ${5 * this._cellSize}px ${5 * this._cellSize}px,
                       ${this._cellSize}px ${this._cellSize}px, ${this._cellSize}px ${this._cellSize}px;
      background-position:-1px -1px, -1px -1px, -1px -1px, -1px -1px;`;
  }
}
