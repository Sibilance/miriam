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

    draw(elem, x, y) {
      elem.style.transform = 'translate(' + x + 'px, ' + -y + 'px)';
      if (elem.parentNode !== this._coord_root) {
        this._coord_root.appendChild(elem);
      }
    }

    remove(elem) {
      if (elem.parentNode === this._coord_root) {
        this._coord_root.removeChild(elem);
      }
    }
  }

  return {
    Board: Board
  };
});
