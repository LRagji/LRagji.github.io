import {
  html,
  LitElement
} from 'https://unpkg.com/@polymer/lit-element?module';
class gyroElement extends LitElement {

  static get properties() {
    return {
      alpha: {
        type: Number,
        value: 0
      },
      beta: {
        type: Number,
        value: 0
      },
      gamma: {
        type: Number,
        value: 0
      },
      alphaSensitivity: {
        type: Number,
        value: 1
      },
      betaSensitivity: {
        type: Number,
        value: 1
      },
      gammaSensitivity: {
        type: Number,
        value: 1
      },
      isSupported: {
        type: Boolean,
        value: false
      }
    };
  }

  constructor() {
    super();
    this.setupDefaultValuesForProperties();

    //Setting context for all methods
    this.handleMotion = this.handleMotion.bind(this);
    this.dispose = this.dispose.bind(this);

    if (window.DeviceMotionEvent) {
      //window.addEventListener('devicemotion', this.handleMotion);
      setInterval(() => {
        this.handleMotion({
          rotationRate: {
            alpha: (Math.random() * 100),
            beta: (Math.random() * 100),
            gamma: (Math.random() * 100)
          }
        })
      }, 1000);
    }
  }

  setupDefaultValuesForProperties() {
    this.gamma = this.beta = this.alpha = 0;
    this.gammaSensitivity = this.betaSensitivity = this.alphaSensitivity = 1;
  }

  dispose() {
    window.removeEventListener('devicemotion', this.handleMotion);
  }

  handleMotion(e) {

    if (Math.abs(this.alpha - e.rotationRate.alpha) > this.alphaSensitivity) {
      this.alpha = Math.round(e.rotationRate.alpha);
      if (this.isSupported !== true) this.isSupported = true;
    }

    if (Math.abs(this.beta - e.rotationRate.beta) > this.betaSensitivity) {
      this.beta = Math.round(e.rotationRate.beta);
      if (this.isSupported !== true) this.isSupported = true;
    }

    if (Math.abs(this.gamma - e.rotationRate.gamma) > this.gammaSensitivity) {
      this.gamma = Math.round(e.rotationRate.gamma);
      if (this.isSupported !== true) this.isSupported = true;
    }
  }

  render() {
    return html `<style>  .level {
      height: 100px;
      width: 100px;
      background-image: linear-gradient(white 49%, black 51%);
      border: 2px solid gray;
      border-radius: 50%;
      text-align: center;
      display: inline-block;
      transition: transform 0.3s ease-in-out
  }
  .leveltext{
    margin: 0 auto;
    position: relative;
    top: 50%;
    color:white;
    font-size:150%;
  } 
  </style>
      <div class="level" style="transform: rotate(${this.alpha}deg);"><div class="leveltext" style="transform: rotate(${this.alpha*-1}deg);">${this.alpha}</div></div>
      <div class="level" style="transform: rotate(${this.beta}deg);"><div  class="leveltext" style="transform: rotate(${this.beta *-1}deg);">${this.beta}</div></div>
      <div class="level" style="transform: rotate(${this.gamma}deg);"><div  class="leveltext" style="transform: rotate(${this.gamma *-1}deg);">${this.gamma}</div></div>
      `
  }

}

customElements.define('gyro-element', gyroElement);