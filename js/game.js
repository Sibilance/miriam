define(require => {
  let miriam = require('miriam');

  class Game {
    constructor(board, action_loop) {
      this._board = board;
      this._action_loop = action_loop;
      this._miriam = new miriam.Miriam(this._board, this._action_loop);
    }

    processKeyDown(event) {
      console.log('keydown', event.code);
      if (event.code === 'Space') {
        this._miriam.jump();
      }
    }

    processTouch(event) {
      console.log('touch', event);
      this._miriam.jump();
    }

    start() {
      this._miriam.jump();
    }
  };

  return {
    Game: Game
  };
});
