define(require => {

  class ActionLoop {
    constructor() {
      this._action_queues = new Map();
    }

    start(frame_rate) {
      setInterval(
        () => this.step(frame_rate),
        1000 / frame_rate
      );
    }

    queue(object, action) {
      let queue = this._action_queues.get(object) || [];
      queue.push(action());
      this._action_queues.set(object, queue);
    }

    cancel(object) {
      this._action_queues.delete(object);
    }

    step(frame_rate) {
      let finished_queues = [];
      for (let [key, value] of this._action_queues) {
        if (value[0] && value[0].next(frame_rate).done) {
          // no more work to do on this action
          value.shift();
        }
        if (!value[0]) {
          // no more work to do on this queue
          finished_queues.push(key);
        }
      }
      for (let key of finished_queues) {
        this._action_queues.delete(key);
      }
    }
  }

  return {
    ActionLoop: ActionLoop
  };
});
