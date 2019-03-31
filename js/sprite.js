define(require => {

  class Sprite {
    constructor(board, class_name, x, y) {
      this._board = board;
      this._elem = document.createElement('div');
      this._elem.className = 'sprite ' + class_name;
      this._x = x || 0;
      this._y = y || 0;
      this.draw();
    }

    get element() {
      return this._elem;
    }

    get x() {
      return this._x;
    }

    get y() {
      return this._y;
    }

    draw() {
      this._board.draw(this._elem, this._x, this._y);
    }

    remove() {
      this._board.remove(this._elem);
    }

    moveUp(distance) {
      this._y += distance;
      this.draw();
    }

    moveDown(distance) {
      this._y -= distance;
      this.draw();
    }

    moveLeft(distance) {
      this._x -= distance;
      this.draw();
    }

    moveRight(distance) {
      this._x += distance;
      this.draw();
    }
  }

  return {
    Sprite: Sprite
  };
});
