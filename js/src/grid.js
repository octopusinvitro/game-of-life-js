class Grid {
  static DEAD = 0;
  static ALIVE = 1;

  constructor(cellCount) {
    this._cellCount = cellCount;
    this._grid = this._createGrid(cellCount);
    this._location = new Location(0, 0);
  }

  get cellCount() {
    return this._cellCount;
  }

  get grid() {
    return this._grid;
  }

  set grid(rows) {
    this._grid = rows;
  }

  getState(row, cell) {
    return this._grid[row][cell];
  }

  setState(row, cell, state) {
    this._grid[row][cell] = state;
  }

  addStarter(starter) {
    let start = Math.floor(this.cellCount / 2 - starter.cellCount / 2);

    for (let row = 0; row < starter.cellCount; row++) {
      for (let cell = 0; cell < starter.cellCount; cell++) {
        this.setState(row + start, cell + start, starter.getState(row, cell));
      }
    }
  }

  applyRules() {
    let alive, gridCopy = new Grid(this._cellCount);

    this._copy(this, gridCopy);

    for (let row = 0; row < this._cellCount; row++) {
      for (let cell = 0; cell < this._cellCount; cell++) {
        alive = this._aliveNeighboursCount(row, cell);

        if (alive < 2 || alive > 3) {
          gridCopy.setState(row, cell, Grid.DEAD);
        }

        if (alive === 2 && this.getState(row, cell) === Grid.ALIVE ||
            alive === 3) {
          gridCopy.setState(row, cell, Grid.ALIVE);
        }
      }
    }

    this._copy(gridCopy, this);
  }

  _createGrid(cellCount) {
    return Array(cellCount).fill().map(() => {
      return Array(cellCount).fill(Grid.DEAD);
    });
  }

  _copy(source, target) {
    target.grid = source.grid.map((row) => {
      return Array.from(row);
    });
  }

  _aliveNeighboursCount(row, cell) {
    this._location.setLocation(row, cell);

    return this._location.neighbours(this._cellCount).reduce((aliveCount, neighbour) => {
      return aliveCount + this.getState(neighbour.row, neighbour.cell);
    }, 0);
  }
}
