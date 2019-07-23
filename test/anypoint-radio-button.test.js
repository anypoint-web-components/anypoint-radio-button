import { fixture, assert, aTimeout } from '@open-wc/testing';
import { a11ySuite } from '@advanced-rest-client/a11y-suite/index.js';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../anypoint-radio-button.js';
import '@polymer/iron-test-helpers/mock-interactions.js';

/* global MockInteractions  */

describe('<anypoint-radio-button>', function() {
  async function basicFixture() {
    return (await fixture(`<anypoint-radio-button>Label</anypoint-radio-button>`));
  }

  async function noLabelFixture() {
    return (await fixture(`<anypoint-radio-button>Label</anypoint-radio-button>`));
  }

  async function roleFixture() {
    return (await fixture(`<anypoint-radio-button role="checkbox"></anypoint-radio-button>`));
  }

  async function tabindexFixture() {
    return (await fixture(`<anypoint-radio-button tabindex="-1"></anypoint-radio-button>`));
  }

  async function checkedFixture() {
    return (await fixture(`<anypoint-radio-button checked>Label</anypoint-radio-button>`));
  }

  describe('Basics', () => {
    it('checked is false by defailt', async () => {
      const element = await noLabelFixture();
      assert.isFalse(element.checked);
    });

    it('checked is true from attribute setup', async () => {
      const element = await checkedFixture();
      assert.isTrue(element.checked);
    });

    it('checked set to false sets aria attribute', async () => {
      const element = await checkedFixture();
      element.checked = undefined;
      assert.equal(element.getAttribute('aria-checked'), 'false');
    });

    it('Sets tabindex to -1 when disabled', async () => {
      const element = await checkedFixture();
      element.disabled = true;
      assert.equal(element.getAttribute('tabindex'), '-1');
    });

    it('Restores tabindex when enabled', async () => {
      const element = await checkedFixture();
      element.disabled = true;
      await aTimeout();
      element.disabled = false;
      assert.equal(element.getAttribute('tabindex'), '0');
    });

    it('Won\'t restore button tabindex when manually removed', async () => {
      const element = await checkedFixture();
      element.removeAttribute('tabindex');
      element.disabled = true;
      assert.equal(element.getAttribute('tabindex'), '-1');
      await aTimeout();
      element.disabled = false;
      assert.isFalse(element.hasAttribute('tabindex'));
    });
  });

  describe('No label', () => {
    let element;

    beforeEach(async () => {
      element = await noLabelFixture();
    });

    it('Check button via click', (done) => {
      element.addEventListener('click', function() {
        assert.isTrue(element.getAttribute('aria-checked') === 'true');
        assert.isTrue(element.checked);
        done();
      });
      element.click();
    });

    it('Button cannot be unchecked by click', () => {
      element.checked = true;
      element.click();
      assert.isTrue(element.checked);
    });

    it('Disabled button cannot be clicked', () => {
      element.disabled = true;
      element.click();
      assert.isFalse(element.checked);
    });
  });

  describe('User input', () => {
    let element;

    beforeEach(async () => {
      element = await noLabelFixture();
    });

    it('Handles action for Space key', () => {
      const spy = sinon.spy(element, '_clickHandler');
      MockInteractions.pressSpace(element);
      assert.isTrue(spy.called);
    });

    it('Handles action for Enter key', () => {
      const spy = sinon.spy(element, '_clickHandler');
      MockInteractions.pressEnter(element);
      assert.isTrue(spy.called);
    });

    it('Click checks the control', () => {
      element.click();
      assert.isTrue(element.checked);
    });

    it('Ignores other keys', () => {
      const spy = sinon.spy(element, '_clickHandler');
      MockInteractions.keyDownOn(element, 65, '', 'A');
      assert.isFalse(spy.called);
    });
  });

  describe('a11y', () => {
    a11ySuite('Normal state', '<anypoint-radio-button>Label</anypoint-radio-button>');
    a11ySuite('Disabled state', '<anypoint-radio-button disabled>Label</anypoint-radio-button>');
    a11ySuite('Checked state', '<anypoint-radio-button checked>Label</anypoint-radio-button>');
    a11ySuite('No label', '<anypoint-radio-button></anypoint-radio-button>');
    a11ySuite('Aria label', '<anypoint-radio-button aria-label="Batman">Robin</anypoint-radio-button>');

    it('Sets default role attribute', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('role'), 'radio');
    });

    it('Respects existing role attribute', async () => {
      const element = await roleFixture();
      assert.equal(element.getAttribute('role'), 'checkbox');
    });

    it('Sets default tabindex attribute', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('tabindex'), '0');
    });

    it('Respects existing tabindex attribute', async () => {
      const element = await tabindexFixture();
      assert.equal(element.getAttribute('tabindex'), '-1');
    });
  });
});
