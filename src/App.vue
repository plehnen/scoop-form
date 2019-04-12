<template>
  <div id="app">
    <h1>SCOOP Form</h1>

    <VForm data-test="form2" :form="form2">
      <VInput name="input201" :required="true" hint="ERROR" immediate> </VInput>
    </VForm>

    <hr />

    <VForm data-test="form1" :form="form" optional-validation @submit="onSubmit">
      <VSelect name="select1" legend="Select legend <b>with HTML</b> support" label="Select label <b>with HTML</b> support" hint="Select hint" />

      <VCheckbox
        v-model="test0"
        legend="Terms legend <b>with html</b> support0. HIDDEN"
        :required="true"
        name="check0"
        hint="INVALID HINT <b>with HTML</b> support0"
      >
        Slot-Content <b>with HTML</b> support0
      </VCheckbox>

      <VCheckbox
        v-model="test1"
        legend="Terms legend <b>with html</b> support1. Required. With Model."
        :required="true"
        name="check1"
        hint="INVALID HINT <b>with HTML</b> support1"
      >
        Slot-Content <b>with HTML</b> support1
      </VCheckbox>

      <p data-test="value1">VALUE: {{ test1 }}</p>

      <VCheckbox
        legend="Terms legend <b>with html</b> support2. Required. WITHOUT Model."
        :required="true"
        name="check2"
        hint="INVALID HINT <b>with HTML</b> support2"
      >
        Slot-Content <b>with HTML</b> support2
      </VCheckbox>

      <VCheckbox
        legend="Terms legend <b>with html</b> support3. NOT required. WITHOUT Model."
        :required="false"
        name="check3"
        hint="INVALID HINT <b>with HTML</b> support3"
      >
        Slot-Content <b>with HTML</b> support3
      </VCheckbox>

      <VCheckbox
        v-model="test4"
        legend="Terms legend <b>with html</b> support4. NOT required. With Model."
        :required="false"
        name="check4"
        hint="INVALID HINT <b>with HTML</b> support4"
      >
        Slot-Content <b>with HTML</b> support4
      </VCheckbox>

      <VCheckbox
        v-model="test5"
        legend="Terms legend <b>with html</b> support5. Required. With Model. DEFAULT = TRUE"
        :required="true"
        name="check5"
        hint="INVALID HINT <b>with HTML</b> support5"
      >
        Slot-Content <b>with HTML</b> support5
      </VCheckbox>

      <VCheckbox legend="-" :required="true" name="check6" hint="-">
        IS NOT VISIBLE AT ALL
      </VCheckbox>

      <VCheckbox
        v-model="test6"
        legend="Terms legend <b>with html</b> support6. WITHOUT FORM + NAME"
        :required="true"
        hint="INVALID HINT <b>with HTML</b> support6"
      >
        Slot-Content <b>with HTML</b> support0
      </VCheckbox>

      <p data-test="value6">VALUE: {{ test6 }}</p>

      <VCheckbox :required="true" name="check7" hint="INVALID HINT <b>with HTML</b> support7"> Slot-Content <b>with HTML</b> support7 (no legend) </VCheckbox>

      <VMulticheckbox name="check8" legend="Multicheckbox <b>HTML</b> Legend8" hint="INVALID HINT <b>with HTML</b> multicheckbox" />

      <VMulticheckbox name="check9" legend="Multicheckbox <b>HTML</b> Legend9" hint="INVALID HINT <b>with HTML</b> multicheckbox" />

      <VMulticheckbox name="check10" legend="Multicheckbox <b>HTML</b> via String-Array" hint="INVALID HINT <b>with HTML</b> multicheckbox" />

      <VMulticheckbox name="check11" :required="true" legend="Multicheckbox <b>HTML</b> required via HTML" hint="INVALID HINT <b>with HTML</b> multicheckbox" />

      <VMulticheckbox name="check12" legend="Multicheckbox <b>HTML</b> HIDDEN" hint="INVALID HINT <b>with HTML</b> multicheckbox" />

      <VInput
        v-model="input1"
        name="input1"
        placeholder="max.mustermann@t-online.de"
        legend="Input <b>HTML</b> #1: Required + e-mail validation"
        :required="true"
        hint="Hint <b>with HTML</b> support"
      >
      </VInput>

      <p data-test="value_input1">VALUE: {{ input1 }}</p>

      <VInput
        v-model="input2"
        name="input2"
        placeholder="max.mustermann@t-online.de"
        legend="Input <b>HTML</b> #2: NOT Required but e-mail validation"
        hint="Hint <b>with HTML</b> support"
      >
      </VInput>

      <VInput v-model="input3" name="input3" legend="Input <b>HTML</b> #3: NOT Required but minlength(3) validation" hint="Hint <b>with HTML</b> support">
      </VInput>

      <VInput v-model="input4" name="input4" legend="Input <b>HTML</b> #4: DISABLED" hint="Hint <b>with HTML</b> support"> </VInput>

      <VInput v-model="input5" name="input5" legend="Input <b>HTML</b> #5: combined validation: e-mail and minlength(15)" hint="Hint <b>with HTML</b> support">
      </VInput>

      <VInput v-model="input6" name="input6" legend="Input <b>HTML</b> #6: WITHOUT form!" hint="Hint <b>with HTML</b> support"> </VInput>

      <p data-test="value_input6">VALUE: {{ input6 }}</p>

      <VInput
        v-model="input7"
        name="input7"
        legend="Input <b>HTML</b> #7: combined validation: e-mail and minlength(15) with individual error"
        hint="Hint <b>with HTML</b> support - STANDARD HINT"
      >
      </VInput>

      <VInput name="input8" legend="Input <b>HTML</b> #8: no model + minlength(3)" hint="Hint <b>with HTML</b> support - STANDARD HINT"> </VInput>

      <VInput
        name="input9"
        legend="Label"
        :hint="'Sie haben eine nicht unterstütze oder ungültige Rufnummer definiert. Bitte geben Sie eine gültige Festnetznummer ein'"
        placeholder="Placeholder"
      />

      <button type="submit" class="btn btn-brand">
        Submit
      </button>

      <span data-test="form1_valid">IS VALID: {{ isValid }}</span>
      <hr />
      <span data-test="form1_values">{{ getFormValues(form) }}</span>
    </VForm>
  </div>
</template>

<script>
import VForm from '@/components/Form';
import VInput from '@/components/Input';
import VCheckbox from '@/components/Checkbox';
import VMulticheckbox from '@/components/MultiCheckbox';
import VSelect from '@/components/Select';
import {
  initFields,
  isValidEmail,
  isValidEmailOrEmpty,
  hasMinLength,
  isEqualTo,
  match,
  getFormValues,
  isValidFixedLineNumber,
  checkSupportedFixedLineNumbers,
  formattedFixedLineNumber,
} from '@/utils/form';

export default {
  name: 'App',

  components: {
    VForm,
    VInput,
    VCheckbox,
    VMulticheckbox,
    VSelect,
  },

  data() {
    const form2 = initFields({ name: 'input201', validators: [isValidEmail, hasMinLength(10)] });

    const form = initFields(
      { name: 'select1', items: [{ id: 1, label: 'text 1' }, { id: 2, label: 'text 2' }] },
      { name: 'check0', isHidden: true },
      'check1',
      'check2',
      'check3',
      'check4',
      'check5',
      'check6',
      'check7',
      {
        name: 'check8',
        items: [
          { label: 'First required', required: true },
          { label: 'Second NOT required' },
          { label: 'Third required OTHER HINT', required: true, hint: 'This is a special hint' },
        ],
      },
      {
        name: 'check9',
        required: true,
        items: [{ label: 'First required' }, { label: 'Second NOT required', required: false }, { label: 'Third required' }],
      },
      {
        name: 'check10',
        required: true,
        items: ['First required', 'Second required', 'Third required'],
      },
      {
        name: 'check11',
        items: ['First required', 'Second required', 'Third required'],
      },
      {
        name: 'check12',
        isHidden: true,
        required: true,
        items: ['First required', 'Second required', 'Third required'],
      },
      { name: 'input1', validators: isValidEmail },
      { name: 'input2', validators: isValidEmailOrEmpty },
      { name: 'input3', validators: hasMinLength(3) },
      { name: 'input4', isHidden: true },
      { name: 'input5', validators: [isValidEmail, hasMinLength(15)] },
      {
        name: 'input7',
        validators: [
          { handler: isValidEmail, hint: 'Die eingegebene E-Mail Adresse ist ungültig' },
          { handler: hasMinLength(15), hint: 'Die Eingabe muss mindestens 15 Zeichen lang sein' },
          { handler: isEqualTo('input1'), hint: 'Die E-Mail muss identisch sein mit "input1"' },
          { handler: match(/^a.*$/), hint: "Die E-Mail muss mit 'a' anfangen" },
        ],
      },
      { name: 'input8', validators: [hasMinLength(3)] },
      {
        name: 'input9',
        validators: [isValidFixedLineNumber, checkSupportedFixedLineNumbers],
        filters: [formattedFixedLineNumber],
      }
    );

    // nachträglich
    form.check6.isHidden = true;

    return {
      getFormValues,
      test0: false,
      test1: false,
      test4: false,
      test5: true,
      test6: false,
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: 'Default value',
      input6: '',
      input7: '',
      form,
      form2,
      isValid: 'unknown',
    };
  },

  methods: {
    onSubmit({ isValid }) {
      this.isValid = isValid;
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/components.css';

#app {
  margin: 60px;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
