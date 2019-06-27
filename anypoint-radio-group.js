/**
 * A web component that groups custom radio buttons and handles selection inside
 * the group.
 *
 * Requirements for children:
 * - must have role="radio" attribute
 * - must have name attribute
 * - radio state change must be notified via `change` event.
 *
 * Radio buttons with the same name inside their group will have single selection.
 * This means when selecting a radio button any other currently selected button
 * will be deselected.
 *
 * Also. when initializing the component, only last selected component keeps the
 * selection.
 * When new checked radio button is inserted into the group the selection is passed to the newly
 * arriving element.
 *
 * This behavior is consistent with native DOM API.
 *
 * The group element exposes `selected` property that holds a reference to
 * currently selected radio button.
 *
 * Example
 *
 * ```
 * <anypoint-radio-group>
 *  <anypoint-radio-button name="option"></anypoint-radio-button>
 *  <other-control role="button" name="option" checked></other-control>
 * </anypoint-radio-group>
 * ```
 *
 * @customElement
 * @extends HTMLElement
 */
class AnypointRadioGroup extends HTMLElement {
  /**
   * @return {Node|undefined} Currently selected radio button.
   */
  get selected() {
    return this._selected;
  }
  /**
   * @return {NodeList} List of radio button nodes.
   */
  get elements() {
    return this.querySelectorAll('[role="radio"], input[type="radio"]');
  }

  constructor() {
    super();
    this._nodesChanged = this._nodesChanged.bind(this);
    this._radioAction = this._radioAction.bind(this);

    this.style.display = 'inline-block';
    this.style.verticalAlign = 'middle';
  }

  connectedCallback() {
    const config = {
      attributes: true,
      childList: true,
      subtree: true
    };
    this._observer = new MutationObserver(this._nodesChanged);
    this._observer.observe(this, config);
    this._discoverNodes();
  }

  disconnectedCallback() {
    this._observer.disconnect();
    this._observer = null;
    this._removeListeners();
  }
  /**
   * Processes mutations to the light DOM of this element.
   * Processes added and removed nodes and changes to attributes.
   * @param {Array<MutationRecord>} changes List of changes discovered by
   * `MutationObserver`
   */
  _nodesChanged(changes) {
    const record = changes[0];
    switch (record.type) {
      case 'attributes':
        this._processNodeAttributeChange(record);
        break;
      case 'childList':
        this._processAddedNodes(record.addedNodes);
        this._processRemovedNodes(record.removedNodes);
        this._manageNodesSelection(record.addedNodes);
        break;
    }
  }
  /**
   * This to be run when element is inserted into the DOM.
   * It discovers radio buttons in light DOM and manages the sate.
   */
  _discoverNodes() {
    const nodes = this.elements;
    if (nodes.length) {
      this._processAddedNodes(nodes);
      this._manageNodesSelection(nodes);
    }
  }
  /**
   * Function that manages attribute change.
   * If the changed attribute is `role` with value `radio` then the node is processed
   * as a button and is added or removed from tollection.
   * @param {MutationRecord} record A MutationRecord received from MutationObserver
   * callback.
   */
  _processNodeAttributeChange(record) {
    if (record.attributeName !== 'role') {
      return;
    }
    const target = record.target;
    if (target.getAttribute('role') === 'radio') {
      this._processAddedNodes([target]);
    } else {
      this._nodeRemoved(target);
    }
  }
  /**
   * Processes new and existing nodes and makes single selection from multiple selected
   * radio buttons. If arriving `nodes` has selected nodes the last selected node in
   * the selection keeps the selection.
   *
   * @param {NodeList?} nodes Optional list of newly added nodes to the light DOM.
   */
  _manageNodesSelection(nodes) {
    let selected = this._lastSelected(nodes);
    const domNodes = this.elements;
    if (!selected) {
      selected = this._lastSelected(domNodes);
    }
    if (!selected) {
      return;
    }
    this._selected = selected;
    for (let i = domNodes.length - 1; i >= 0; i--) {
      const node = domNodes[i];
      if (!this._isRadioButton(node)) {
        continue;
      }
      if (node.disabled || !node.checked) {
        continue;
      }
      if (node !== selected && node.checked) {
        node.checked = false;
      }
    }
  }
  /**
   * Tests if given node is a radio button.
   * @param {Node} node A node to test
   * @return {Boolean} True if the node has "radio" role or is a button with
   * "radio" type.
   */
  _isRadioButton(node) {
    if (node.getAttribute('role') === 'radio') {
      return true;
    }
    if (node.localName === 'input' && node.type === 'radio') {
      return true;
    }
    return false;
  }
  /**
   * @param {NodeList?} nodes Optional list of nodes to check for selection.
   * @return {Node} Last selected node or undefined when no selection is detected.
   */
  _lastSelected(nodes) {
    if (!nodes || !nodes.length) {
      return;
    }
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      if (!this._isRadioButton(node)) {
        continue;
      }
      if (node.disabled || !node.checked) {
        continue;
      }
      return node;
    }
  }
  /**
   * Adds `change` event listener to detected radio buttons.
   * A button is considered as a radio button when its `role` is `radio`.
   *
   * @param {NodeList} nodes List of nodes to process.
   */
  _processAddedNodes(nodes) {
    for (let i = 0, len = nodes.length; i < len; i++) {
      const node = nodes[i];
      if (!this._isRadioButton(node)) {
        continue;
      }
      // The event may have been already added when the attribute has been set
      // with the same name again.
      node.removeEventListener('change', this._radioAction);
      node.addEventListener('change', this._radioAction);
    }
  }
  /**
   * Removes event listenensers and possibly clears `selected` when removing nodes from
   * light DOM.
   * @param {NodeList} nodes Nodes to process
   */
  _processRemovedNodes(nodes) {
    for (let i = 0, len = nodes.length; i < len; i++) {
      const node = nodes[i];
      if (!this._isRadioButton(node)) {
        continue;
      }
      this._nodeRemoved(node);
    }
  }
  /**
   * A function to be called when a node from the light DOM has been removed.
   * It clears previosly attached listeners and selection if passed node is
   * currently selected node.
   * @param {Node} node Removed node
   */
  _nodeRemoved(node) {
    node.removeEventListener('change', this._radioAction);
    if (node === this._selected) {
      this._selected = undefined;
    }
  }
  /**
   * Remove listeners from all current `elements`.
   */
  _removeListeners() {
    const nodes = this.elements;
    for (let i = 0, len = nodes.length; i < len; i++) {
      nodes[i].removeEventListener('change', this._radioAction);
    }
  }
  /**
   * Handler for radio's `change` event.
   * @param {Event} e
   */
  _radioAction(e) {
    const target = e.target;
    if (!target.checked) {
      return;
    }
    this._selected = target;
    const name = target.name;
    if (!name) {
      return;
    }
    // Normally you would use querySelectorAll with [name="${name}"]
    // but the name can be anything, including invalid selectors causing
    // error. This queries for all checkboxes and compares names manually.
    const nodes = this.elements;
    for (let i = 0, len = nodes.length; i < len; i++) {
      const node = nodes[i];
      if (node.name === name && node !== target && node.checked) {
        node.checked = false;
      }
    }
  }
}
window.customElements.define('anypoint-radio-group', AnypointRadioGroup);
