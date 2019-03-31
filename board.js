define(require => {

  class Board {
    constructor(elem) {
      this._elem = elem;
      this._coord_root = document.createElement('div');
      this._coord_root.className = 'coordinate-root';
      this._coord_root.style.left = 0;
      this._coord_root.style.bottom = 0;
      this._elem.appendChild(this._coord_root);
    }

    detectBoundary(x, y) {
      // document.elementsFromPoint() ?
    }

    draw(elem, x, y) {
      elem.style.transform = 'translate(' + x + 'px, -' + y + 'px)';
      if (elem.parentNode !== this._coord_root) {
        this._coord_root.appendChild(elem);
      }
    }
  }

  return {
    Board: Board
  };
});
