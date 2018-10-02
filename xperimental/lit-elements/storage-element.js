import {
    html,
    LitElement
} from 'https://unpkg.com/@polymer/lit-element?module';

class storageElement extends LitElement {
    static get properties() {
        return {
            limitInBytes: {
                type: Number
            },
            currentSizeInBytes: {
                type: Number
            }
        }
    }
    constructor() {
        super();
        this.currentSizeInBytes = this._getExistingSizeInBytes();;
        this.limitInBytes = 4 * 1024 * 1024;
        this.setItem = this.setItem.bind(this);
        this.getItem = this.getItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.clear = this.clear.bind(this);
        this.getAllData = this.getAllData.bind(this);

        this._getExistingSizeInBytes = this._getExistingSizeInBytes.bind(this);
        this._calculateLength = this._calculateLength.bind(this);
    }

    setItem(key, value) {
        if (this.currentSizeInBytes < this.limitInBytes & key !== undefined & key !== null) {
            localStorage.setItem(key, value);
            this.currentSizeInBytes += this._calculateLength(key, value);
        }
    }

    getItem(key) {
        return localStorage.get(key);
    }

    removeItem(key) {
        let value = localStorage.getItem(key);
        localStorage.removeItem(key);
        this.currentSizeInBytes -= this._calculateLength(key, value)
    }

    clear() {
        localStorage.clear();
        this.currentSizeInBytes = this._getExistingSizeInBytes();
    }

    getAllData(mimeType) {
        return this._getDataArray({
                counter: localStorage.length - 1,
                result: {}
            })
            .then((context) => {
                return new Blob([JSON.stringify(context.result)], {
                    type: mimeType
                });
            })
    }

    _getDataArray(context) {
        return new Promise((resolve, reject) => {
            let batchCounter = 0;
            while (context.counter > 0 && batchCounter < 100) {
                context.result[context.counter] = {
                    key: localStorage.key(context.counter),
                    value: localStorage.getItem(localStorage.key(context.counter))
                };
                context.counter--;
                batchCounter++;
            }

            if (context.counter > 0) {
                setTimeout(() => {
                    resolve(this._getDataArray(context));
                }, 100);
            } else {
                resolve(context);
            }
        });
    }

    _calculateLength(key, value) {
        let bytes = 0;
        if (key !== undefined && key !== null) {
            bytes += (key.toString().length * 2);
        }
        if (value !== undefined && value !== null) {
            bytes += (value.toString().length * 2);
        }
        return bytes;
    }

    _getExistingSizeInBytes() {
        return new Blob(Object.values(localStorage)).size;
    }


    render() {
        return html `<p>Current:${this.currentSizeInBytes} bytes of ${this.limitInBytes} 
        (${parseFloat((this.currentSizeInBytes/this.limitInBytes)*100).toFixed(2)})%</p>
        <br/>${(new Blob(Object.values(localStorage)).size-this.currentSizeInBytes)}`;
    }
}

customElements.define('storage-element', storageElement);