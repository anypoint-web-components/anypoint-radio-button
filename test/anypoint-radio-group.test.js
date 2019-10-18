import { fixture, assert, nextFrame, html } from '@open-wc/testing';
import '../anypoint-radio-group.js';
import '../anypoint-radio-button.js';

import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';

describe('<anypoint-radio-group>', function() {
  async function basicFixture() {
    return (await fixture(html`<anypoint-radio-group>
       <anypoint-radio-button name="a">Apple</anypoint-radio-button>
       <anypoint-radio-button name="b">Banana</anypoint-radio-button>
       <anypoint-radio-button name="c">Orange</anypoint-radio-button>
    </anypoint-radio-group>`));
  }

  async function selectedFixture() {
    return (await fixture(html`<anypoint-radio-group>
      <anypoint-radio-button name="a" checked>Apple</anypoint-radio-button>
      <anypoint-radio-button name="b">Banana</anypoint-radio-button>
      <anypoint-radio-button name="c">Orange</anypoint-radio-button>
    </anypoint-radio-group>`));
  }

  async function ignoredFixture() {
    return (await fixture(html`<anypoint-radio-group>
       <anypoint-radio-button checked name="a">Apple</anypoint-radio-button>
       <anypoint-radio-button name="b">Banana</anypoint-radio-button>
       <anypoint-radio-button name="c">Orange</anypoint-radio-button>
       <div name="d">Strawberry</div>
    </anypoint-radio-group>`));
  }

  async function mixedFixture() {
    return (await fixture(html`<anypoint-radio-group>
       <anypoint-radio-button checked name="a">Apple</anypoint-radio-button>
       <anypoint-radio-button name="b">Banana</anypoint-radio-button>
       <anypoint-radio-button name="c">Orange</anypoint-radio-button>
       <input type="radio" name="d"/>
    </anypoint-radio-group>`));
  }

  async function selected2Fixture() {
    return (await fixture(html`<anypoint-radio-group selected="1">
       <anypoint-radio-button name="a">Apple</anypoint-radio-button>
       <anypoint-radio-button name="b">Banana</anypoint-radio-button>
       <anypoint-radio-button name="c">Orange</anypoint-radio-button>
    </anypoint-radio-group>`));
  }

  async function multiCheckedFixture() {
    return (await fixture(html`<anypoint-radio-group>
       <anypoint-radio-button checked name="a">Apple</anypoint-radio-button>
       <anypoint-radio-button name="b">Banana</anypoint-radio-button>
       <anypoint-radio-button checked name="c">Orange</anypoint-radio-button>
    </anypoint-radio-group>`));
  }

  async function attrForSelectedFixture() {
    return (await fixture(html`<anypoint-radio-group selected="banana" attrforselected="label">
      <anypoint-radio-button name="a" label="apple">Apple</anypoint-radio-button>
      <anypoint-radio-button name="b" label="banana">Banana</anypoint-radio-button>
      <anypoint-radio-button name="c" label="orange">Orange</anypoint-radio-button>
    </anypoint-radio-group>`));
  }

  async function disabledFixture() {
    return (await fixture(html`<anypoint-radio-group disabled>
      <anypoint-radio-button>Apple</anypoint-radio-button>
      <anypoint-radio-button>Banana</anypoint-radio-button>
      <anypoint-radio-button>Orange</anypoint-radio-button>
    </anypoint-radio-group>`));
  }

  describe('Selection states', () => {
    it('sets selected property when selection changes', async () => {
      const element = await basicFixture();
      const node = element.querySelector('anypoint-radio-button');
      MockInteractions.tap(node);
      assert.equal(element.selected, 0);
    });

    it('sets selected property from checked attribute', async () => {
      const element = await selectedFixture();
      assert.equal(element.selected, 0);
    });

    it('sets selected element checked', async () => {
      const element = await selected2Fixture();
      assert.equal(element.selected, 1);
      const node = element.querySelector('anypoint-radio-button[name="b"]');
      assert.isTrue(node.checked);
    });

    it('only selects last checked node', async () => {
      const element = await multiCheckedFixture();
      assert.equal(element.selected, 2);
      const node = element.querySelector('anypoint-radio-button[name="c"]');
      assert.isTrue(node.checked);

      const oldNode = element.querySelector('anypoint-radio-button[name="a"]');
      assert.isFalse(oldNode.checked);
    });

    it('selects from attribute', async () => {
      const element = await attrForSelectedFixture();
      const node = element.querySelector('anypoint-radio-button[name="b"]');
      assert.isTrue(node.checked);
    });

    it('deselects old node', async () => {
      const element = await selectedFixture();
      const oldSelected = element.querySelector('anypoint-radio-button[name="a"]');
      assert.isTrue(oldSelected.checked, 'old selected is initially selected');
      const node = element.querySelector('anypoint-radio-button[name="c"]');
      MockInteractions.tap(node);
      assert.isFalse(oldSelected.checked, 'removes selection');
    });

    it('selects new node', async () => {
      const element = await selectedFixture();
      const node = element.querySelector('anypoint-radio-button[name="c"]');
      MockInteractions.tap(node);
      assert.isTrue(node.checked);
    });

    it('selected property changes after selection change', async () => {
      const element = await selectedFixture();
      const node = element.querySelector('anypoint-radio-button[name="c"]');
      MockInteractions.tap(node);
      assert.equal(element.selected, 2);
    });

    it('accespts dynamic node', async () => {
      const element = await selectedFixture();
      const node = document.createElement('anypoint-radio-button');
      node.name = 'd';
      node.innerText = 'Dino';
      element.appendChild(node);
      await nextFrame();
      MockInteractions.tap(node);
      assert.equal(element.selected, 3);
    });

    it('ignores nodes that are not role radio', async () => {
      const element = await ignoredFixture();
      const node = element.querySelector('div[name="d"]');
      MockInteractions.tap(node);
      assert.equal(element.selected, 0);
    });

    it('ignores removed nodes', async () => {
      const element = await basicFixture();
      const node = element.querySelector('anypoint-radio-button[name="a"]');
      element.removeChild(node);
      await nextFrame();
      MockInteractions.tap(node);
      assert.isUndefined(element.selected);
    });

    it('ignores nodes with changed role', async () => {
      const element = await basicFixture();
      const node = element.querySelector('anypoint-radio-button[name="a"]');
      node.setAttribute('role', 'input');
      await nextFrame();
      MockInteractions.tap(node);
      assert.isUndefined(element.selected);
      assert.equal(element.selectedItem, null);
    });

    it('removes selection when removing selected node', async () => {
      const element = await selectedFixture();
      const node = element.querySelector('anypoint-radio-button[name="a"]');
      element.removeChild(node);
      await nextFrame();
      assert.isUndefined(element.selected);
      assert.equal(element.selectedItem, null);
    });

    it('accepts input radio', async () => {
      const element = await mixedFixture();
      const node = element.querySelector('input[name="d"]');
      MockInteractions.tap(node);
      assert.equal(element.selected, 3);
      assert.equal(element.selectedItem, node);
    });

    it('focuses on first item when no selection', async () => {
      const element = await basicFixture();
      MockInteractions.focus(element);
      const node = element.querySelector('anypoint-radio-button[name="a"]');
      assert.equal(document.activeElement, node);
    });

    it('focuses on selected item when selection', async () => {
      const element = await selected2Fixture();
      MockInteractions.focus(element);
      const node = element.querySelector('anypoint-radio-button[name="b"]');
      assert.equal(document.activeElement, node);
    });

    it('moves focus to next item when arrow right', async () => {
      const element = await selected2Fixture();
      MockInteractions.focus(element);
      MockInteractions.keyDownOn(element, 39, [], 'ArrowRight');
      const node = element.querySelector('anypoint-radio-button[name="c"]');
      assert.equal(document.activeElement, node);
    });

    it('moves focus to next item when arrow down', async () => {
      const element = await selected2Fixture();
      MockInteractions.focus(element);
      MockInteractions.keyDownOn(element, 40, [], 'ArrowDown');
      const node = element.querySelector('anypoint-radio-button[name="c"]');
      assert.equal(document.activeElement, node);
    });

    it('moves focus to previous item when arrow left', async () => {
      const element = await selected2Fixture();
      MockInteractions.focus(element);
      MockInteractions.keyDownOn(element, 37, [], 'ArrowLeft');
      const node = element.querySelector('anypoint-radio-button[name="a"]');
      assert.equal(document.activeElement, node);
    });

    it('moves focus to previous item when arrow up', async () => {
      const element = await selected2Fixture();
      MockInteractions.focus(element);
      MockInteractions.keyDownOn(element, 38, [], 'ArrowUp');
      const node = element.querySelector('anypoint-radio-button[name="a"]');
      assert.equal(document.activeElement, node);
    });
  });

  describe('disabled state', () => {
    it('disables children when disabled', async () => {
      const element = await basicFixture();
      element.disabled = true;
      const nodes = element.querySelectorAll('*');
      for (let i = 0; i < nodes.length; i++) {
        assert.isTrue(nodes[i].disabled);
      }
    });

    it('enables children when enabled', async () => {
      const element = await disabledFixture();
      element.disabled = false;
      const nodes = element.querySelectorAll('*');
      for (let i = 0; i < nodes.length; i++) {
        assert.isFalse(nodes[i].disabled);
      }
    });

    it('disables children when initializing', async () => {
      const element = await disabledFixture();
      const nodes = element.querySelectorAll('*');
      for (let i = 0; i < nodes.length; i++) {
        assert.isTrue(nodes[i].disabled);
      }
    });

    it('ignores selection when disabled', async () => {
      const element = await disabledFixture();
      const node = element.querySelector('anypoint-radio-button');
      assert.isTrue(node.disabled);
      MockInteractions.tap(node);
      assert.isFalse(node.checked);
    });
  });

  describe('_isRadioButton()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('return true when has radio role', () => {
      const node = document.createElement('span');
      node.setAttribute('role', 'radio');
      const result = element._isRadioButton(node);
      assert.isTrue(result);
    });

    it('return true for radio input', () => {
      const node = document.createElement('input');
      node.type = 'radio';
      const result = element._isRadioButton(node);
      assert.isTrue(result);
    });

    it('resturns false for other roles', () => {
      const node = document.createElement('span');
      node.setAttribute('role', 'display');
      const result = element._isRadioButton(node);
      assert.isFalse(result);
    });

    it('resturns false for other inputs', () => {
      const node = document.createElement('input');
      node.type = 'checkbox';
      const result = element._isRadioButton(node);
      assert.isFalse(result);
    });

    it('resturns false for nodes other than element', () => {
      const node = document.createComment('test');
      const result = element._isRadioButton(node);
      assert.isFalse(result);
    });
  });

  describe('a11y', () => {
    it('has role', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('role'), 'radiogroup');
    });

    it('is accessible when no selection', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element);
    });

    it('is accessible when selected', async () => {
      const element = await selectedFixture();
      await assert.isAccessible(element);
    });
  });
});
