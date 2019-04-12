<template>
  <fieldset v-if="!field.isHidden" :data-test="name" class="cap-form-fieldset">
    <legend v-html="legend"></legend>
    <label v-for="(item, index) in field.items" :key="name + '_' + index" :data-test="name + '_' + index">
      <transition name="slide">
        <span v-if="field.isChecked && isError(index)" class="text-negative" v-html="item.hint ? item.hint : hint"></span>
      </transition>
      <input ref="input" :checked="internalValues[index]" type="checkbox" class="form-checkbox" @change="checkValue(index)" />
      <span v-html="item.label"></span>
    </label>
  </fieldset>
</template>

<script>
import { emptyFormElement } from '../utils/form';

export default {
  name: 'FormMulticheckbox',

  inject: {
    parentForm: {
      from: 'parentForm',
      default: null,
    },
  },

  props: {
    name: {
      type: String,
      required: true,
    },

    legend: {
      type: String,
      required: false,
      default: null,
    },

    hint: {
      type: String,
      required: false,
      default: null,
    },

    required: {
      type: Boolean,
      required: false,
    },

    form: {
      type: Object,
      required: false,
      default: null,
    },
  },

  data() {
    const state = this.parentForm ? this.parentForm.form : this.form;
    let { items } = state[this.name];
    if (!Array.isArray(items)) items = [];
    items.forEach((item, index) => {
      if (typeof item === 'string') {
        items[index] = { label: item };
      }
    });
    return {
      internalValues: items.map(i => !!i.value),
      internalErrors: Array(items.length).fill(false),
      items,
    };
  },

  computed: {
    state() {
      if (this.parentForm) return this.parentForm.form;
      return this.form;
    },

    field() {
      if (!this.state || !this.state[this.name]) return emptyFormElement();
      return this.state[this.name];
    },
  },

  watch: {
    'field.hasFocus': 'checkFocus',
  },

  mounted() {
    if (!this.field.isHidden) {
      this.field.checkValidation = this.checkValidation;
      this.$set(this.field, 'name', this.name);
      this.checkValidation();
      this.checkFocus();
      this.field.isInit = true;
      if (this.field.promise) this.field.resolve();
    }
  },

  methods: {
    isError(index) {
      return this.internalErrors[index];
    },

    checkValue(index) {
      this.internalValues[index] = this.$refs.input[index].checked;
      this.checkValidation();
    },

    checkValidation() {
      let isValid = true;
      const values = [];
      this.field.items.forEach((item, index2) => {
        values.push(this.internalValues[index2]);
        if ((this.required || item.required || (item.required !== false && this.field.required)) && !this.internalValues[index2]) {
          isValid = false;
          this.$set(this.internalErrors, index2, true);
        } else {
          this.$set(this.internalErrors, index2, false);
        }
      });
      this.$set(this.field, 'value', values);
      this.$set(this.field, 'isValid', isValid);
    },

    checkFocus() {
      if (this.field.hasFocus && this.$refs.input) {
        this.field.hasFocus = false;
        this.$refs.input[this.internalErrors.findIndex(e => e === true)].focus();
      }
    },
  },
};
</script>
