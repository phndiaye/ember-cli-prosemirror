import { capitalize } from '@ember/string';

import { toggleMark } from 'prosemirror-commands';
import { blockTypeItem, Dropdown as MenuDropdown, menuBar, MenuItem, redoItem, undoItem } from 'prosemirror-menu';
import { Mark, MarkType, Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';

import { compactArray, faIcon } from 'ember-cli-prosemirror/-utils';

interface IMenuBuilderInterface {
  schema: Schema;
  floating: boolean;
  menuItems: IMenuItemsDefinition;

  getFullMenu(): Plugin;
}

interface IMenuItemsDefinition {
  toggleStrong?: any;
  toggleEm?: any;
  toggleUnderline?: any;
  toggleStrikethrough?: any;
  toggleCode?: any;
  headings?: Array<any>;
  inlineMenu?: Array<any>;
  headingsDropdown?: MenuDropdown;

  fullMenu?: Array<any>;
}

/**
 * Builds a relevant menu based on the schema's default marks.
 */
export default class MenuBuilder implements IMenuBuilderInterface {
  private schema: Schema;
  private menuItems: IMenuItemsDefinition = { fullMenu: [] };
  private floating: boolean = false;

  /**
   * @constructor
   * @param {Schema} schema - The Prosemirror Schema
   * @param {boolean} floating - Determines whether whether the menu sticks to the top of the viewport when the editor
   * is partially scrolled out of view.
   */
  constructor(schema: Schema<any, any>, floating: boolean = false) {
    this.schema = schema;
    this.floating = floating;
  }

  public getFullMenu(): Plugin {
    return menuBar({
      content: this._buildMenuItems().fullMenu || [],
      floating: this.floating
    });
  }

  /*
   * Given a schema, build the relevant menu items by looking into its default
   * marks.

   * Also adds markup features like Headings and State alteration features like undo and redo.

   * https://prosemirror.net/docs/ref/#model.MarkType
   *
   */
  private _buildMenuItems(): IMenuItemsDefinition {
    ['strong', 'em', 'code', 'underline', 'strikethrough'].forEach((name) => {
      if (this.schema.marks[name]) {
        this.menuItems[`toggle${capitalize(name)}`] = this.schema.marks[name].toMenuItem();
      }
    });

    this.menuItems.headings = [];
    if (this.schema.nodes.heading) {
      for (let i = 1; i <= 6; i++) {
        this.menuItems.headings.push(
          blockTypeItem(this.schema.nodes.heading, {
            attrs: { level: i },
            label: `Heading ${i}`,
            title: `Heading ${i}`
          })
        );
      }
    }

    this.menuItems.inlineMenu = compactArray([
      this.menuItems.toggleStrong,
      this.menuItems.toggleEm,
      this.menuItems.toggleUnderline,
      this.menuItems.toggleStrikethrough,
      this.menuItems.toggleCode
    ]);

    this.menuItems.headingsDropdown = new MenuDropdown(compactArray(this.menuItems.headings), {
      class: 'ProseMirror-menubar__dropdown',
      icon: {
        dom: faIcon('heading')
      },
      label: 'Paragraph',
      title: 'Paragraph'
    });

    /*
     * Reconfigure some features imported from packages.
     * By default, undo & redo use SVG Paths as icons, so we want to replace
     * them with Font Awesome ones.
     */
    undoItem.spec.icon = faIcon('undo');
    redoItem.spec.icon = faIcon('redo');

    this.menuItems.fullMenu = [[this.menuItems.headingsDropdown]].concat(
      [this.menuItems.inlineMenu],
      [[undoItem, redoItem]]
    );

    return this.menuItems;
  }
}
