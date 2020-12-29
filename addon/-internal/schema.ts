import { Schema as ProseMirrorSchema, MarkType } from 'prosemirror-model';
import { nodes as basicSchemaNodes, marks as basicSchemaMarks } from 'prosemirror-schema-basic';

import {
  TextUnderlineMarkSpec, TextStrikethroughMarkSpec
} from 'ember-cli-prosemirror/-internal/marks';

import { buildMarkupItem, menuIconsMapping } from 'ember-cli-prosemirror/-utils';

MarkType.prototype.toMenuItem = function() {
  if (menuIconsMapping[this.name]) {
    return buildMarkupItem(this, menuIconsMapping[this.name])
  }
}

const schema = new ProseMirrorSchema({
  nodes: {
    ...basicSchemaNodes
  },
  marks: {
    ...basicSchemaMarks,
    underline: TextUnderlineMarkSpec,
    strikethrough: TextStrikethroughMarkSpec
  }
})

export default schema
export { schema }
