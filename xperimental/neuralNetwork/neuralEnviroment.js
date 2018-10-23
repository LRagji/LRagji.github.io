import {
    html,
    LitElement
} from 'https://unpkg.com/@polymer/lit-element?module';
import {} from '../commonElements/keyValuePair.js'

class neuralCanvas extends LitElement {
    static get properties() {
        return {
            inputs: {
                type: Number
            },
            outputs: {
                type: Number
            },
        };
    }

    get layers() {
        return [undefined];
    }

    constructor() {
        super();
        this.outputs = this.inputs = 0;
    }

    render() {
        return html `
        <style>
        .table
        {
            background:grey;
            height:100%;
            width:100%
        }
        .table td
        {
            border: 1px solid white;
        }
        </style>
        <table class="table">
    <tr><td colspan="2" ><canvas id="universe"></canvas></td></tr>
    <tr><td><key-value key="Inputs" value="${this.inputs}"></key-value></td>
    <td><key-value key="Outputs" value="${this.outputs}"></key-value></td></tr>
    <tr><td colspan="2" ></td></tr>
</table>
     
<script src="https://d3js.org/d3.v4.min.js"></script>`;
    }
}

customElements.define('neural-canvas', neuralCanvas);