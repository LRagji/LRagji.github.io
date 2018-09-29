import {html, LitElement} from 'https://unpkg.com/@polymer/lit-element?module';
class MyElement extends LitElement {

    static get properties() {
      return {
        mood: {type: String}
      };
    }

    constructor() {
      super();
      this.mood = 'happy';
    }

    render() {
      return html`<style> .mood { color: red; } </style>
        Web Components are <span class="mood">${this.mood}</span>!`;
    }

  }

  customElements.define('my-element', MyElement);