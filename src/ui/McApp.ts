import { AntiShadowElement } from "./util/AntiShadowElement";
import { html } from "@polymer/polymer/polymer-element";

import '@polymer/app-layout/app-layout.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import './components/McContainer';

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
      .container {
        display: flex;
        justify-content: center;
        margin-top: 24px;
      }
      #container {
        height: 100%;
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
      <h4 main-title>Mine-Clearance-Polymer</h4>
      <h5>classlfz@qq.com</h5>
    </app-toolbar>

    <div class="container">
      <mc-container id="container" width="[[width]]" height="[[height]]" mine-number="[[mineNumber]]"></mc-container>
    </div>

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
        value: 'junior',
        observer: '_pageChanged'
      },

      width: {
        type: Number,
        value: 9
      },

      height: {
        type: Number,
        value: 9
      },

      mineNumber: {
        type: Number,
        value: 10
      },

      gameSettings: {
        type: Object,
        value: {
          junior: {
            width: 9,
            height: 9,
            mineNumber: 10
          },

          normal: {
            width: 16,
            height: 16,
            mineNumber: 40
          },

          advanced: {
            width: 30,
            height: 16,
            mineNumber: 99
          }
        }
      }
    }
  }

  _pageChanged(page) {
    if (this.$[page] && this.gameSettings[page]) {
      this.set('width', this.gameSettings[page].width);
      this.set('height', this.gameSettings[page].height);
      this.set('mineNumber', this.gameSettings[page].mineNumber);
      this.$.container.restart();
    }
  }
}

customElements.define('mc-app', McApp);

export { McApp }
