import MarkSpec from 'prosemirror-model';

const TextUnderlineMarkSpec: MarkSpec = {
  parseDOM: [
    { tag: 'u' },
    {
      getAttrs: (value) => {
        return value === 'underline' && null;
      },
      style: 'text-decoration-line'
    },
    {
      getAttrs: (value) => {
        return value === 'underline' && null;
      },
      style: 'text-decoration'
    }
  ],

  toDOM() {
    return ['u', 0];
  }
};

export default TextUnderlineMarkSpec;
