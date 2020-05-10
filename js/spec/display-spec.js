describe('Display', () => {
  let display, grid, canvas, context, size = 6, cellCount = 3;

  beforeEach(() => {
    createScreen();
    grid = new Grid(cellCount);
    display = new Display(canvas, grid);
  });

  afterEach(() => {
    canvas.remove();
  });

  describe('on initialization', () => {
    it('displays grid based on cell size', () => {
      expect(canvas.style['background-size']).toContain('10px, 2px');
    });
  });

  describe('#addStarter', () => {
    let starter = Starters.createStarter([
        { row: 0, cell: 1 },
        { row: 1, cell: 0 }
      ]);

    it('applies the starter to the grid', () => {
      display.addStarter(starter);
      expect(grid.getState(0, 1)).toEqual(Grid.ALIVE);
      expect(grid.getState(1, 0)).toEqual(Grid.ALIVE);
    });

    it('draws the starter alive cells', () => {
      spyOn(context, 'fillRect');
      display.addStarter(starter);
      expect(context.fillRect).toHaveBeenCalledWith(0, 0, 2, 2);
    });
  });

  describe('#update', () => {
    it('applies the rules to the grid', () => {
      spyOn(grid, 'applyRules');
      display.update();
      expect(grid.applyRules).toHaveBeenCalledTimes(1);
    });

    it('clears grid before displaying', () => {
      spyOn(context, 'clearRect');
      display.update();
      expect(context.clearRect).toHaveBeenCalledWith(0, 0, size, size);
    });

    it('sets a default color for dead cells', () => {
      display.update();
      expect(context.fillStyle).toEqual('rgba(0, 0, 0, 0)');
    });

    it('sets a random color for alive cells', () => {
      block = new Grid(3);
      block.setState(1, 1, Grid.ALIVE);
      block.setState(1, 2, Grid.ALIVE);
      block.setState(2, 1, Grid.ALIVE);
      block.setState(2, 2, Grid.ALIVE);
      display = new Display(canvas, block);

      spyOn(Math, 'random').and.returnValue(0);
      display.update();
      expect(context.fillStyle).toEqual(Display.CELL_COLORS[0]);
    });

    it('redraws grid', () => {
      spyOn(context, 'fillRect');
      display.update();
      expect(context.fillRect).toHaveBeenCalledWith(0, 0, 2, 2);
    });
  });

  function createScreen() {
    canvas = document.createElement('canvas');
    canvas.width = size;
    document.body.appendChild(canvas);

    context = canvas.getContext('2d');
  }
});
