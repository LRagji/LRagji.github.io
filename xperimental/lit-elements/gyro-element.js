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
      // setInterval(() => {
      //   this.handleMotion({
      //     rotationRate: {
      //       alpha: (Math.random() * 100),
      //       beta: (Math.random() * 100),
      //       gamma: (Math.random() * 100)
      //     }
      //   })
      // }, 2000);
    }
  }

  handleMotion(e) {
    if (e.rotationRate.alpha & e.rotationRate.beta & e.rotationRate.gamma) {
      this.isSupported = false;
    } else {
      this.alpha = Math.round(e.rotationRate.alpha);
      this.beta = Math.round(e.rotationRate.beta);
      this.gamma = Math.round(e.rotationRate.gamma);
      this.isSupported = true;
      alert(this.alpha);
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
  }
  .leveltext{
    margin: 0 auto;
  } </style>
      <div class="level" style="transform: rotate(${this.alpha}deg);"><div class="leveltext">${this.alpha}deg</div></div>
      <div class="level" style="transform: rotate(${this.beta}deg);"><div class="leveltext">${this.beta}deg</div></div>
      <div class="level" style="transform: rotate(${this.gamma}deg);"><div class="leveltext">${this.gamma}deg</div></div>`;
  }

}

customElements.define('gyro-element', gyroElement);