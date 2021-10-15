import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import { CheckedElementMixin } from '@anypoint-web-components/anypoint-form-mixins';

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
 * `--anypoint-radio-button-unchecked-color` | Border color of unchecked button | `--anypoint-color-aluminum5`
 * `--anypoint-radio-button-unchecked-background-color` | Unchecked button background color | `transparent`
 * `--anypoint-radio-button-checked-color` | Checked button selection color | `--anypoint-color-coreBlue3`
 * `--anypoint-radio-button-checked-inner-background-color` | Checked button inner circle background color | `#fff`
 * `--anypoint-radio-button-label-spacing` | Spacing between the label and the button | `5px`
 * `--anypoint-radio-button-label-color` | Label color | `--primary-text-color`
 * `--anypoint-radio-button-label` | A mixin applied to the internal label | `{}`
 * 
 * @deprecated Migrate the `@anypoint-web-components/awc`
 */
export declare class AnypointRadioButtonElement extends CheckedElementMixin(LitElement) {
  onchange: EventListener;

  get styles(): CSSResult;

  render(): TemplateResult;
  /**
   * Controls whether this button is in checked state.
   * @attribute
   */
  checked: boolean;
  /**
   * Controls whether this button is in disabled state.
   * @attribute
   */
  disabled: boolean;

  connectedCallback(): void;

  disconnectedCallback(): void;

  _updateCheckedAria(checked?: boolean): void;

  /**
   * Handler for keyboard down event
   */
  _keyDownHandler(e: KeyboardEvent): void;

  /**
   * Handler for pointer click event
   */
  _clickHandler(): void;

  /**
   * Performs a click operation in next macro-task.
   */
  _asyncClick(): void;

  /**
   * Handles `disable` property state change and manages `aria-disabled`
   * and `tabindex` attributes
   */
  _disabledChanged(disabled: boolean): void;
}
