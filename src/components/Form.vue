<template>
  <form class="cap-form" @submit.prevent="onSubmit">
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

<style lang="scss" scoped>
.cap-form {
  /deep/ .cap-form-fieldset {
    display: block;
    min-width: 0;
    padding: 0;
    margin-bottom: 12px;
    border: 0;

    > label {
      display: block;
      padding-left: 36px;
      margin-bottom: 12px;
      line-height: 24px;
      cursor: pointer;

      .text-negative {
        display: block;
      }
    }

    .form-checkbox {
      float: left;
      margin-right: 12px;
      margin-left: -36px;
      vertical-align: middle;
    }
  }

  /deep/ .cap-form-fieldset > legend,
  /deep/ span.form-label {
    display: block;
    margin-top: 7px;
    margin-bottom: 3px;
    font-size: 15px;
  }

  /deep/ .form-fieldset.no-line {
    padding: 0;

    legend {
      padding: 12px 0 0 12px;
      border-bottom: none;
    }
  }
}
</style>
