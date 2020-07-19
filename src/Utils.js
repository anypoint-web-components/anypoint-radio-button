/**
 * Tests if given node is a radio button.
 * @param {Node} node A node to test
 * @return {boolean} True if the node has "radio" role or is a button with
 * "radio" type.
 */
export function isRadioButton(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  const typedElement = /** @type HTMLElement */ (node);
  if (typedElement.getAttribute('role') === 'radio') {
    return true;
  }
  const typedInput = /** @type HTMLInputElement */ (typedElement);
  if (typedInput.localName === 'input' && typedInput.type === 'radio') {
    return true;
  }
  return false;
}
