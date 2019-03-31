define(require => {
  let sprite = require('sprite');

  class Miriam {
    constructor(board, action_loop) {
      let elem = document.createElement('div');
      elem.className = 'miriam';
      this._action_loop = action_loop;
      this._sprite = new sprite.Sprite(
        board,
        'miriam'
      );
    }

    jump() {
      console.log('jump');
      this._action_loop.cancel(this);
      this._action_loop.queue(this, function* () {
        let rate = 1000;
        while (rate > 0) {
          let frame_rate = yield;
          this._sprite.moveUp(rate/frame_rate);
          rate -= 3000 / frame_rate;
        }
        this.fall();
      }.bind(this));
    }

    fall() {
      console.log('fall');
      this._action_loop.queue(this, function* () {
        // TODO: check for other obstacles
        let rate = 0;
        while (this._sprite.y > 0) {
          let frame_rate = yield;
          rate = Math.min(1000, rate + 3000 / frame_rate);
          this._sprite.moveDown(
            Math.min(rate / frame_rate, this._sprite.y)
          );
        }
      }.bind(this));
    }
  }

  return {
    Miriam: Miriam
  };
});
