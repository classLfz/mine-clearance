import { appState } from '../../state/store';
import { AntiShadowElement } from "../util/AntiShadowElement";
import { html } from "@polymer/polymer/polymer-element";

import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-button/paper-button.js';

import './McBlock';
import { connectToRedux, ReduxBindable } from "../util/ReduxConnector";

const _temp = html`
  <style>
    :host {
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
      padding-bottom: 48px;
      margin: 0 auto;
      text-align: center;
      box-shadow: 0px 0px 0px #6f6f6f;
    }
    #failTipper {
      background-color: red;
    }
    #victoryTipper {
      background-color: green;
    }
    .cover-container {
      width: 100%;
      height: 40px;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: red;
    }
  </style>
  <paper-toast id="failTipper" horizontal-align="right" text="Sorry! game over."></paper-toast>

  <paper-toast id="victoryTipper" horizontal-align="right" text="YOU WIN!"></paper-toast>

  <div class="cover-container">
    <template is="dom-if" if="[[gameOver]]">
      <h3>GAME OVER!</h3>
    </template>
    <template is="dom-if" if="[[victory]]">
      <h3>VICTORY!</h3>
    </template>
  </div>

  <div class="countBox">
    <span>mine matrix：[[width]] * [[height]]</span>
    <span>tags：[[leftNumber]] / [[mineNumber]]</span>
    <span>
      <paper-button on-tap="restart">restart</paper-button>
    </span>
  </div>

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
`

class McContainer extends AntiShadowElement implements ReduxBindable {
  width: number
  height: number
  mineNumber: number
  mineArray: object[]
  hideCountBox: boolean

  constructor() {
    super()
  }

  static get template() {
    return _temp;
  }

  stateReceiver(state) {
    this.victory = state.todoReducer.victory;
    this.gameOver = state.todoReducer.gameOver;
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
      }
    }
  }

  _blockClick(e) {
    if (this.gameOver) return;
    appState.dispatch({
      type: 'BLOCK-CLICK',
      payload: e.detail
    })
  }

  _blockDblclick(e) {
    if (this.gameOver) return;
    appState.dispatch({
      type: 'BLOCK-DBLCLICK',
      payload: e.detail
    })
  }

  _toogleMark (e) {
    if (this.gameOver) return;
    appState.dispatch({
      type: 'TOOGLE-MARK',
      payload: e.detail
    })
  }

  restart() {
    appState.dispatch({
      type: 'INIT',
      payload: { width: this.width, height: this.height, mineNumber: this.mineNumber }
    })
  }
}

customElements.define('mc-container', McContainer)

export { McContainer }
