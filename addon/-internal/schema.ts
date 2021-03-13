import { MarkType, Schema as ProseMirrorSchema } from 'prosemirror-model';
import { marks as basicSchemaMarks, nodes as basicSchemaNodes } from 'prosemirror-schema-basic';

import { TextStrikethroughMarkSpec, TextUnderlineMarkSpec } from 'ember-cli-prosemirror/-internal/marks';

import { buildMarkupItem, menuIconsMapping } from 'ember-cli-prosemirror/-utils';

MarkType.prototype.toMenuItem = function () {
  if (menuIconsMapping[this.name]) {
    return buildMarkupItem(this, menuIconsMapping[this.name]);
  }
};

const schema = new ProseMirrorSchema({
  marks: {
    ...basicSchemaMarks,
    strikethrough: TextStrikethroughMarkSpec,
    underline: TextUnderlineMarkSpec
  },
  nodes: {
    ...basicSchemaNodes
  }
});

export default schema;
export { schema };
