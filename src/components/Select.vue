<template>
  <div v-if="!field.isHidden" :data-test="name" class="form-input-set" :class="{ 'decoration-negative': isError }">
    <label :for="'select_' + name">
      <span v-html="legend"></span>
      <transition name="slide">
        <span v-if="isError" style="display: block; font-size: 18px" class="text-negative" v-html="internalHint"></span>
      </transition>
    </label>
    <select :id="'select_' + name" ref="select" :value="internalValue" class="form-select" v-bind="$attrs" :disabled="isDisabled" @change="checkValue()">
      <slot
        ><option v-for="item in field.items" :key="item.id" :value="item.id">{{ translate(item.label) }}</option></slot
      >
    </select>
  </div>
</template>

<script>
import { emptyFormElement } from '@/utils/form';

export default {
  name: 'FormSelect',

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
      return !this.field.isValid && this.field.isChecked;
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
      this.internalValue = this.field.value || this.internalValue || (this.field.items && this.field.items.length ? this.field.items[0].id : null);
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
      if (this.field.hasFocus && this.$refs.select) {
        this.field.hasFocus = false;
        this.$refs.select.focus();
      }
    },

    checkValue() {
      this.internalValue = this.$refs.select.value;
      let isValid = true;
      if (this.required && !this.internalValue.length) {
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

    translate(msg) {
      if (this.$i18n.te(msg)) return this.$i18n.t(msg);
      return msg;
    },
  },
};
</script>
