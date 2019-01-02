import { AntiShadowElement } from "./util/AntiShadowElement";
import { html } from "@polymer/polymer/polymer-element";

import '@polymer/app-layout/app-layout.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import './components/McJunior';
import './components/McNormal';
import './components/McAdvanced';

const _temp = html`
  <custom-style>
    <style is="custom-style">
      :host {
        --app-drawer-width: 350px;
      }
      app-toolbar {
        background-color: #4285f4;
        color: #fff;
      }
      app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
      }
      app-drawer {
        --app-drawer-content-container: {
          background-color: #B0BEC5;
        }
      }
      .selected-item {
        line-height: 40px;
        padding: 12px;
        cursor: pointer;
      }
      .item-selected {
        background-color: #00897B;
        color: white;
        font-weight: bold;
      }
    </style>
  </custom-style>

  <app-drawer-layout>

    <app-drawer slot="drawer">
      <iron-selector selected="{{page}}" attr-for-selected="id" selected-class="item-selected">
        <div id="junior" class="selected-item">Junior</div>
        <div id="normal" class="selected-item">Normal</div>
        <div id="advanced" class="selected-item">Advanced</div>
      </iron-selector>
    </app-drawer>

    <app-toolbar>
      <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
    </app-toolbar>

    <iron-pages selected="[[page]]" attr-for-selected="id">
      <mc-junior id="junior"></mc-junior>
      <mc-normal id="normal"></mc-normal>
      <mc-advanced id="advanced"></mc-advanced>
    </iron-pages>

  </app-drawer-layout>
`

class McApp extends AntiShadowElement {

  static get template() {
    return _temp;
  }

  static get properties() {
    return {
      // current page
      page: {
        type: String,
        value: 'junior'
      }
    }
  }

}

customElements.define('mc-app', McApp);

export { McApp }
