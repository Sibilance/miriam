define(require => {

  class Sprite {
    constructor(board, class_name) {
      this._board = board;
      this._elem = document.createElement('div');
      this._elem.className = 'sprite ' + class_name;
      this._x = 0;
      this._y = 0;
      this.draw();
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

    moveUp(distance) {
      this._y += distance;
      this.draw();
    }

    moveDown(distance) {
      this._y -= distance;
      this.draw();
    }
  }

  return {
    Sprite: Sprite
  };
});
