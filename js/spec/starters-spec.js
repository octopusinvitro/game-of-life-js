describe('Starters', () => {
  let locations, starter;

  beforeEach(() => {
    locations = [
      { row: 0, cell: 1 },
      { row: 1, cell: 1 }
    ];
    starter = Starters.createStarter(locations);
  });

  it('calculates the cellCount', () => {
    expect(starter.cellCount).toEqual(2);
  });

  it('sets the right cells to alive', () => {
    expect(starter.getState(0, 1)).toEqual(Grid.ALIVE);
    expect(starter.getState(1, 1)).toEqual(Grid.ALIVE);
  });

  it('leaves the other cells dead', () => {
    expect(starter.getState(0, 0)).toEqual(Grid.DEAD);
    expect(starter.getState(1, 0)).toEqual(Grid.DEAD);
  });
});
