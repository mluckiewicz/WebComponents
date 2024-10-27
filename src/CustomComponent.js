import * as EH from './EventHandler.js';
import { addGlobalStylesToShadowRoot } from './GlobalStyles.js'

const EventHandler = EH.default;

export default class CustomComponent extends HTMLElement {
    static ID = 0;

    constructor() {
        super();
        this.initializeShadowDOM();
        this.initializeComponentProperties();
        this.logComponentInstantiation();

        addGlobalStylesToShadowRoot(this.shadowRoot);
    }

    initializeShadowDOM() {
        this.attachShadow({ mode: 'open' });
        this.__style = this.createStyleElement();
        this.mainComp = this.createMainComponent();
        this.shadowRoot.append(this.__style, this.mainComp);
    }

    initializeComponentProperties() {
        this.customStyle = '';
        this.compName = '';
        this.compID = CustomComponent.ID++;
        this._attributes = {};
        this.isAttached = false;
    }

    logComponentInstantiation() {
        console.log(`Custom component instantiated (ID: ${this.compID})`);
    }

    createStyleElement() {
        const style = document.createElement('style');
        style.textContent = '';
        return style;
    }

    createMainComponent() {
        const span = document.createElement('span');
        span.classList.add('custom-comp');
        return span;
    }

    handleEvent(event, params) {
        console.log(`Event '${event}' triggered with params`, params);
    }

    attributeChangedCallback() {
        //this.display();
    }

    display(force = false) {
        if (force) this.resetMainComponent();
        if (this.isAttached) {
            console.log('Component already rendered...');
            return;
        }
        this.renderComponent();
    }

    resetMainComponent() {
        [...this.mainComp.children].forEach(
            child => this.mainComp.removeChild(child)
        );
        this.isAttached = false;
    }

    renderComponent() {
        console.log(`Rendering component: ${this.compName}`);
        this.__style.textContent = this.customStyle;
        const renderedElement = this.render();
        this.isAttached = true;
        this.mainComp.appendChild(renderedElement);
    }

    render() {
        throw new Error('Method render() must be implemented by subclass');
    }

    sanitizeAttributeName(attributeName) {
        const parts = attributeName.split('-');
        return [parts.shift(), ...parts.map(this.capitalizeFirstLetter)].join('');
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setUpAccessors() {
        this.getAttributeNames().forEach(name => this.createAccessorForAttribute(name));
    }

    createAccessorForAttribute(attributeName) {
        const sanitizedName = this.sanitizeAttributeName(attributeName);
        if (this._attributes[sanitizedName] === undefined) {
            Object.defineProperty(this._attributes, sanitizedName, {
                set: value => this.setAttribute(attributeName, value),
                get: () => this.getAttribute(attributeName),
            });
        }
    }

    connectedCallback() {
        this.setUpAccessors();
        this.display();
        this.triggerEvent('show');
        this.appendExistingChildren();
    }

    appendExistingChildren() {
        [...this.childNodes].forEach(child => this.append(child));
    }

    triggerEvent(eventName) {
        EventHandler.triggerEvent(eventName);
    }

    triggerCustomEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            detail,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    subscribeToEvents() {
        const events = this.getAttributeNames().filter(attr => attr.startsWith('data-event-'));
        events.forEach(eventAttr => {
            const eventName = eventAttr.replace('data-event-', '');
            EventHandler.subscribeToEvent(eventName, this);
        });
    }
}
