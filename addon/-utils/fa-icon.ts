/**
 * Build an Element containing an FontAwesome icon.
 * @faIcon
 * @param {string} name - Name of the icon in FontAwesome (eg: heading, search)
 */
export default (name: string): object => {
  const iconContainer = document.createElement('span');
  iconContainer.setAttribute('class', 'prosemirror-editor__menu-icon-container');

  const node = document.createElement('i');
  node.setAttribute('class', `fas fa-${name}`);
  iconContainer.appendChild(node);

  return { dom: iconContainer };
};
