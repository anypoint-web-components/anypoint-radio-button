[![Published on NPM](https://img.shields.io/npm/v/@anypoint-web-components/anypoint-radio-button.svg)](https://www.npmjs.com/package/@anypoint-web-components/anypoint-radio-button)

[![Build Status](https://travis-ci.org/anypoint-web-components/anypoint-radio-button.svg?branch=stage)](https://travis-ci.org/anypoint-web-components/anypoint-radio-button)

# `<anypoint-radio-button>`

Accessible radio button and radio buttons group for Anypoint platform

## Usage

```
npm i --save @anypoint-web-components/anypoint-radio-button
```

### In an HTML file

```html
<html>
  <head>
    <script type="module">
      import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-button.js';
      import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-group.js';
    </script>
  </head>
  <body>
    <anypoint-radio-group selectable="anypoint-radio-button">
       <anypoint-radio-button name="a">Apple</anypoint-radio-button>
       <anypoint-radio-button name="b">Banana</anypoint-radio-button>
       <anypoint-radio-button name="c">Orange</anypoint-radio-button>
    </anypoint-radio-group>
  </body>
</html>
```

## Development

```sh
git clone https://github.com/anypoint-web-components/anypoint-radio-button
cd anypoint-radio-button
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
