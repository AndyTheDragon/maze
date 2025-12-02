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
    let index = this.indexFor({ row: row - 1, col });
    if (index === undefined) {
      return undefined;
    }
    return this.#grid[index];
    
  }

  south({ row, col }) {
    let index = this.indexFor({ row: row + 1, col });
    if (index === undefined) {
      return undefined;
    }
    return this.#grid[index];
  }

  east({ row, col }) {
    let index = this.indexFor({ row, col: col + 1 });
    if (index === undefined) {
      return undefined;
    }
    return this.#grid[index];
  }

  west({ row, col }) {
    const index = this.indexFor({ row, col: col - 1 });
    if (index === undefined) {
      return undefined;
    }
    return this.#grid[index];
  }

  neighbours({ row, col }) {
    if (this.indexFor({ row, col }) === undefined) return [];

    const neighbors = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr;
        const c = col + dc;
        const idx = this.indexFor({ row: r, col: c });
        if (idx === undefined) continue;
        neighbors.push({ row: r, col: c });
      }
    }
    return neighbors;
  }

  neighbourValues({ row, col }) {
    if (this.indexFor({ row, col }) === undefined) return [];

    const neighbors = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr;
        const c = col + dc;
        const idx = this.indexFor({ row: r, col: c });
        if (idx === undefined) continue;

        neighbors.push(this.#grid[idx]);
      }
    }
    return neighbors;
  }

  nextInRow({ row, col }) {
    return this.east({ row, col });
  }

  nextInCol({ row, col }) {
    return this.south({ row, col });
  }
}