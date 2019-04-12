// Returns the Vuex store.
export const getStore = () => cy.window({ log: false }).its('__app__.$store');

export const checkDlPair = (dt, dd) => {
  if (dd instanceof RegExp) {
    cy.contains('dt', dt)
      .next('dd')
      .invoke('text')
      .should('match', dd);
  } else {
    cy.contains('dt', dt)
      .next('dd')
      .should('have.text', dd);
  }
};

export default {
  getStore,
};
