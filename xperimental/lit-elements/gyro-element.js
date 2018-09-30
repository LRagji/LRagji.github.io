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
    //Setting Default values of all properties
    this.isSupported = false;
    this.alpha = 0;
    this.beta = 0;
    this.gamma = 0;

    //Setting context for all methods
    this.handleMotion = this.handleMotion.bind(this);
    this.log = this.log.bind(this);

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
      // }, 1000);
    }
  }

  log(message) {
    this.shadowRoot.getElementById('log').innerHTML += message + "<br/>";
  }

  handleMotion(e) {
    // if (e.rotationRate.alpha & e.rotationRate.beta & e.rotationRate.gamma) {
    //   this.isSupported = false;
    // } else {
    // alert("Event:" + e.rotationRate.alpha);
    let logMessage = "";
    if (Math.abs(this.alpha - e.rotationRate.alpha) > 1) {
      //logMessage = `alpha:${e.rotationRate.alpha} `;
      this.alpha = Math.round(e.rotationRate.alpha);
    }
    if (Math.abs(this.beta - e.rotationRate.beta) > 1) {
      // logMessage += `beta:${e.rotationRate.beta} `;
      this.beta = Math.round(e.rotationRate.beta);
    }
    if (Math.abs(this.gamma - e.rotationRate.gamma) > 1) {
      // logMessage += `gamma:${e.rotationRate.gamma} `;
      this.gamma = Math.round(e.rotationRate.gamma);
    }
    if (this.isSupported != true)
      this.isSupported = true;
    //alert(this.alpha);
    //}
    if (logMessage !== "") this.log(logMessage);
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
      <div class="level" style="transform: rotate(${this.gamma}deg);"><div class="leveltext">${this.gamma}deg</div></div>
      <div id="log" ></div>`;
  }

}

customElements.define('gyro-element', gyroElement);