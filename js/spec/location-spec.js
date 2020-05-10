describe('Location', () => {
  let location, neighbours;

  describe('#neighbours', () => {
    it('calculates 1 cell distance neightbours around', () => {
      location = new Location(1, 1);
      neighbours = [
        { row: 0, cell: 0 }, { row: 0, cell: 1}, { row: 0, cell: 2 },
        { row: 1, cell: 0 },                     { row: 1, cell: 2 },
        { row: 2, cell: 0 }, { row: 2, cell: 1}, { row: 2, cell: 2 }
      ];

      expect(location.neighbours(3)).toEqual(neighbours);
    });

    it('takes care of the left border', () => {
      location = new Location(1, 0);
      neighbours = [
        { row: 0, cell: 2 }, { row: 0, cell: 0}, { row: 0, cell: 1 },
        { row: 1, cell: 2 },                     { row: 1, cell: 1 },
        { row: 2, cell: 2 }, { row: 2, cell: 0}, { row: 2, cell: 1 }
      ];

      expect(location.neighbours(3)).toEqual(neighbours);
    });

    it('takes care of the right border', () => {
      location = new Location(1, 2);
      neighbours = [
        { row: 0, cell: 1 }, { row: 0, cell: 2}, { row: 0, cell: 0 },
        { row: 1, cell: 1 },                     { row: 1, cell: 0 },
        { row: 2, cell: 1 }, { row: 2, cell: 2}, { row: 2, cell: 0 }
      ];

      expect(location.neighbours(3)).toEqual(neighbours);
    });

    it('takes care of the top border', () => {
      location = new Location(0, 1);
      neighbours = [
        { row: 2, cell: 0 }, { row: 2, cell: 1}, { row: 2, cell: 2 },
        { row: 0, cell: 0 },                     { row: 0, cell: 2 },
        { row: 1, cell: 0 }, { row: 1, cell: 1}, { row: 1, cell: 2 }
      ];

      expect(location.neighbours(3)).toEqual(neighbours);
    });

    it('takes care of the bottom border', () => {
      location = new Location(2, 1);
      neighbours = [
        { row: 1, cell: 0 }, { row: 1, cell: 1}, { row: 1, cell: 2 },
        { row: 2, cell: 0 },                     { row: 2, cell: 2 },
        { row: 0, cell: 0 }, { row: 0, cell: 1}, { row: 0, cell: 2 }
      ];

      expect(location.neighbours(3)).toEqual(neighbours);
    });
  });
});
