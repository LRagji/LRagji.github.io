import { html, LitElement } from 'https://unpkg.com/@polymer/lit-element?module';

class rollElement extends LitElement {

    static get properties() {
        return {
            isSupported: {
                type: Boolean
            },
            roll: {
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
        this.roll = 0;
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
            accelerationIncludingGravity: {
                x: (Math.random() * 100),
                y: (Math.random() * 100),
                z: (Math.random() * 100)
            }
        });
    }

    _handleMotion(e) {
        if (e.accelerationIncludingGravity.x !== null &&
            e.accelerationIncludingGravity.y !== null &&
            e.accelerationIncludingGravity.z !== null) {
            let calculatedroll = this._calculateRoll(e.accelerationIncludingGravity.x, e.accelerationIncludingGravity.y, e.accelerationIncludingGravity.z, this._convertRadianToDegrees);
            if (Math.abs(this.roll - calculatedroll) > this.sensitivity) {
                this.roll = calculatedroll;
                if (this._acquireBaseline == true) {
                    this.baseline = this.roll;
                    this._acquireBaseline = false;
                }
            }
        }
    }

    _calculateRoll(x, y, z, conversionFunction) {
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
            background-image: linear-gradient(#0060f9 85%, black 15%);
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
    <div class="level" style="transform: rotate(${this.roll - this.baseline}deg);">
           <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
            viewBox="0 0 240.000000 185.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,185.000000) scale(0.100000,-0.100000)"
            fill="#FFFFFF" stroke="none">
            <path d="M910 1727 c-3 -3 -61 -8 -130 -11 -188 -9 -218 -16 -258 -62 -33 -38
            -162 -291 -198 -389 l-19 -50 -5 42 c-9 61 -23 73 -89 73 -89 0 -130 -16 -147
            -55 -21 -51 -18 -92 8 -109 14 -9 55 -16 100 -18 50 -2 78 -7 78 -14 0 -7 -7
            -14 -15 -18 -8 -3 -15 -16 -15 -29 0 -13 -3 -27 -8 -31 -4 -4 -7 -17 -8 -29 0
            -12 -7 -56 -14 -97 -10 -59 -11 -123 -3 -300 6 -124 8 -289 6 -368 -7 -187
            -11 -182 143 -182 145 0 144 -1 144 131 l0 99 -50 0 c-38 0 -50 -4 -50 -15 0
            -12 -15 -15 -74 -15 -81 0 -107 13 -105 53 1 20 2 21 6 2 10 -38 24 -45 93
            -45 51 0 69 4 74 15 8 22 1617 23 1636 0 7 -9 36 -15 78 -18 l67 -3 -71 -2
            c-56 -2 -73 1 -78 13 -4 11 -20 15 -56 15 l-50 0 0 -98 c0 -131 1 -132 144
            -132 156 0 148 -9 145 173 -1 84 2 255 6 380 8 230 -5 427 -28 427 -5 0 -6 7
            -3 17 4 10 -2 25 -14 38 l-21 22 47 7 c26 3 62 6 81 6 58 0 73 14 73 70 0 37
            -6 56 -23 76 -22 25 -31 28 -109 32 -95 5 -96 4 -113 -63 l-11 -39 -18 49
            c-70 185 -198 411 -238 419 -49 10 -105 18 -143 21 -86 7 -760 17 -765 12z
            m884 -125 l59 -7 39 -100 c82 -210 101 -276 89 -303 -11 -22 -16 -24 -54 -18
            -136 22 -613 35 -807 21 -36 -2 -191 -5 -345 -6 l-280 -2 130 -12 130 -12
            -120 -1 c-66 0 -145 3 -175 6 -52 7 -55 9 -58 37 -3 32 30 137 94 298 l38 97
            41 1 c22 1 92 5 155 9 134 9 977 3 1064 -8z m-1292 -697 c59 -13 132 -31 162
            -40 54 -16 54 -16 46 -46 -20 -69 -43 -74 -240 -60 -197 14 -190 12 -190 77 0
            29 5 65 10 79 10 26 13 27 58 20 26 -3 95 -17 154 -30z m1592 13 c3 -13 7 -48
            10 -80 l6 -56 -68 -11 c-37 -5 -121 -13 -188 -17 -117 -6 -121 -5 -147 17 -14
            13 -29 36 -33 51 -5 25 -3 28 46 42 28 8 101 26 163 40 195 43 205 44 211 14z
            m-559 -67 c26 -5 36 -18 72 -91 65 -132 70 -124 -77 -133 -168 -11 -779 -2
            -793 12 -7 7 -2 30 18 76 39 93 66 129 100 136 39 9 641 9 680 0z m-939 -328
            c-3 -10 -10 -37 -16 -60 -17 -69 -27 -73 -151 -73 -109 0 -109 0 -120 27 -9
            24 -7 55 7 106 5 15 21 17 145 17 129 0 140 -1 135 -17z m1474 -9 c14 -35 12
            -98 -2 -112 -13 -13 -192 -17 -223 -6 -20 8 -42 49 -54 103 l-9 41 139 0 139
            0 10 -26z"/>
            </g>
           </svg>
    </div>
    <div class="leveltext">B:${parseFloat(this.baseline).toFixed(2)} P:${parseFloat(this.roll - this.baseline).toFixed(2)}\xB0 P:${parseFloat(this.roll).toFixed(2)} </div>
        `
    }

}

customElements.define('roll-element', rollElement);