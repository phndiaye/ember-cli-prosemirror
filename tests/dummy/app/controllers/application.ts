import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class Application extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @action
  onContentChange(content: Node) {
    console.log(content);
  }
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': Application;
  }
}
