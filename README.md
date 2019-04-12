# scoop-form

A collection of form components and utils for validation and handling basic a11y tasks, such as focussing the first erroneous field or placing the error message inside the label.

This software is hardly bound to our clients needs.

## Install

```bash
yarn add scoop-form
```

## Basic example

```vue
<template>
  <VForm :form="myForm" @submit="onSubmit">
    <VInput name="input1" :required="true" hint="Err msg" placeholder="..." legend="Label xyz" />
  </VForm>
</template>

<script>
import { Form, Input, initFields } from 'scoop-form';

export default {
  name: 'Example',

  components: {
    Form,
    Input,
  },

  data() {
    return {
      myForm: initFields({ name: 'input1' }),
    };
  },

  methods: {
    onSubmit({ values, form, isValid }) {
      // ...
    },
  },
};
</script>
```

---

## Project setup

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn dev
```

### Compiles for npm

```bash
yarn run build:npm
```

### Publish on npm

```bash
npm publish --access public
```

### Run your tests

```bash
yarn run test:e2e
```

### Lints and fixes files

```bash
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
