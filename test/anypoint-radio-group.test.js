import { fixture, assert, nextFrame } from '@open-wc/testing';
import '../anypoint-radio-button.js';
import '../anypoint-radio-group.js';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';

describe('<anypoint-radio-group>', function() {
  async function basicFixture() {
    return (await fixture(`<anypoint-radio-group selectable="anypoint-radio-button">
       <anypoint-radio-button name="a">Apple</anypoint-radio-button>
       <anypoint-radio-button name="b">Banana</anypoint-radio-button>
       <anypoint-radio-button name="c">Orange</anypoint-radio-button>
    </anypoint-radio-group>`));
  }

  async function selectedFixture() {
    return (await fixture(`<anypoint-radio-group selectable="anypoint-radio-button">
       <anypoint-radio-button checked name="a">Apple</anypoint-radio-button>
       <anypoint-radio-button name="b">Banana</anypoint-radio-button>
       <anypoint-radio-button name="c">Orange</anypoint-radio-button>
    </anypoint-radio-group>`));
  }

  async function ignoredFixture() {
    return (await fixture(`<anypoint-radio-group selectable="anypoint-radio-button">
       <anypoint-radio-button checked name="a">Apple</anypoint-radio-button>
       <anypoint-radio-button name="b">Banana</anypoint-radio-button>
       <anypoint-radio-button name="c">Orange</anypoint-radio-button>
       <div name="d">Strawberry</div>
    </anypoint-radio-group>`));
  }

  async function mixedFixture() {
    return (await fixture(`<anypoint-radio-group selectable="anypoint-radio-button">
       <anypoint-radio-button checked name="a">Apple</anypoint-radio-button>
       <anypoint-radio-button name="b">Banana</anypoint-radio-button>
       <anypoint-radio-button name="c">Orange</anypoint-radio-button>
       <label><input type="radio" name="d"/>Strawberry</label>
    </anypoint-radio-group>`));
  }

  describe('Selection states', () => {
    it('sets selected property when selection changes', async () => {
      const element = await basicFixture();
      const node = element.querySelector('anypoint-radio-button');
      MockInteractions.tap(node);
      assert.equal(element.selected, node);
    });

    it('deselects old node', async () => {
      const element = await selectedFixture();
      const oldSelected = element.querySelector('anypoint-radio-button[name="a"]');
      const node = element.querySelector('anypoint-radio-button[name="c"]');
      MockInteractions.tap(node);
      assert.isFalse(oldSelected.checked);
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
      assert.equal(element.selected, node);
    });

    it('accespts dynamic node', async () => {
      const element = await selectedFixture();
      const node = document.createElement('anypoint-radio-button');
      node.name = 'd';
      node.innerText = 'Dino';
      element.appendChild(node);
      await nextFrame();
      MockInteractions.tap(node);
      assert.equal(element.selected, node);
    });

    it('ignores nodes that are not role radio', async () => {
      const element = await ignoredFixture();
      const node = element.querySelector('div[name="d"]');
      MockInteractions.tap(node);
      assert.isUndefined(element.selected);
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
    });

    it('removes selection when removing selected node', async () => {
      const element = await selectedFixture();
      const node = element.querySelector('anypoint-radio-button[name="a"]');
      element.removeChild(node);
      await nextFrame();
      assert.isUndefined(element.selected);
    });

    it('accepts input radio', async () => {
      const element = await mixedFixture();
      const node = element.querySelector('input[name="d"]');
      MockInteractions.tap(node);
      assert.equal(element.selected, node);
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
