import { Mark, MarkType } from 'prosemirror-model';
import { MenuItem } from 'prosemirror-menu';
import { EditorState } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';

import menuIconsMapping from './menu-icons-mapping';
import faIcon from './fa-icon';


const setMarkupAsActive = (state: EditorState, type: MarkType): Mark<any> | null | undefined | boolean => {
  let { from, $from, to, empty } = state.selection;

  if (empty) {
    return type.isInSet(state.storedMarks || $from.marks());
  } else {
    return state.doc.rangeHasMark(from, to, type);
  }
}

const buildMenuItem = (cmd: any, options: Object): MenuItem => {
  let passedOptions = {
    label: options.title,
    run: cmd
  };

  for (let prop in options) {
    passedOptions[prop] = options[prop];
  }

  if ((!options.enable || options.enable === true) && !options.select) {
    passedOptions[options.enable ? 'enable' : 'select'] = (state: EditorState) => cmd(state);
  }

  return new MenuItem(passedOptions);
}

export const buildMarkupItem = (type: MarkType, options : Object) => {
  return buildMenuItem(
    toggleMark(type),
    {
      ...options,
      active: (state: EditorState) => {
        return setMarkupAsActive(state, type)
      },
      enable: true
    }
  );
}

export { faIcon }
export { menuIconsMapping }
