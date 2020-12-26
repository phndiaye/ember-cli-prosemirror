// Types for compiled templates
declare module 'ember-cli-prosemirror/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
