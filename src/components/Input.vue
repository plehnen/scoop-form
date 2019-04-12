<template>
  <div v-if="!field.isHidden" :data-test="name" class="form-input-set" :class="{ 'decoration-negative': isError }">
    <label :for="'input_' + name">
      <span v-html="legend"></span>
      <transition name="slide">
        <span v-if="isError" style="display: block; font-size: 18px" class="text-negative" v-html="translate(internalHint)"></span>
      </transition>
    </label>
    <input
      :id="'input_' + name"
      ref="input"
      :value="internalValue"
      class="form-input"
      v-bind="$attrs"
      :disabled="isDisabled"
      @input="updateValue($event.target.value)"
      @change="checkValue"
    />
  </div>
</template>

<script>
import { emptyFormElement } from '../utils/form';

export default {
  name: 'FormInput',

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

    value: {
      type: String,
      required: false,
      default: '',
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
      isBeingChanged: false,
      internalHint: null,
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

    isError() {
      return !this.isBeingChanged && !this.field.isValid && this.field.isChecked;
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
      this.internalValue = this.field.value || this.internalValue;
      this.field.setInvalid = this.setInvalid;
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
    translate(msg) {
      if (this.$i18n.te(msg)) return this.$i18n.t(msg);
      return msg;
    },

    setInvalid(msg) {
      this.internalHint = msg || this.hint;
      this.field.isValid = false;
    },

    checkFocus() {
      if (this.field.hasFocus && this.$refs.input) {
        this.field.hasFocus = false;
        this.$refs.input.focus();
      }
    },

    updateValue(val) {
      this.isBeingChanged = true;
      this.internalValue = val;
      this.$emit('input', this.internalValue);
    },

    checkValue() {
      this.isBeingChanged = false;
      this.field.filters.forEach(filter => {
        this.internalValue = filter(this.internalValue, this.state);
      });

      let isValid = true;
      if (this.required && (!this.internalValue || !this.internalValue.length)) {
        isValid = false;
      }
      this.internalHint = this.hint;
      // eslint-disable-next-line no-bitwise
      isValid &= !this.field.validators.some(v => {
        const error = !v.handler(this.internalValue, this.state);
        if (error && v.hint) this.internalHint = v.hint;
        return error;
      });
      this.$set(this.field, 'isValid', isValid);
      this.$set(this.field, 'value', this.internalValue);
      this.$emit('input', this.internalValue);
    },
  },
};
</script>
