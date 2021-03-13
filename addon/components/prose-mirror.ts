import Component from '@glimmer/component';

import { action } from '@ember/object';

import { baseKeymap } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { Schema as ProseMirrorSchema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import schema from 'ember-cli-prosemirror/-internal/schema';
import MenuBuilder from 'ember-cli-prosemirror/plugins/menu-builder';

interface IProseMirrorArgs {
  onContentChange: Function;
}

export default class ProseMirror extends Component<IProseMirrorArgs> {
  private editorView: EditorView | null = null;

  @action
  protected initializeProseMirror(element: Element) {
    const self = this;
    const { _dispatchTransaction } = this;

    this.editorView = new EditorView(element, {
      dispatchTransaction: _dispatchTransaction.bind(self),
      state: this._buildEditorState(schema)
    });
  }

  private _buildEditorState(s: ProseMirrorSchema): EditorState {
    return EditorState.create({
      plugins: [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo }),
        keymap(baseKeymap),

        new MenuBuilder(s).getFullMenu()
      ],
      schema: s
    });
  }

  private _dispatchTransaction(transaction: Transaction) {
    this.editorView?.updateState(this.editorView.state.apply(transaction));
    this.args.onContentChange?.(this.editorView?.state.doc);
  }
}
