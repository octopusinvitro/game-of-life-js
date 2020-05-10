class UserInput {
  static MINIDISPLAY_CELL_COUNT = 8;
  static SONG_BEAT_DURATION_IN_MILLISECONDS = 545;

  constructor(cellCount, ids, idsToStarters) {
    this._cellCount = cellCount;

    this._start = document.getElementById(ids.start);
    this._song = document.getElementById(ids.song);
    this._display = new Display(document.getElementById(ids.canvas), new Grid(cellCount));

    this._idsToStarters = idsToStarters;
  }

  initialize() {
    this._displayStarters();
    this._initializeButtons();
    this._initializeStart();
  }

  _displayStarters() {
    this._idsToStarters.forEach((idToStarter) => {
      let cellCount = this._correctedCellCount(idToStarter.starter.cellCount);
      let miniDisplay = new Display(document.getElementById(idToStarter.id), new Grid(cellCount));
      miniDisplay.addStarter(idToStarter.starter);
    });
  }

  _initializeButtons() {
    this._idsToStarters.forEach((idToStarter) => {
      document.getElementById(`${idToStarter.id}-button`).addEventListener('click', () => {
        this._display.addStarter(idToStarter.starter);
      });
    });
  }

  _initializeStart() {
    this._start.addEventListener('click', () => {
      let tick = () => {
        this._display.update();
        setTimeout(tick, UserInput.SONG_BEAT_DURATION_IN_MILLISECONDS);
      };

      this._song.loop = true;
      this._song.play();
      tick();
    });
  }

  _correctedCellCount(cellCount) {
    return cellCount < UserInput.MINIDISPLAY_CELL_COUNT ? UserInput.MINIDISPLAY_CELL_COUNT : cellCount;
  }
}
