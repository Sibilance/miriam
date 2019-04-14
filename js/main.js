require.config({
    urlArgs: "_=v2"
});

define(require => {
  let board = require('board');
  let action_loop = require('action_loop');
  let game = require('game');

  let my_action_loop = new action_loop.ActionLoop();
  let my_game = new game.Game(
    new board.Board(
      document.getElementById('main_board')
    ),
    my_action_loop
  );

  document.addEventListener('keydown', event => my_game.processKeyDown(event));
  document.addEventListener('touchstart', event => my_game.processTouch(event));
  my_action_loop.start(60);

  my_game.start();
});
