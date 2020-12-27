import { Schema as ProseMirrorSchema } from 'prosemirror-model';
import { nodes as basicSchemaNodes, marks as basicSchemaMarks } from 'prosemirror-schema-basic';

import { TextUnderlineMarkSpec } from 'ember-cli-prosemirror/-internal/marks';

const schema = new ProseMirrorSchema({
  nodes: {
    ...basicSchemaNodes
  },
  marks: {
    ...basicSchemaMarks,
    underline: TextUnderlineMarkSpec
  }
})

export default schema;
export { schema };
