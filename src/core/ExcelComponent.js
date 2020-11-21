import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  // Adjust the component up to "init"
  prepare() {}

  // Return component template
  toHTML() {
    return '';
  }

  // Notify listeners about emitted events
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Subscribe on the event to be emitted
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // Component initialization
  // Add DOM listeners
  init() {
    this.initDOMListeners();
  }

  // Destroy component
  // Clean listeners
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
