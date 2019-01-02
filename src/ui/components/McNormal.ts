import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from "@polymer/polymer/polymer-element";

import './McContainer';

class McNormal extends PolymerElement {
  static get template() {
    return html`
      <mc-container width="16" height="16" mine-number="40"></mc-container>
    `
  }
}

customElements.define('mc-normal', McNormal);

export { McNormal }
