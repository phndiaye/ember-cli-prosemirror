import MarkSpec from 'prosemirror-model';

const TextStrikethroughMarkSpec: MarkSpec = {
  parseDOM: [
    { tag: 's' },
    {
      style: 'text-decoration-line',
      getAttrs: value => {
        return value === 'line-through' && null;
      },
    },
    {
      style: 'text-decoration',
      getAttrs: value => {
        return value === 'line-through' && null;
      },
    },
  ],
  toDOM() {
    return ['s', 0];
  },
};

export default TextStrikethroughMarkSpec;
