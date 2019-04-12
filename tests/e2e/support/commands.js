// visits and cleans sessionStorage
Cypress.Commands.add('cleanVisit', url => {
  Cypress.log({
    name: 'CLEAN-VISIT',
    message: url,
  });
  cy.visit(url, {
    log: false,
    onBeforeLoad: win => {
      win.sessionStorage.clear();
    },
  });
});
