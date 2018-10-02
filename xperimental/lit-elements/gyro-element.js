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
      alphaSensitivity: {
        type: Number
      },
      betaSensitivity: {
        type: Number
      },
      gammaSensitivity: {
        type: Number
      },
      isSupported: {
        type: Boolean
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

  setupDefaultValuesForProperties() {
    this.gamma = this.beta = this.alpha = 0;
    this.gammaSensitivity = this.betaSensitivity = this.alphaSensitivity = 10;
  }

  dispose() {
    window.removeEventListener('devicemotion', this.handleMotion);
  }

  handleMotion(e) {

    let dispatchEvent = false;
    if (Math.abs(this.alpha - e.rotationRate.alpha) > this.alphaSensitivity) {
      this.alpha = Math.round(e.rotationRate.alpha);
      if (this.isSupported !== true) this.isSupported = true;
      dispatchEvent = true;
    }

    if (Math.abs(this.beta - e.rotationRate.beta) > this.betaSensitivity) {
      this.beta = Math.round(e.rotationRate.beta);
      if (this.isSupported !== true) this.isSupported = true;
      dispatchEvent = true;
    }

    if (Math.abs(this.gamma - e.rotationRate.gamma) > this.gammaSensitivity) {
      this.gamma = Math.round(e.rotationRate.gamma);
      if (this.isSupported !== true) this.isSupported = true;
      dispatchEvent = true;
    }

    if (dispatchEvent === true) {
      this.dispatchEvent(new CustomEvent("data-changed", {
        detail: {
          "alpha": this.alpha,
          "gamma": this.gamma,
          "beta": this.beta
        }
      }))
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
  <div style="display:${this.isSupported?'visible':'none'}" >
      <div class="level" style="transform: rotate(${this.alpha}deg);"><div class="leveltext" style="transform: rotate(${this.alpha*-1}deg);">${this.alpha}</div></div>
      <div class="level" style="transform: rotate(${this.beta}deg);"><div  class="leveltext" style="transform: rotate(${this.beta *-1}deg);">${this.beta}</div></div>
      <div class="level" style="transform: rotate(${this.gamma}deg);"><div  class="leveltext" style="transform: rotate(${this.gamma *-1}deg);">${this.gamma}</div></div>
  </div>
  <div style="display:${!this.isSupported?'visible':'none'}" >
  <center><p><b>Your browser doesnot support gyro api :(</b><br/>Works only on chrome.</p></center>
  </div>    
      `
  }

}

customElements.define('gyro-element', gyroElement);