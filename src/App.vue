<template>
  <div id="app">
    <h1>vue-form</h1>

    <v-form :form="form">
      <v-input name="test1" />
    </v-form>
  </div>
</template>

<script>

import Form from 'components/Form.vue';
import Input from 'components/Input.vue';
import { initFields } from 'utils/form.js';

export default {
  name: 'app',

  data() {
    return {
      form: initFields([
        'test1',
      ]),
    };
  },

  components: {
    Form,
    Input,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
