class Location {
  constructor(row, cell) {
    this.row = row;
    this.cell = cell;
  }

  setLocation(row, cell) {
    this.row = row;
    this.cell = cell;
  }

  neighbours(cellCount) {
    let
      left = this._ltBorderProtected(this.cell, cellCount),
      top = this._ltBorderProtected(this.row, cellCount),
      right = this._rbBorderProtected(this.cell, cellCount),
      bottom = this._rbBorderProtected(this.row, cellCount);

    return [
      { row: top,      cell: left }, {row: top,    cell: this.cell }, { row: top,      cell: right },
      { row: this.row, cell: left },                                  { row: this.row, cell: right },
      { row: bottom,   cell: left }, {row: bottom, cell: this.cell }, { row: bottom,   cell: right }
    ];
  }

  _ltBorderProtected(coordinate, cellCount) {
    return (cellCount + coordinate - 1) % cellCount;
  }

  _rbBorderProtected(coordinate, cellCount) {
    return (cellCount + coordinate + 1) % cellCount;
  }
}
