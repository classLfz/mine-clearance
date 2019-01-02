import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from "@polymer/polymer/polymer-element";
import { mixinBehaviors } from '../../../node_modules/@polymer/polymer/lib/legacy/class.js';

import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-button/paper-button.js';

import './McBlock';
import '../../mc-behavior/McCreateBehavior';
import { McCreateBehavior } from '../../mc-behavior/McCreateBehavior';
import { McOperatorBehavior } from '../../mc-behavior/McOperatorBehavior';

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
  </style>
  <paper-toast id="failTipper" horizontal-align="right" text="Sorry! game over."></paper-toast>

  <paper-toast id="victoryTipper" horizontal-align="right" text="YOU WIN!"></paper-toast>

  <div class="countBox">
    <span>mine matrix：[[width]] * [[height]]</span>
    <span>tags：[[leftNumber]] / [[mineNumber]]</span>
    <span>
      <paper-button on-tap="restart">restart</paper-button>
    </span>
  </div>

  <table id="table" cellspacing="0" cellpadding="0">
    <template is="dom-repeat" items="[[mineArray]]">
      <div class="row">
        <template is="dom-repeat" items="[[item]]">
          <mc-block
            mine-object="[[item]]"
            on-mousedown="blockClick"
            on-dblclick="_exposeAround"
            on-cleanaround="_exposeZeroAround">
          </mc-block>
        </template>
      </div>
    </template>
  </table>
`

class McContainer extends mixinBehaviors([McCreateBehavior, McOperatorBehavior], PolymerElement) {
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

  static get properties() {
    return {
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
        type: Array
      }
    }
  }

  _exposeZeroAround(e) {
    let blockXy = e.detail;
    this.exposeZeroAroundBlock(blockXy);
  }

  _exposeAround(e) {
    let blockXy = e.target.blockXy;
    this.exposeAroundBlock(blockXy);
  }

  restart() {
    this.reset();
    this.mineInit(this.width, this.height, this.mineNumber);
  }
}

customElements.define('mc-container', McContainer)

export { McContainer }
