import MarkSpec from 'prosemirror-model';

const TextStrikethroughMarkSpec: MarkSpec = {
  parseDOM: [
    { tag: 's' },
    {
      getAttrs: (value) => {
        return value === 'line-through' && null;
      },
      style: 'text-decoration-line'
    },
    {
      getAttrs: (value) => {
        return value === 'line-through' && null;
      },
      style: 'text-decoration'
    }
  ],
  toDOM() {
    return ['s', 0];
  }
};

export default TextStrikethroughMarkSpec;
