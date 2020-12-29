import { capitalize } from '@ember/string'
import { Schema, Mark, MarkType } from 'prosemirror-model'
import {
  menuBar,
  MenuItem,
  Dropdown as MenuDropdown,

  undoItem,
  redoItem,
  blockTypeItem
} from 'prosemirror-menu'
import { toggleMark } from 'prosemirror-commands'
import { EditorState, Plugin } from 'prosemirror-state'

import { faIcon } from 'ember-cli-prosemirror/-utils';

interface MenuBuilderInterface {
  schema: Schema;
  floating: boolean;
  menuItems: MenuItemsDefinition;

  getFullMenu(): Plugin;
}

interface MenuItemsDefinition {
  toggleStrong?: any;
  toggleEm?: any;
  toggleUnderline?: any;
  toggleStrikethrough?: any;
  toggleCode?: any;
  headings?: Array<any>;
  inlineMenu?: Array<any>;
  headingsDropdown?: MenuDropdown;

  fullMenu?: Array<any>
}

/*
 * Filter null/undefined values from an Array.
 */
const compactArray = (array: Array<any>) => array.filter(x => x);

/**
 * Builds a relevant menu based on the schema's default marks.
 */
export default class MenuBuilder implements MenuBuilderInterface {
  schema: Schema;
  menuItems: MenuItemsDefinition = { fullMenu: [] };
  floating: boolean = false;

  /**
   * @constructor
   * @param {Schema} schema - The Prosemirror Schema
   * @param {boolean} floating - Determines whether whether the menu sticks to the top of the viewport when the editor is partially scrolled out of view.
   */
  constructor(schema: Schema<any, any>, floating: boolean = false) {
    this.schema = schema
    this.floating = floating
  }

  getFullMenu(): Plugin {
    return menuBar({
      floating: this.floating,
      content:  this._buildMenuItems().fullMenu || []
    })
  }

  /*
   * Given a schema, build the relevant menu items by looking into its default
   * marks.

   * Also adds markup features like Headings and State alteration features like undo and redo.

   * https://prosemirror.net/docs/ref/#model.MarkType
   * 
   */
  _buildMenuItems(): MenuItemsDefinition {
    ['strong', 'em', 'code', 'underline', 'strikethrough'].forEach((name) => {
      if (this.schema.marks[name]) {
        this.menuItems[`toggle${capitalize(name)}`]  = this.schema.marks[name].toMenuItem();
      }
    })

    this.menuItems.headings = [];
    if (this.schema.nodes.heading) {
      for (let i = 1; i <= 6; i++) {
        this.menuItems.headings.push(
          blockTypeItem(this.schema.nodes.heading, {
            title: `Heading ${i}`,
            label: `Heading ${i}`,
            attrs: { level: i }
          })
        );
      }
    }

    this.menuItems.inlineMenu = compactArray([
      this.menuItems.toggleStrong, this.menuItems.toggleEm, this.menuItems.toggleUnderline,
      this.menuItems.toggleStrikethrough, this.menuItems.toggleCode
    ]);

    this.menuItems.headingsDropdown = new MenuDropdown(
      compactArray(this.menuItems.headings), {
        title: 'Paragraph',
        label: 'Paragraph',
        class: 'ProseMirror-menubar__dropdown',
        icon: {
          dom: faIcon('heading')
        }
      }
    )

    /*
     * Reconfigure some features imported from packages.
     * By default, undo & redo use SVG Paths as icons, so we want to replace
     * them with Font Awesome ones.
     */
    undoItem.spec.icon = faIcon('undo')
    redoItem.spec.icon = faIcon('redo')

    this.menuItems.fullMenu = [[this.menuItems.headingsDropdown]].concat(
      [this.menuItems.inlineMenu],
      [[undoItem, redoItem]]
    );

    return this.menuItems;
  }

  _buildMarkupItem(markType: MarkType, options: Object = {}) {
    return this._buildMenuItem(
      toggleMark(markType),
      {
        ...options,
        active: (state: EditorState) => {
          return this._setMarkupAsActive(state, markType)
        },
        enable: true
      }
    );
  }

  _setMarkupAsActive(state: EditorState, type: MarkType): Mark<any> | null | undefined | boolean {
    let { from, $from, to, empty } = state.selection;

    if (empty) {
      return type.isInSet(state.storedMarks || $from.marks());
    } else {
      return state.doc.rangeHasMark(from, to, type);
    }
  }

  _buildMenuItem(cmd: any, options: Object): MenuItem {
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
}
