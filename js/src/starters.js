class Starters {
  static GLIDER = this.createStarter([
    { row: 0, cell: 2 },
    { row: 1, cell: 0 },
    { row: 1, cell: 2 },
    { row: 2, cell: 1 },
    { row: 2, cell: 2 }
  ]);

  static R_PENTOMINO = this.createStarter([
    { row: 0, cell: 1 },
    { row: 0, cell: 2 },
    { row: 1, cell: 0 },
    { row: 1, cell: 1 },
    { row: 2, cell: 1 }
  ]);

  static DIE_HARD = this.createStarter([
    { row: 0, cell: 6 },
    { row: 1, cell: 0 },
    { row: 1, cell: 1 },
    { row: 2, cell: 1 },
    { row: 2, cell: 5 },
    { row: 2, cell: 6 },
    { row: 2, cell: 7 }
  ]);

  static ACORN = this.createStarter([
    { row: 0, cell: 1 },
    { row: 1, cell: 3 },
    { row: 2, cell: 0 },
    { row: 2, cell: 1 },
    { row: 2, cell: 4 },
    { row: 2, cell: 5 },
    { row: 2, cell: 6 }
  ]);

  static createStarter(locations) {
    let maxCoordinate = Math.max(
      Math.max(...locations.map((location) => location.row)),
      Math.max(...locations.map((location) => location.cell))
    );

    const starter = new Grid(maxCoordinate + 1);

    locations.forEach((location) => {
      starter.setState(location.row, location.cell, Grid.ALIVE);
    });

    return Object.freeze(starter);
  }
}
