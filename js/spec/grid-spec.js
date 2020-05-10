describe('Grid', () => {
  let grid;

  describe('on initialization', () => {
    beforeEach(() => {
      grid = new Grid(2);
    });

    it('creates a square grid', () => {
      expect(grid.cellCount).toEqual(2);
    });

    it('creates a grid of dead cells', () => {
      expect(grid.getState(0, 0)).toEqual(Grid.DEAD);
      expect(grid.getState(0, 1)).toEqual(Grid.DEAD);
      expect(grid.getState(1, 0)).toEqual(Grid.DEAD);
      expect(grid.getState(1, 1)).toEqual(Grid.DEAD);
    });
  });

  describe('#addStarter', () => {
    beforeEach(() => {
      grid = new Grid(5);
    });

    it('copies the starter at the center of the grid', () => {
      grid.addStarter(Starters.GLIDER);

      let sum = grid.getState(1, 3) +
                grid.getState(2, 1) +
                grid.getState(2, 3) +
                grid.getState(3, 2) +
                grid.getState(3, 3);

      expect(sum).toEqual(5)
    });
  });

  describe('#applyRules', () => {
    beforeEach(() => {
      grid = new Grid(3);
    });

    describe('when cell is dead', () => {
      it('stays dead if no neighbour is alive', () => {
        grid.applyRules();
        expect(grid.getState(1, 1)).toEqual(Grid.DEAD);
      });

      it('stays dead if one neighbour is alive', () => {
        grid.setState(0, 0, Grid.ALIVE);
        grid.applyRules();
        expect(grid.getState(1, 1)).toEqual(Grid.DEAD);
      });

      it('stays dead if two neighbours are alive', () => {
        grid.setState(0, 0, Grid.ALIVE);
        grid.setState(0, 1, Grid.ALIVE);
        grid.applyRules();
        expect(grid.getState(1, 1)).toEqual(Grid.DEAD);
      });

      it('comes to life if three neighbours are alive', () => {
        grid.setState(0, 0, Grid.ALIVE);
        grid.setState(0, 1, Grid.ALIVE);
        grid.setState(0, 2, Grid.ALIVE);
        grid.applyRules();
        expect(grid.getState(1, 1)).toEqual(Grid.ALIVE);
      });

      it('stays dead if more than three neighbours are alive', () => {
        grid.setState(0, 0, Grid.ALIVE);
        grid.setState(0, 1, Grid.ALIVE);
        grid.setState(0, 2, Grid.ALIVE);
        grid.setState(1, 0, Grid.ALIVE);
        grid.applyRules();
        expect(grid.getState(1, 1)).toEqual(Grid.DEAD);
      });
    });

    describe('when cell is alive', () => {
      beforeEach(() => {
        grid.setState(1, 1, Grid.ALIVE);
      });

      it('dies if no neighbour is alive', () => {
        grid.applyRules();
        expect(grid.getState(1, 1)).toEqual(Grid.DEAD);
      });

      it('dies if one neighbour is alive', () => {
        grid.setState(0, 0, Grid.ALIVE);
        grid.applyRules();
        expect(grid.getState(1, 1)).toEqual(Grid.DEAD);
      });

      it('stays alive if two neighbours are alive', () => {
        grid.setState(0, 0, Grid.ALIVE);
        grid.setState(0, 1, Grid.ALIVE);
        grid.applyRules();
        expect(grid.getState(1, 1)).toEqual(Grid.ALIVE);
      });

      it('stays alive if three neighbours are alive', () => {
        grid.setState(0, 0, Grid.ALIVE);
        grid.setState(0, 1, Grid.ALIVE);
        grid.setState(0, 2, Grid.ALIVE);
        grid.applyRules();
        expect(grid.getState(1, 1)).toEqual(Grid.ALIVE);
      });

      it('dies if more than three neighbours are alive', () => {
        grid.setState(0, 0, Grid.ALIVE);
        grid.setState(0, 1, Grid.ALIVE);
        grid.setState(0, 2, Grid.ALIVE);
        grid.setState(1, 0, Grid.ALIVE);
        grid.applyRules();
        expect(grid.getState(1, 1)).toEqual(Grid.DEAD);
      });
    });
  });
});
