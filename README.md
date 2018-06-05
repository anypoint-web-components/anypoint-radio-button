# `<anypoint-radio-button>`

Anypoint styled radio button

## Usage

Install element:

```
npm i --save @anypoint-components/anypoint-radio-button
```

Import into your app:

```html
<script type="module" src="node_modules/@anypoint-components/anypoint-radio-button.js"></script>
```

Or into another component

```javascript
import '@anypoint-components/anypoint-radio-button.js';
```

Use it:

```html
<paper-radio-group selectable="anypoint-radio-button">
 <anypoint-radio-button name="a">Apple</anypoint-radio-button>
 <anypoint-radio-button name="b">Banana</anypoint-radio-button>
 <anypoint-radio-button name="c">Orange</anypoint-radio-button>
</paper-radio-group>
```

## Development

### Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

### Viewing Your Element

```
$ polymer serve
```

### Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
