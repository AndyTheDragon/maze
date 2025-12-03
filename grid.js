export default class Grid {
  #rows;
  #cols;
  #grid;

  constructor(rows, cols) {
    this.#rows = rows;
    this.#cols = cols;
    this.#grid = new Array(rows * cols).fill(null);
  }

  get rows() {
    return this.#rows;
  }

  get cols() {
    return this.#cols;
  }

  get size() {
    return this.#rows * this.#cols;
  }

  fill(value) {
    this.#grid.fill(value);
  }

  indexFor({ row, col }) {
    if (row < 0 || row >= this.#rows || col < 0 || col >= this.#cols) {
      return undefined;
    }
    return row * this.#cols + col;
  }

  rowColFor(index) {
    if (index < 0 || index >= this.size) {
      return undefined;
    }
    const row = Math.floor(index / this.#cols);
    const col = index % this.#cols;
    return { row, col };
  }

  get({ row, col }) {
    const index = this.indexFor({ row, col });
    if (index === undefined) {
      return 0;
    }
    return this.#grid[index];
  }

  set({ row, col }, value) {
    const index = this.indexFor({ row, col });
    if (index !== undefined) {
      let cell = this.rowColFor(index);
      cell.value = value;
      this.#grid[index] = cell;
    }
  }

  north({ row, col }) {
    return this.get({row: row - 1, col});
  }

  south({ row, col }) {
    return this.get({row: row + 1, col});
  }

  east({ row, col }) {
    return this.get({row, col: col + 1});
  }

  west({ row, col }) {
    return this.get({row, col: col - 1});
  }

  getNeighbors({ row, col }) {
    return {
        north: this.north({ row, col }),
        east: this.east({ row, col }),
        south: this.south({ row, col }),
        west: this.west({ row, col }),
    };
}

  nextInRow({ row, col }) {
    return this.east({ row, col });
  }

  nextInCol({ row, col }) {
    return this.south({ row, col });
  }
}