ember-cli-prosemirror
==============================================================================

Use [ProseMirror](https://prosemirror.net/) in your Ember application.


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-prosemirror
```


Usage
------------------------------------------------------------------------------

**ember-cli-prosemirror** exposes a single `<ProseMirror>` component for now.

Usage :

```hbs
<ProseMirror @onContentChange={{this.onContentChange}} />
```

```js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class YourComponent extends Component {
  /**
  * @param {Node} content - The Prosemirror Document Node of the new state.
  * https://prosemirror.net/docs/ref/#model.Node
  */
  @action
  onContentChange(documentContent) {
  }
}
```


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above



Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
