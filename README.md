# scoop-form

A collection of form components and utils for validation and handling basic a11y tasks, such as focussing the first erroneous field or placing the error message inside the label.

This software is hardly bound to our clients needs.

## Example

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

  methods() {
    onSubmit({ values, form, isValid }) {
      // ...
    },
  },
};
</script>
```

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

### Manually modify dist file

Because the utils are also imported within the components, we have some kind of circular dependency here. I don't know how to solve this yet, so before the `npm publish` command you have to manually adjust the rendered file:

- replace the names `emptyFormElement$1` (etc) with the real names (e.g. `emptyFormElement`)
- in the bottom replace the names as well and remove the `as emptyFormElement` suffix

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
