import merge from 'lodash/merge';

export const emptyFormElement = () => ({
  promise: null,
  isInit: false,
  value: null,
  isChecked: false,
  hasFocus: false,
  isValid: false,
  isHidden: false,
  validators: [],
  filters: [],
});

export const promiseAllFields = form => Promise.all(form.$elements.map(f => f.promise));

export const initFields = (...args) => {
  const form = {
    $elements: [],
    isInit: false,
    isDisabled: false,
  };

  args.forEach(arg => {
    const obj = emptyFormElement();

    obj.promise = new Promise(resolve => {
      obj.resolve = resolve;
    });

    let name = null;
    if (typeof arg !== 'string') {
      merge(obj, arg);
      ({ name } = arg);
    } else {
      name = arg;
    }

    if (!Array.isArray(obj.validators)) {
      if (!obj.validators) obj.validators = [];
      else obj.validators = [obj.validators];
    }
    obj.validators.forEach((v, i) => {
      if (!v.handler) obj.validators[i] = { handler: v, hint: null };
    });

    if (!Array.isArray(obj.filters)) {
      if (!obj.filters) obj.filters = [];
      else obj.filters = [obj.filters];
    }

    obj.isHidden = !!obj.isHidden;

    form[name] = obj;
    form.$elements.push(obj);
  });

  promiseAllFields(form).then(() => {
    form.isInit = true;
  });
  return form;
};

export const checkValidations = form => {
  let isFirst = true;
  let isValid = true;
  const ERR_EL_NOT_LOADED = 'ERR_EL_NOT_LOADED';
  try {
    form.$elements.forEach(entry => {
      if (entry.isHidden) return;
      if (!entry.isInit) throw new Error(ERR_EL_NOT_LOADED);
      entry.checkValidation();
      if (!entry.isValid) {
        if (isFirst) {
          entry.hasFocus = true;
          isFirst = false;
        }
        isValid = false;
      }
      entry.isChecked = true;
    });
  } catch (e) {
    if (e instanceof Error && e.message === ERR_EL_NOT_LOADED) {
      return false;
    }
    throw e;
  }
  return isValid;
};

export const resetValidations = form => {
  form.$elements.forEach(entry => {
    if (entry.isHidden) return;
    entry.isChecked = false;
  });
};

export const getFormValues = form =>
  form.$elements
    .filter(v => v.name && !v.isHidden)
    .reduce((obj, item) => {
      obj[item.name] = item.value;
      return obj;
    }, {});

export const focusFirst = form => {
  const first = form.$elements.find(v => !v.isHidden);
  if (first) first.hasFocus = true;
};

export const isValidEmail = mail => {
  // CAP-1843: valid email regex:
  // * allow exactly one '@' in the middle
  // * don't allow any whitespace
  // * don't allow '<' and '>' because of CSS vulnerability attacks
  // * don't allow '.' at start and end
  // * don't allow two consecutive '.'
  // * the parts before and after the '@' may not be larger than 999,
  //   thus totalling to a maximum length of 2000 chars (which is the
  //   maximum allowed lengths for SubSe's description elements)
  const emailRegex = /^[^\s@<>.]([^\s@<>.]|(\.(?!\.|@))){0,998}@[^\s@<>.]([^\s@<>.]|(\.(?!\.|$))){0,998}$/;

  return typeof mail === 'string' && mail.match(emailRegex) != null;
};

export const isValidEmailOrEmpty = mail => mail === '' || isValidEmail(mail);

export const hasMinLength = len => val => val && val.length >= len;

export const hasMinLengthOrEmpty = len => val => !val || val.length >= len;

export const isEqualTo = name => (val, form) => form[name].value === val;

export const match = regex => val => val && val.match(regex);

export const matchOrEmpty = regex => val => !val || val.match(regex);

export const isValidFixedLineNumber = fln => {
  if (!fln) {
    return null;
  }
  const flnRegex = /^\+49[2-9][0-9]{1,16}$/;
  return fln.match(flnRegex) != null;
};

export const checkSupportedFixedLineNumbers = phone => {
  const notSupportedNumbers = [
    '+49310',
    '+49311',
    '+4932',
    '+49500',
    '+49501',
    '+49601',
    '+49700',
    '+49701',
    '+49800',
    '+49801',
    '+49900',
    '+49901',
    '+49902',
    '+49903',
    '+49904',
    '+49905',
  ];
  let supported = true;
  notSupportedNumbers.forEach(notSupportedNumber => {
    if (phone.includes(notSupportedNumber)) {
      supported = false;
    }
  });
  return supported;
};

export const formattedFixedLineNumber = internalValue => {
  if (!internalValue) {
    return null;
  }
  let phoneNumber = internalValue;
  const prefixGermany = '+49';
  const code = '+';
  if (internalValue[0] === '4' && internalValue[1] === '9') {
    phoneNumber = code.concat(internalValue); // prefixWithoutPlus
  } else if (internalValue[0] === '+') {
    phoneNumber = internalValue; // plus
  } else if (internalValue[0] === '0' && internalValue[1] === '0') {
    phoneNumber = code.concat(internalValue.slice(2)); // doubleZeroPrefix
  } else if (internalValue[0] === '0') {
    phoneNumber = prefixGermany.concat(internalValue.slice(1)); // zeroPrefix
  }
  return phoneNumber;
};

export default {
  emptyFormElement,
  promiseAllFields,
  initFields,
  checkValidations,
  resetValidations,
  getFormValues,
  isValidEmail,
  isValidEmailOrEmpty,
  hasMinLength,
  hasMinLengthOrEmpty,
  isEqualTo,
  match,
  matchOrEmpty,
  focusFirst,
  isValidFixedLineNumber,
  checkSupportedFixedLineNumbers,
  formattedFixedLineNumber,
};
