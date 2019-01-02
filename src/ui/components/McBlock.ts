import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from "@polymer/polymer/polymer-element";

import '@polymer/iron-icon/iron-icon.js';

const _temp = html`
  <style>
    :host {
      display: inline-table;
      cursor: default;
      margin: 0px;
      border: 1px solid white;
    }
    #block {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      overflow: hidden;
    }
    .unknow {
      background-color: gray;
    }
    .know {
      background-color: #e4e4e4;
      color: black;
    }
    .mark {
      background-color: #ffa96c;
    }
  </style>

  <div id="block" class$="[[blockClass]]">
    <template is="dom-if" if="[[isMark]]">
      <div id="mark">
        <iron-icon icon="grade"></iron-icon>
      </div>
    </template>

    <template is="dom-if" if="[[isOpen]]">
      <template is="dom-if" if="[[isMine]]">
        <iron-icon icon="error"></iron-icon>
      </template>

      <template is="dom-if" if="[[!isMine]]">
        [[mine]]
      </template>
    </template>
  </div>
`

class McBlock extends PolymerElement {
  mineObject: object
  mine: string
  mineNumber: number
  blockXy: object
  isMine: boolean
  isOpen: boolean
  isMark: boolean
  markStatus: number
  blockClass: string

  constructor() {
    super()
  }

  static get template() {
    return _temp;
  }

  static get properties() {
    return {
      mineObject: {
        type: Object,
        value: {
          mineNumber: 1,
          blockCoordinate: { x: 1, y: 1 }
        }
      },
      mine: {
        type: String,
        computed: '_computeMine(mineNumber)'
      },
      mineNumber: {
        type: Number,
        computed: '_computeMineNumber(mineObject)'
      },
      blockXy: {
        type: Object,
        computed: '_computeBlockXy(mineObject)'
      },
      isMine: {
        type: Boolean,
        computed: '_computeIsMine(mineNumber)'
      },
      isOpen: {
        type: Boolean,
        value: false
      },
      isMark: {
        type: Boolean,
        computed: '_computeIsMark(markStatus)'
      },
      markStatus: {
        type: Number,
        value: 0
      },
      blockClass: {
        type: String,
        computed: '_computeBlockClass(mineNumber, isOpen, isMark)'
      }
    }
  }

  connectedCallback() {
    this.oncontextmenu = function() {
      return false;
    }
  }

  _computeMine(mineNumber): any {
    return mineNumber === 0 ? '' : mineNumber;
  }

  _computeIsMine(mineNumber): boolean {
    return mineNumber === -1;
  }

  _computeMineNumber(mineObject): number {
    return mineObject.mineNumber;
  }

  _computeBlockXy(mineObject): object {
    return mineObject.blockCoordinate;
  }

  _computeIsMark(markStatus): boolean {
    if (markStatus === 0) {
      return false;
    }

    if (markStatus === 1) {
      return true;
    }
    this.markStatus = 0;
    return false;
  }

  _computeBlockClass(mineNumber, isOpen, isMark): string {
    if (isOpen) {
      if (mineNumber === 0) {
        this.dispatchEvent(new CustomEvent('cleanaround', {detail: this.blockXy}));
      }
      return 'know';
    }

    if (isMark) return 'mark';
    return 'unknow';
  }
}

customElements.define('mc-block', McBlock);

export { McBlock }
