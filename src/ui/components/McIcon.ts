import { PolymerElement } from '@polymer/polymer/polymer-element';
import {html} from "@polymer/polymer/polymer-element";

class McIcon extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <template is="dom-if" if="[[isMine]]">
        <iron-icon icon="refresh"></iron-icon>
      </template>
    `
  }

  static get properties() {
    return {
      isMine: {
        type: Boolean, value: false
      }
    }
  }
}

export { McIcon }
