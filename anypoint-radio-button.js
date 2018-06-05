import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import * as Polymer from '@polymer/polymer/lib/legacy/class.js';
import {PaperCheckedElementBehavior} from '@polymer/paper-behaviors/paper-checked-element-behavior.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
/**
 * `anypoint-radio-button`
 *
 * Anypoint styled radio button.
 *
 * ## Usage
 *
 * Install element:
 *
 * ```
 * npm i --save @anypoint-components/anypoint-radio-button
 * ```
 *
 * Import into your app:
 *
 * ```html
 * <script type="module" src="node_modules/@anypoint-components/anypoint-radio-button.js"></script>
 * ```
 *
 * Or into another component
 *
 * ```javascript
 * import '@anypoint-components/anypoint-radio-button.js';
 * ```
 *
 * Use it:
 *
 * ```html
 * <paper-radio-group selectable="anypoint-radio-button">
 *  <anypoint-radio-button name="a">Apple</anypoint-radio-button>
 *  <anypoint-radio-button name="b">Banana</anypoint-radio-button>
 *  <anypoint-radio-button name="c">Orange</anypoint-radio-button>
 * </paper-radio-group>
 * ```
 *
 * ### Styling
 *
 * `<anypoint-radio-button>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--anypoint-radio-button-radio-container` | A mixin applied to the internal radio container | `{}`
 * `--anypoint-radio-button-unchecked-color` | Border color of unchecked button | `#989a9b`
 * `--anypoint-radio-button-unchecked-background-color` | Unchecked button background color | `transparent`
 * `--anypoint-radio-button-checked-color` | Checked button selection color | `#00a2df`
 * `--anypoint-radio-button-checked-inner-background-color` | Checked button inner cicrcle background color | `#fff`
 * `--anypoint-radio-button-label-spacing` | Spacing between the label and the button | `5px`
 * `--anypoint-radio-button-label-color` | Label color | `--primary-text-color`
 * `--anypoint-radio-button-label` | A mixin applied to the internal label | `{}`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class AnypointRadioButton extends Polymer.mixinBehaviors([PaperCheckedElementBehavior], PolymerElement) {
  static get template() {
    return html`
      <style>
      :host {
        display: inline-block;
        line-height: 0;
        white-space: nowrap;
        cursor: pointer;
        @apply --anypoint-font-common-base;
      }

      :host(:focus) {
        outline: none;
      }

      #radioContainer {
        @apply --layout-inline;
        @apply --layout-center-center;
        position: relative;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        @apply --anypoint-radio-button-radio-container;
      }

      #offRadio, #onRadio {
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      #offRadio {
        border: 1px solid var(--anypoint-radio-button-unchecked-color, #989a9b);
        background-color: var(--anypoint-radio-button-unchecked-background-color, transparent);
        transition: background-color 0.28s, border-color 0.28s;
      }

      #onRadio {
        background-color: var(--anypoint-radio-button-checked-inner-background-color, #fff);
        -webkit-transform: scale(0);
        transform: scale(0);
        transition: -webkit-transform ease 0.28s;
        transition: transform ease 0.28s;
        will-change: transform;
      }

      :host([checked]) #offRadio {
        border-color: var(--anypoint-radio-button-checked-color, #00a2df);
        background-color: var(--anypoint-radio-button-checked-color, #00a2df);
      }

      :host([checked]) #onRadio {
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
      }

      #radioLabel {
        line-height: normal;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-left: var(--anypoint-radio-button-label-spacing, 5px);
        white-space: normal;
        color: var(--anypoint-radio-button-label-color, var(--primary-text-color));
        @apply --anypoint-radio-button-label;
      }

      :host([checked]) #radioLabel {
        @apply --anypoint-radio-button-label-checked;
      }

      :host-context([dir="rtl"]) #radioLabel {
        margin-left: 0;
        margin-right: var(--anypoint-radio-button-label-spacing, 5px);
      }

      #radioLabel[hidden] {
        display: none;
      }

      :host([disabled]) #offRadio {
        border-color: var(--anypoint-radio-button-unchecked-color, #989a9b);
        opacity: 0.5;
      }

      :host([disabled][checked]) #onRadio {
        background-color: var(--anypoint-radio-button-unchecked-color, #989a9b);
        opacity: 0.5;
      }

      :host([disabled]) #radioLabel {
        opacity: 0.65;
      }
      </style>
      <div id="radioContainer">
        <div id="offRadio"></div>
        <div id="onRadio"></div>
      </div>
      <div id="radioLabel"><slot></slot></div>
    `;
  }
  static get properties() {
    return {
      // Overrides PaperInkyBehavior
      noink: {
        type: Boolean,
        value: true,
        readOnly: true
      }
    };
  }

  static get observers() {
    return [
      '_updateCheckedAria(checked)'
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this._ensureAttribute('tabindex', 0);
    this._ensureAttribute('role', 'radio');
    this._ensureAttribute('aria-checked', 'false');
  }
  // Overrides PaperInkyBehavior
  ensureRipple() {}

  _updateCheckedAria(checked) {
    if (checked === undefined) {
      checked = false;
    }
    this.setAttribute('aria-checked', String(checked));
  }
}

window.customElements.define('anypoint-radio-button', AnypointRadioButton);
