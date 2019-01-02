import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from "@polymer/polymer/polymer-element";

import './McContainer';

class McAdvanced extends PolymerElement {
  static get template() {
    return html`
      <mc-container width="30" height="16" mine-number="99"></mc-container>
    `
  }
}

customElements.define('mc-advanced', McAdvanced);

export { McAdvanced }
