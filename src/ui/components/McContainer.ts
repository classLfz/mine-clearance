import { appState } from '../../state/store';
import { AntiShadowElement } from "../util/AntiShadowElement";
import { html } from "@polymer/polymer/polymer-element";

import '@polymer/paper-button/paper-button.js';

import './McBlock';
import { connectToRedux, ReduxBindable } from "../util/ReduxConnector";

const _temp = html`
  <style>
    :host {
      width: 100%;
      display: flex;
      padding: 10px;
      margin: 0 20px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    #table {
      box-shadow: 0px 0px 6px #633173;
    }
    .row {
      display: flex;
    }
    .countBox {
      width: 100%;
      padding-bottom: 24px;
      margin: 0 auto;
      text-align: center;
      box-shadow: 0px 0px 0px #6f6f6f;
      font-size: 18px;
    }
    .timing {
      text-align: center;
    }
    .cover-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-top: 24px;
    }
    .tipper-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.01);
      font-size: 24px;
    }
    .victory-tipper {
      color: orange;
    }
    .gameover-tipper {
      color: red;
      opacity: 0.5;
    }
  </style>

  <div class="countBox">
    <span>mine-matrix：[[width]] * [[height]]</span>
    <span>tags：[[markNumber]] / [[mineNumber]]</span>
    <span>
      <paper-button on-tap="restart">restart</paper-button>
    </span>
  </div>

  <div class="timing">timing:  [[timeStr]]</div>

  <div class="cover-container">
    <template is="dom-if" if="[[victory]]">
      <div class="tipper-container">
        <h1 class="victory-tipper">ViCTORY!</h1>
      </div>
    </template>
    <template is="dom-if" if="[[!victory]]">
      <template is="dom-if" if="[[gameOver]]">
        <div class="tipper-container">
          <h1 class="gameover-tipper">GAME OVER!</h1>
        </div>
      </template>
    </template>

    <table id="table" cellspacing="0" cellpadding="0">
      <template is="dom-repeat" items="[[mineArray]]" items-index-as="x">
        <div class="row">
          <template is="dom-repeat" items="[[item]]" items-index-as="y">
            <mc-block
              data-x$="[[x]]"
              data-y$="[[y]]"
              x="[[x]]"
              y="[[y]]"
              mine-object="[[item]]"
              on-block-click="_blockClick"
              on-block-dblclick="_blockDblclick"
              on-toogle-mark="_toogleMark"></mc-block>
          </template>
        </div>
      </template>
    </table>
  </div>
`

class McContainer extends AntiShadowElement implements ReduxBindable {
  width: number
  height: number
  mineNumber: number
  mineArray: object[]
  hideCountBox: boolean

  constructor() {
    super();
  }

  static get template() {
    return _temp;
  }

  stateReceiver(state) {
    this.victory = state.todoReducer.victory;
    this.gameOver = state.todoReducer.gameOver;
    this.markNumber = state.todoReducer.markNumber;
    this.mineArray = state.todoReducer.mineArray;
  }

  connectedCallback() {
    super.connectedCallback();
    connectToRedux(this);
  }

  static get properties() {
    return {
      // victory
      victory: {
        type: Boolean,
        value: appState.getState().todoReducer.victory
      },
      // game over
      gameOver: {
        type: Boolean,
        value: appState.getState().todoReducer.gameOver
      },
      // marked number
      markNumber: {
        type: Boolean,
        value: appState.getState().todoReducer.markNumber
      },
      // mine matrix width number
      width: {
        type: Number,
        value: 9
      },
      // mine matrix height number
      height: {
        type: Number,
        value: 9
      },
      // mine number
      mineNumber: {
        type: Number,
        value: 10
      },
      // mine array data
      mineArray: {
        type: Array,
        value: appState.getState().todoReducer.mineArray
      },
      // game started
      started: {
        type: Boolean,
        value: false
      },
      // game started time number
      timeNumber: {
        type: Number,
        value: 0
      },
      // time show string
      timeStr: {
        type: String,
        computed: '_computeTimeStr(timeNumber)'
      },
      // counting timer
      timer: {
        type: Number,
        value: 0
      }
    }
  }

  _blockClick(e) {
    if (this.gameOver || this.victory) return;
    if (!this.started) {
      this.started = true;
      this._timing();
    }
    appState.dispatch({
      type: 'BLOCK-CLICK',
      payload: e.detail
    });
  }

  _blockDblclick(e) {
    if (this.gameOver || this.victory) return;
    if (!this.started) {
      this.started = true;
      this._timing();
    }
    appState.dispatch({
      type: 'BLOCK-DBLCLICK',
      payload: e.detail
    });
  }

  _toogleMark (e) {
    if (!this.started) {
      this.started = true;
      this._timing();
    }
    if (this.gameOver || this.victory) return;
    appState.dispatch({
      type: 'TOOGLE-MARK',
      payload: e.detail
    });
  }

  _computeTimeStr(timeNumber: number): string {
    if (timeNumber > 0) {
      let hour: any = Math.floor(timeNumber / 3600);
      let min: any = Math.floor(timeNumber / 60) % 60;
      let sec: any = timeNumber % 60;
      if (hour < 10) hour = `0${hour}`;
      if (min < 10) min = `0${min}`;
      if (sec < 10) sec = `0${sec}`;
      return `${hour}:${min}:${sec}`;
    }
    return '00:00:00';
  }

  _timing() {
    if (this.victory || this.gameOver) {
      clearTimeout(this.timer);
      return;
    }
    this.timer = setTimeout(() => {
      this.timeNumber++;
      this._timing();
    }, 1000);
  }

  restart() {
    this.timeNumber = 0;
    appState.dispatch({
      type: 'INIT',
      payload: { width: this.width, height: this.height, mineNumber: this.mineNumber }
    });
  }
}

customElements.define('mc-container', McContainer)

export { McContainer }
