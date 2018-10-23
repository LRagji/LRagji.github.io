import {
    html,
    LitElement
} from 'https://unpkg.com/@polymer/lit-element?module';


class keyValue extends LitElement {
    static get properties() {
        return {
            key: {
                type: String
            },
            value: {
                type: String
            }
        };
    }

    constructor() {
        super();
        this.key = "Laukik";
        this.value = "Ragji";
    }

    render() {
        return html `
        <style>
        .key
        {
            text-transform: uppercase;
            font-size:small;
        }
        .value
        {
            font-size:xx-large;
        }
        </style>
        <div>
        <span class="key" >${this.key}</span><br/>
        <span class="value" >${this.value}</span>
        </div>`;
    }

}

customElements.define('key-value', keyValue);