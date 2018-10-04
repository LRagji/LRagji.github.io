import { html, LitElement } from 'https://unpkg.com/@polymer/lit-element?module';

class pitchElement extends LitElement {

    static get properties() {
        return {
            isSupported: {
                type: Boolean
            },
            pitch: {
                type: Number
            },
            sensitivity: {
                type: Number
            },
            baseline: {
                type: Number
            },
            _acquireBaseline: {
                type: Boolean
            }
        }
    }

    constructor() {
        super();
        this.isSupported = false;
        this.sensitivity = 1;
        this.pitch = 0;
        this._acquireBaseline = false;
        this.baseline = 0;

        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
        this.captureBaseline = this.captureBaseline.bind(this);
        this._calculatePitch = this._calculatePitch.bind(this);
        this._handleMotion = this._handleMotion.bind(this);
        this._convertRadianToDegrees = this._convertRadianToDegrees.bind(this);
        this._simulateData = this._simulateData.bind(this);

    }

    start() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', this._handleMotion);
            this.isSupported = true;
            //setInterval(this._simulateData, 1000);
        }
        else {
            setInterval(this._simulateData, 1000);
            this.isSupported = false;
        }
    }

    stop() {
        if (this.isSupported === true) {
            window.removeEventListener('devicemotion', this._handleMotion);
        }
        else {
            clearInterval(this._simulateData);
        }
    }

    captureBaseline() {
        this._acquireBaseline = true;
    }

    _simulateData() {
        this._handleMotion({
            acceleration: {
                x: (Math.random() * 100),
                y: (Math.random() * 100),
                z: (Math.random() * 100)
            }
        });
    }

    _handleMotion(e) {
        if (e.accelerationIncludingGravity.x !== null &&
            e.accelerationIncludingGravity.y !== null
            e.accelerationIncludingGravity.z !== null) {
            let calculatedPitch = this._calculatePitch(e.accelerationIncludingGravity.x, e.accelerationIncludingGravity.y, e.accelerationIncludingGravity.z, this._convertRadianToDegrees);
            if (Math.abs(this.pitch - calculatedPitch) > this.sensitivity) {
                this.pitch = calculatedPitch;
                if (this._acquireBaseline == true) {
                    this.baseline = this.pitch;
                    this._acquireBaseline = false;
                }
            }
        }
    }

    _calculatePitch(x, y, z, conversionFunction) {
        return conversionFunction(Math.atan2((x * -1), Math.sqrt((y * y + z))));
    }

    _convertRadianToDegrees(radians) {
        return radians * 180.0 / Math.PI;
    }

    render() {
        return html`
        <style>
        .level {
            height: 100%;
            width: 100%;
            border: 2px solid gray;
            background-image: linear-gradient(#0060f9 69%, black 31%);
            border-radius: 50%;
            text-align: center;
            transition: transform 0.3s ease-in-out;
            float:left;
            overflow:hidden;
        }

        .leveltext {
           float:left;
           clear:left;
           text-align: center;
           width:100%;
        }
    </style>
    <div class="level" style="transform: rotate(${this.pitch - this.baseline}deg);">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
         viewBox="0 0 508.000000 181.000000"
            preserveAspectRatio="xMidYMid meet">
           <g transform="translate(0.000000,181.000000) scale(0.100000,-0.100000)"
           fill="#FFFFFF" stroke="none">
           <path d="M1190 1773 c0 -5 25 -25 55 -47 72 -52 113 -94 94 -99 -142 -38 -410
           -153 -640 -276 -187 -99 -149 -91 -476 -107 -109 -6 -133 -10 -137 -23 -3 -9
           -8 -114 -12 -234 -7 -218 -7 -219 -30 -228 -22 -8 -24 -14 -24 -83 0 -84 6
           -106 27 -106 9 0 12 -6 9 -17 -3 -10 5 -58 18 -108 28 -104 46 -125 134 -152
           45 -14 92 -18 219 -18 160 0 163 0 188 25 19 20 27 42 36 104 34 251 167 388
           389 403 268 19 446 -173 454 -487 l2 -85 1058 0 1058 0 3 125 c3 145 25 228
           78 303 113 158 351 202 539 100 133 -73 208 -225 208 -425 l0 -98 163 0 c111
           0 179 5 217 15 30 8 81 15 112 15 62 0 75 9 58 41 -9 16 -7 66 10 212 11 106
           24 216 29 245 8 52 7 53 -26 83 -79 68 -297 154 -497 194 -130 26 -285 47
           -491 66 -73 7 -135 18 -142 25 -7 7 -22 10 -33 7 -11 -3 -27 0 -35 7 -11 9
           -19 10 -26 3 -8 -8 -29 0 -72 24 -149 85 -613 314 -733 361 -236 93 -426 126
           -819 142 -230 9 -490 1 -619 -20 -52 -8 -77 -8 -98 1 -15 6 -41 9 -56 6 -23
           -5 -41 4 -105 54 -78 60 -87 65 -87 52z m839 -207 c11 -13 73 -387 65 -395 -4
           -5 -726 19 -863 28 -93 6 -95 6 -102 34 -12 46 9 85 78 142 114 94 268 162
           415 184 98 15 132 17 274 19 92 2 124 -1 133 -12z m426 -17 c223 -26 380 -77
           610 -198 l130 -68 -5 -34 c-3 -19 -5 -58 -5 -87 l0 -53 -35 5 c-19 3 -216 13
           -437 23 l-403 17 -10 31 c-27 87 -90 360 -85 373 6 15 44 14 240 -9z m2244
           -670 c80 -13 217 -65 225 -85 11 -28 6 -62 -10 -79 -13 -12 -28 -15 -63 -11
           -25 3 -96 11 -157 17 l-111 11 -47 70 c-25 39 -43 74 -40 79 7 12 124 11 203
           -2z m177 -452 c-3 -33 -11 -66 -17 -73 -7 -9 -34 -14 -75 -14 -91 0 -110 26
           -81 110 13 39 41 48 131 41 l49 -3 -7 -61z"/>
           <path d="M990 780 c-113 -24 -217 -108 -268 -218 -24 -50 -27 -69 -27 -157 0
           -88 3 -107 27 -157 34 -74 112 -152 186 -186 50 -24 69 -27 157 -27 87 0 107
           3 157 27 264 124 300 491 64 653 -88 60 -200 84 -296 65z"/>
           <path d="M3952 779 c-121 -23 -222 -103 -275 -217 -27 -59 -31 -77 -31 -152 1
           -155 75 -275 212 -342 61 -30 74 -33 162 -33 83 0 103 3 155 28 338 158 276
           648 -90 716 -66 12 -72 12 -133 0z"/>
           </g>
           </svg>
    </div>
    <div class="leveltext">B:${parseFloat(this.baseline).toFixed(2)} P:${parseFloat(this.pitch - this.baseline).toFixed(2)}\xB0 P:${parseFloat(this.pitch).toFixed(2)} </div>
        `
    }

}

customElements.define('pitch-element', pitchElement);