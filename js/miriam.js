define(require => {
  let sprite = require('sprite');
  let words = require('words');

  class Miriam {
    constructor(board, action_loop) {
      this._action_loop = action_loop;
      this._board = board;
      this._sprite = new sprite.Sprite(
        board,
        'miriam'
      );
      this._phrases = [
        'hello!',
        'my name is miriam',
        'i am a block with rounded corners',
        'i am trans',
        'i can jump',
        'my favorite color is pink',
        'not this ugly background color, tho',
        'i like to wear navy',
        'my favorite food is spicy fried rice',
        'but i don\'t like green peas',
        'my dream is to be a famous artist',
        'like Man Ray',
        'i just wanna live my life',
        'please be nice to me',
        'or just leave me alone'
      ];
    }

    talk() {
      new words.Words(
        this._board,
        this._action_loop,
        this._phrases.shift() || 'i have nothing more to say',
        this._sprite.x,
        this._sprite.y
      ).fall();
    }

    jump() {
      console.log('Miriam().jump()');
      this._action_loop.cancel(this);
      this._action_loop.queue(this, function* () {
        let rate = 1000;
        while (rate > 0) {
          let frame_rate = yield;
          this._sprite.moveUp(rate/frame_rate);
          rate -= 3000 / frame_rate;
        }
        this.talk();
        this.fall();
      }.bind(this));
    }

    fall() {
      console.log('Miriam().fall()');
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
