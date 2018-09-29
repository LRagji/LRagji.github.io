import {
  html,
  LitElement
} from 'https://unpkg.com/@polymer/lit-element?module';
class gyroElement extends LitElement {

  static get properties() {
    return {
      alpha: {
        type: Number
      },
      beta: {
        type: Number
      },
      gamma: {
        type: Number
      },
      isSupported: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.isSupported = false;
    this.alpha = 0;
    this.beta = 0;
    this.gamma = 0;
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.handleMotion);
    }
  }

  handleMotion(e) {
    if (e.rotationRate.alpha & e.rotationRate.beta & e.rotationRate.gamma) {
      this.isSupported = false;
    } else {
      this.alpha = e.rotationRate.alpha;
      this.isSupported = true;
    }
  }

  render() {
    return html `<style>  .level {
      height: 100px;
      width: 100px;
      background-image: linear-gradient(white 49%, black 51%);
      border: 2px solid gray;
      border-radius: 50%;
      display: inline-block;
      transform: rotate(${this.alpha}deg);
  }
  .leveltext{
    margin: 0 auto;
  } </style>
      <div class="level"><div class="leveltext" >${this.alpha}deg</div></div>`;
  }

}

customElements.define('gyro-element', gyroElement);