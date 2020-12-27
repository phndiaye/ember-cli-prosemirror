import { Schema as ProseMirrorSchema } from 'prosemirror-model';
import { nodes as basicSchemaNodes, marks as basicSchemaMarks } from 'prosemirror-schema-basic';

const schema = new ProseMirrorSchema({
  nodes: {
    ...basicSchemaNodes
  },
  marks: {
    ...basicSchemaMarks
  }
})

export default schema;
export { schema };
