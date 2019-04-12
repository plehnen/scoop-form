<template>
  <fieldset v-if="!field.isHidden" :data-test="name" class="cap-form-fieldset">
    <legend v-html="legend"></legend>
    <label>
      <transition name="slide">
        <span v-if="!field.isValid && field.isChecked" class="text-negative" v-html="hint"></span>
      </transition>
      <input
        ref="input"
        :checked="internalValue"
        type="checkbox"
        class="form-checkbox"
        v-bind="$attrs"
        :name="name"
        :disabled="isDisabled"
        @change="checkValue()"
      />
      <slot />
    </label>
  </fieldset>
</template>

<script>
import { emptyFormElement } from '../utils/form';

export default {
  name: 'FormCheckbox',

  inheritAttrs: false,

  inject: {
    parentForm: {
      from: 'parentForm',
      default: null,
    },
  },

  props: {
    name: {
      type: String,
      required: false,
      default: null,
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

    value: {
      type: Boolean,
      required: false,
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
    return {
      internalValue: this.value,
    };
  },

  computed: {
    state() {
      if (this.parentForm) return this.parentForm.form;
      return this.form;
    },

    field() {
      if (!this.state || !this.name || !this.state[this.name]) return emptyFormElement();
      return this.state[this.name];
    },

    isDisabled() {
      return this.state.isDisabled;
    },
  },

  watch: {
    'field.hasFocus': 'checkFocus',
  },

  mounted() {
    if (!this.field.isHidden) {
      this.field.checkValidation = this.checkValue;
      this.$set(this.field, 'name', this.name);
      this.$nextTick(() => {
        this.checkValue();
        this.checkFocus();
        this.field.isInit = true;
        if (this.field.promise) this.field.resolve();
      });
    }
  },

  methods: {
    checkFocus() {
      if (this.field.hasFocus && this.$refs.input) {
        this.field.hasFocus = false;
        this.$refs.input.focus();
      }
    },

    checkValue() {
      this.internalValue = this.$refs.input.checked;
      this.$set(this.field, 'isValid', !this.required || this.internalValue);
      this.$set(this.field, 'value', this.internalValue);
      this.$emit('input', this.internalValue);
    },
  },
};
</script>
