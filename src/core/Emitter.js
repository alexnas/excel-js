export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // NotifY listeners about events, if exist
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // Subscribe on event notifications
  // Add new listener
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    // unsubscribe procedure
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => {
        listener != fn;
      });
    };
  }
}
