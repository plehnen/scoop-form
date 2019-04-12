describe('General Form Element Tests', () => {
  before(() => {
    cy.cleanVisit('/');
  });

  it('shows no errors in beginning', () => {
    cy.contains('INVALID HINT').should('not.be.visible');
    cy.get('input[name=check1]').check();
    cy.contains('INVALID HINT').should('not.be.visible');
    cy.get('input[name=check1]').uncheck();
    cy.contains('INVALID HINT').should('not.be.visible');

    cy.get('[data-test=check1]')
      .contains('Slot-Content with HTML support1')
      .find('b')
      .should('have.text', 'with HTML');
  });

  it('shows errors and focuses on first element', () => {
    cy.get('[data-test=form1] > .btn').click(); // submit

    cy.get('[data-test=value1]').contains('VALUE: false');
    cy.focused().should('have.attr', 'name', 'check1');
    cy.contains('.text-negative', 'INVALID HINT with HTML support1').as('hint1');
    cy.get('@hint1')
      .find('b')
      .should('have.text', 'with HTML');

    cy.get('[data-test=check1] label').contains('Slot-Content with HTML support1');

    cy.get('input[name=check1]').click();
    cy.get('@hint1').should('not.be.visible');
    cy.get('[data-test=value1]').contains('VALUE: true');
    cy.get('input[name=check1]').click();
    cy.get('@hint1').should('be.visible');
    cy.get('input[name=check1]').click();
    cy.get('@hint1').should('not.be.visible');
    cy.get('[data-test=form1]').submit();
  });

  context('Select element tests', () => {
    it('allows selection', () => {
      cy.get('[data-test=select1] label')
        .contains('Select legend with HTML support')
        .find('b')
        .should('have.text', 'with HTML');
      cy.get('[data-test=select1] select').select('text 2');
      cy.get('[data-test=form1]').submit();
    });
  });

  context('Checkbox element tests', () => {
    it('focuses first error checkbox', () => {
      cy.focused().should('have.attr', 'name', 'check2');
      cy.contains('.text-negative', 'INVALID HINT with HTML support2')
        .find('b')
        .should('have.text', 'with HTML');
      cy.get('input[name=check2]').check();
    });

    it('shows error when unselecting pre-selected checkbox', () => {
      cy.get('input[name=check5]').uncheck();
      cy.get('[data-test=form1]').submit();

      cy.focused().should('have.attr', 'name', 'check5');
      cy.get('input[name=check5]').check();
      cy.get('[data-test=form1]').submit();
    });

    it('renders checkbox with and without legend', () => {
      cy.focused().should('have.attr', 'name', 'check7');

      cy.get('[data-test=check1] legend')
        .contains('Terms legend with html support1. Required. With Model.')
        .find('b')
        .should('have.text', 'with html');

      cy.get('[data-test=check7] legend').should('not.be.visible');

      cy.get('input[name=check7]').check();
      cy.get('[data-test=form1]').submit();
    });
  });

  context('Multi Checkbox element tests', () => {
    it('renders multi-checkbox', () => {
      cy.get('[data-test=check8] legend').contains('Multicheckbox HTML Legend8');
      cy.get('[data-test=check8] .text-negative')
        .contains('INVALID HINT with HTML multicheckbox')
        .find('b')
        .should('have.text', 'with HTML');
      cy.get('[data-test=check8] .text-negative')
        .contains('INVALID HINT with HTML multicheckbox')
        .click(); // click on label
      cy.get('[data-test=check8]')
        .find('input')
        .first()
        .should('be.checked');
      cy.get('[data-test=check8_2]').contains('This is a special hint');
      cy.get('[data-test=check8_1]').contains('Second NOT required');
      cy.get('[data-test=check8_2]')
        .find('input')
        .check();
      cy.get('[data-test=form1]').submit();
    });

    it('focuses on first error multi-checkbox', () => {
      cy.focused()
        .parent()
        .should('have.attr', 'data-test', 'check9_0');
      cy.focused().check();
      cy.get('[data-test=form1]').submit();
      cy.focused()
        .parent()
        .should('have.attr', 'data-test', 'check9_2');
      cy.focused().check();
      cy.get('[data-test=form1]').submit();
    });

    it('renders multi-checkbox created via string-array', () => {
      cy.get('[data-test=check10_1]').contains('Second required');
      cy.get('[data-test=check10_0] input').check();
      cy.get('[data-test=check10_1] input').check();
      cy.get('[data-test=check10_2] input').check();
      cy.get('[data-test=form1]').submit();
    });

    it('renders multi-checkbox required via html', () => {
      cy.get('[data-test=check11_1]').contains('Second required');
      cy.get('[data-test=check11]').contains('INVALID HINT with HTML multicheckbox');
      cy.get('[data-test=check11_0] input').check();
      cy.get('[data-test=check11_1] input').check();
      cy.get('[data-test=check11_2] input').check();
      cy.get('[data-test=form1]').submit();
    });
  });

  context('Input field element tests', () => {
    it('renders input', () => {
      const id = '#input_input1';
      const error = '[data-test=input1] > label > .text-negative';

      cy.focused()
        .parent()
        .should('have.attr', 'data-test', 'input1');
      cy.get('[data-test=input1] > label')
        .contains('Input HTML #1:')
        .find('b')
        .should('have.text', 'HTML');
      cy.get(error)
        .contains('Hint with HTML support')
        .find('b')
        .should('have.text', 'with HTML');
      cy.get(id).type('abc');
      cy.get(error).should('not.be.visible');
      cy.get(id).blur();
      cy.get(error).should('be.visible');
      cy.get(id)
        .clear()
        .type('mail@abcde.de')
        .blur();
      cy.get(error).should('not.be.visible');
      cy.get('[data-test=value_input1]').should('have.text', 'VALUE: mail@abcde.de');
      cy.get('[data-test=form1]').submit();
    });

    it('does not show error on not required field', () => {
      const id = '#input_input2';
      const error = '[data-test=input2] > label > .text-negative';

      cy.focused()
        .parent()
        .should('have.attr', 'data-test', 'input3');
      cy.get(error).should('not.be.visible');
      cy.get(id)
        .type('invalid email')
        .blur();
      cy.get(error).should('be.visible');
      cy.get(id)
        .clear()
        .type('mail@abcde.de')
        .blur();
      cy.get(error).should('not.be.visible');
      cy.get('[data-test=form1]').submit();
    });

    it('validates minimum length', () => {
      const id = '#input_input3';
      const error = '[data-test=input3] > label > .text-negative';

      cy.focused()
        .parent()
        .should('have.attr', 'data-test', 'input3');
      cy.get(error).should('be.visible');
      cy.get(id)
        .type('xy')
        .blur();
      cy.get(error).should('be.visible');
      cy.get(id)
        .clear()
        .type('xyz')
        .blur();
      cy.get(error).should('not.be.visible');
      cy.get('[data-test=form1]').submit();
    });

    it('does not show hidden input', () => {
      cy.get('#input_input4').should('not.be.visible');
    });

    it('uses multiple validations', () => {
      const id = '#input_input5';
      const error = '[data-test=input5] > label > .text-negative';

      cy.get(id).should('have.value', 'Default value');

      cy.get(error).should('be.visible');
      cy.get(id)
        .clear()
        .type('12345678901234567890')
        .blur();
      cy.get(error).should('be.visible');
      cy.get(id)
        .clear()
        .type('abc@mail.com')
        .blur();
      cy.get(error).should('be.visible');
      cy.get(id)
        .clear()
        .type('1234567890123456789abc@mail.com')
        .blur();
      cy.get(error).should('not.be.visible');
      cy.get('[data-test=form1]').submit();
    });

    it('works with model even without form', () => {
      cy.get('#input_input6')
        .type('abcde')
        .blur();
      cy.get('[data-test=value_input6]').should('have.text', 'VALUE: abcde');
    });

    it('validates with individual error messages', () => {
      const id = '#input_input7';
      const error = '[data-test=input7] > label > .text-negative';

      cy.get('[data-test=input7]').scrollIntoView();

      cy.get(error).should('have.text', 'Die eingegebene E-Mail Adresse ist ungültig');
      cy.get(id)
        .type('abc@mail.com')
        .blur();
      cy.get(error).should('have.text', 'Die Eingabe muss mindestens 15 Zeichen lang sein');
      cy.get(id)
        .clear()
        .type('1234567890abc@mail.com')
        .blur();
      cy.get(error).should('have.text', 'Die E-Mail muss identisch sein mit "input1"');
      cy.get('#input_input1')
        .clear()
        .type('1234567890abc@mail.com');
      cy.get('[data-test=form1]').submit();
      cy.get(error).should('have.text', "Die E-Mail muss mit 'a' anfangen");
      cy.get('#input_input1')
        .clear()
        .type('a1234567890abc@mail.com');
      cy.get(id)
        .clear()
        .type('x1234567890abc@mail.com')
        .blur();
      cy.get(error).should('be.visible');
      cy.get(id)
        .clear()
        .type('a1234567890abc@mail.com')
        .blur();
      cy.get(error).should('not.be.visible');
      cy.get('[data-test=form1]').submit();
    });

    it('validates fixedNetNumber with error messages', () => {
      const id = '#input_input9';
      const error = '[data-test=input9] > label > .text-negative';

      cy.get('[data-test=input9]').scrollIntoView();

      cy.get(error).should('have.text', 'Sie haben eine nicht unterstütze oder ungültige Rufnummer definiert. Bitte geben Sie eine gültige Festnetznummer ein');
      cy.get(id)
        .type('0176975555555')
        .blur();
      cy.get(error).should('have.text', 'Sie haben eine nicht unterstütze oder ungültige Rufnummer definiert. Bitte geben Sie eine gültige Festnetznummer ein');
      cy.get(id)
        .clear()
        .type('0217351717')
        .blur();
      cy.get('[data-test=form1]').submit();
    });
  });

  context('Submit form test', () => {
    it('is valid and has correct values', () => {
      cy.get('#input_input8').type('xyz');
      cy.get('[data-test=form1_valid]').should('have.text', 'IS VALID: false');
      cy.get('[data-test=form1]').submit();
      cy.get('[data-test=form1_valid]').should('have.text', 'IS VALID: true');
      cy.get('[data-test=form1_values]')
        .invoke('text')
        .then(text => {
          const parsed = JSON.parse(text);
          const expected = {
            select1: '2',
            check1: true,
            check2: true,
            check3: false,
            check4: false,
            check5: true,
            check7: true,
            check8: [true, false, true],
            check9: [true, false, true],
            check10: [true, true, true],
            check11: [true, true, true],
            input1: 'a1234567890abc@mail.com',
            input2: 'mail@abcde.de',
            input3: 'xyz',
            input5: '1234567890123456789abc@mail.com',
            input7: 'a1234567890abc@mail.com',
            input8: 'xyz',
            input9: '+49217351717',
          };
          expect(parsed).to.deep.eq(expected);
        });
    });
  });
});
