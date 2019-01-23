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

  <div id="block" class$="[[blockClass]]" on-mousedown="_blockClick" on-dblclick="_blockDblclick">
    <template is="dom-if" if="[[mineObject.mark]]">
      <div id="mark">
        <iron-icon icon="grade"></iron-icon>
      </div>
    </template>

    <template is="dom-if" if="[[mineObject.open]]">
      <template is="dom-if" if="[[isMine]]">
        <iron-icon icon="error"></iron-icon>
      </template>

      <template is="dom-if" if="[[!isMine]]">
        [[mine]]
      </template>
    </template>
  </div>
`

interface MineObject {
  mineNumber: number
  open: boolean
  mark: boolean
  blockCoordinate: object
}

class McBlock extends PolymerElement {
  x: number
  y: number
  mineObject: MineObject
  mine: string
  isMine: boolean
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
      x: {
        type: Number,
        value: 0
      },
      y: {
        type: Number,
        value: 0
      },
      mineObject: {
        type: Object,
        value: {
          mineNumber: 1,
          open: false,
          mark: false,
          blockCoordinate: { x: 1, y: 1 }
        }
      },
      mine: {
        type: String,
        computed: '_computeMine(mineObject.mineNumber)'
      },
      isMine: {
        type: Boolean,
        computed: '_computeIsMine(mineObject.mineNumber)'
      },
      markStatus: {
        type: Number,
        value: 0
      },
      blockClass: {
        type: String,
        computed: '_computeBlockClass(mineObject)'
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.oncontextmenu = function() {
      return false;
    }
  }

  _blockClick(e) {
    let btnNum = e.button;

    if (btnNum === 0) {
      if (this.mineObject.mark) return;
      this.dispatchEvent(new CustomEvent('block-click', {
        detail: {
          x: this.x,
          y: this.y
        }
      }));
    }

    if (btnNum === 2) {
      if (this.mineObject.open) return;
      this.dispatchEvent(new CustomEvent('toogle-mark', {
        detail: {
          x: this.x,
          y: this.y
        }
      }))
    }
  }

  _blockDblclick(e) {
    if (this.mineObject.mark) return;
    this.dispatchEvent(new CustomEvent('block-dblclick', {
      detail: {
        x: this.x,
        y: this.y
      }
    }))
  }

  _computeMine(mineNumber: number): any {
    return mineNumber === 0 ? '' : mineNumber;
  }

  _computeIsMine(mineNumber: number): boolean {
    return mineNumber === -1;
  }

  _computeMineNumber(mineObject): number {
    return mineObject.mineNumber;
  }

  _computeBlockXy(mineObject): object {
    return mineObject.blockCoordinate;
  }

  // _computeIsMark(markStatus: number): boolean {
  //   if (markStatus === 0) {
  //     return false;
  //   }

  //   if (markStatus === 1) {
  //     return true;
  //   }
  //   this.markStatus = 0;
  //   return false;
  // }

  _computeBlockClass(mineObject): string {
    if (mineObject.open) return 'know';
    if (mineObject.mark) return 'mark';
    return 'unknow';
  }
}

customElements.define('mc-block', McBlock);

export { McBlock }
