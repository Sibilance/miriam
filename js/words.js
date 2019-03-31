define(require => {
  let sprite = require('sprite');

  class Words {
    constructor(board, action_loop, phrase, x, y) {
      this._action_loop = action_loop;
      this._board = board;
      this._sprite = new sprite.Sprite(
        board,
        'words',
        x,
        y
      );
      this._sprite.element.textContent = phrase;
      this._sprite.moveLeft(
        this._sprite.element.clientWidth
      );
    }

    fall() {
      console.log('Words().fall()');
      this._action_loop.queue(this, function* () {
        let fall_rate = -100;
        let drift_rate = 500;
        let sink_rate = 10;
        while (this._sprite.y > 0) {
          let frame_rate = yield;
          this._sprite.moveDown(
            Math.min(fall_rate / frame_rate, this._sprite.y)
          );
          this._sprite.moveRight(drift_rate / frame_rate);
          fall_rate = Math.min(1000, fall_rate + 1000 / frame_rate);
          drift_rate = Math.max(200, drift_rate - 200 / frame_rate);
        }
        while (drift_rate > 0) {
          let frame_rate = yield;
          this._sprite.moveRight(drift_rate / frame_rate);
          drift_rate = drift_rate - 300 / frame_rate;
        }
        while (this._sprite.y > -this._sprite.element.clientHeight) {
          let frame_rate = yield;
          this._sprite.moveDown(sink_rate / frame_rate);
        }
        this._sprite.remove();
      }.bind(this));
    }
  }

  return {
    Words: Words
  };
});
