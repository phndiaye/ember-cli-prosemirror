import { toggleMark } from 'prosemirror-commands';
import { MenuItem } from 'prosemirror-menu';
import { Mark, MarkType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

import faIcon from './fa-icon';
import menuIconsMapping from './menu-icons-mapping';

const setMarkupAsActive = (state: EditorState, type: MarkType): Mark<any> | null | undefined | boolean => {
  const { from, $from, to, empty } = state.selection;

  if (empty) {
    return type.isInSet(state.storedMarks || $from.marks());
  } else {
    return state.doc.rangeHasMark(from, to, type);
  }
};

const buildMenuItem = (cmd: any, options: object): MenuItem => {
  const passedOptions = {
    label: options.title,
    run: cmd
  };

  for (const [k, v] of Object.entries(options)) {
    passedOptions[k] = v;
  }

  if ((!options.enable || options.enable === true) && !options.select) {
    passedOptions[options.enable ? 'enable' : 'select'] = (state: EditorState) => cmd(state);
  }

  return new MenuItem(passedOptions);
};

export const buildMarkupItem = (type: MarkType, options: Object) => {
  return buildMenuItem(toggleMark(type), {
    ...options,
    active: (state: EditorState) => {
      return setMarkupAsActive(state, type);
    },
    enable: true
  });
};

/*
 * Filter null/undefined values from an Array.
 */
export const compactArray = (array: Array<any>) => array.filter((x) => x);

export { faIcon };
export { menuIconsMapping };
