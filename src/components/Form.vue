<template>
  <form @submit.prevent="onSubmit">
    <slot :is-init="isInit" :is-disabled="isDisabled" />
  </form>
</template>

<script>
import { promiseAllFields, checkValidations, resetValidations, focusFirst, getFormValues } from '@/utils/form';

export default {
  name: 'FormBase',

  props: {
    form: {
      type: Object,
      required: true,
    },

    noValidate: {
      type: Boolean,
      required: false,
    },

    disableOnValidSubmit: {
      type: Boolean,
      required: false,
    },

    optionalValidation: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    return {
      isInit: false,
    };
  },

  computed: {
    isDisabled() {
      return this.form.isDisabled;
    },
  },

  mounted() {
    promiseAllFields(this.form).then(() => {
      this.isInit = true;
      resetValidations(this.form);
      focusFirst(this.form);
      this.$emit('init', this.form);
    });
  },

  beforeDestroy() {
    if (this.isInit) {
      resetValidations(this.form);
    }
  },

  methods: {
    onSubmit(event) {
      const isValid = this.noValidate ? false : checkValidations(this.form);

      if (!this.optionalValidation && !isValid) return;
      if (this.disableOnValidSubmit && isValid) this.form.isDisabled = true;

      this.$emit('submit', {
        form: this.form,
        isValid,
        values: getFormValues(this.form),
        event,
      });
    },
  },

  provide() {
    return {
      parentForm: this,
    };
  },
};
</script>
