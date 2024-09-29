declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select an element by its data-test attribute.
         * @param dataTestSelector The value of the data-test attribute.
         */
        getDataTest(dataTestSelector: string): Chainable<Element>;
    }
}