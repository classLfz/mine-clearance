import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from "@polymer/polymer/polymer-element";

import './McContainer';

class McJunior extends PolymerElement {
  static get template() {
    return html`
      <mc-container width="9" height="9" mine-number="10"></mc-container>
    `
  }
}

customElements.define('mc-junior', McJunior);

export { McJunior }
