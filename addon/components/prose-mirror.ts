import Component from '@glimmer/component';
import { action } from '@ember/object';

import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { undo, redo, history } from "prosemirror-history"
import { baseKeymap } from "prosemirror-commands"
import { keymap } from "prosemirror-keymap"

interface ProseMirrorArgs {
}

export default class ProseMirror extends Component<ProseMirrorArgs> {
  editorView: EditorView | null = null;

  _buildEditorState(schema: Schema) : EditorState {
    return EditorState.create({
      schema,
      plugins: [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo }),
        keymap(baseKeymap)
      ]
    });
  }

  _dispatchTransaction(transaction: Transaction) {
    this.editorView?.updateState(this.editorView.state.apply(transaction));
  }

  @action
  initializeEditor(element: Element) {
    const self = this;
    const { _dispatchTransaction } = this;

    this.editorView = new EditorView(element, {
      state: this._buildEditorState(basicSchema),
      dispatchTransaction: _dispatchTransaction.bind(self)
    });
  }
}
