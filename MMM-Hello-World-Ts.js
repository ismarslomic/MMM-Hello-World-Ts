/*! *****************************************************************************
  mmm-hello-world-ts
  Version 1.0.0

  Magic Mirror example module in Typescript
  Please submit bugs at https://github.com/ismarslomic/MMM-Hello-World-Ts/issues

  (c) ismar@slomic.no
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("logger")):"function"==typeof define&&define.amd?define(["logger"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Log)}(this,(function(e){"use strict";function t(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(i){if("default"!==i){var n=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(t,i,n.get?n:{enumerable:!0,get:function(){return e[i]}})}})),t.default=e,Object.freeze(t)}var i,n=t(e);!function(e){e.GREETINGS_TEXT_REQUEST="GREETINGS_TEXT_REQUEST",e.GREETINGS_TEXT_RESPONSE="GREETINGS_TEXT_RESPONSE"}(i||(i={}));const s={defaults:{text:"Hello World!"},start(){n.debug(`${this.name} is starting`),this.state={text:this.config.text,lastUpdated:null},this.loadData(),this.scheduleUpdate(),this.updateDom()},getStyles(){return[this.file("css/MMM-Hello-World-Ts.css")]},getTemplate:()=>"templates/MMM-Hello-World-Ts.njk",getTemplateData(){const e=this.state?.lastUpdated;return{text:this.state?.text??this.config.text,lastUpdated:null==e?"":new Date(e).toLocaleString()}},socketNotificationReceived(e,t){if(e===i.GREETINGS_TEXT_RESPONSE){if(!function(e){return"object"==typeof e&&null!==e&&"identifier"in e&&"string"==typeof e.identifier&&"text"in e&&"string"==typeof e.text&&"lastUpdated"in e&&"number"==typeof e.lastUpdated&&Number.isFinite(e.lastUpdated)&&!Number.isNaN(new Date(e.lastUpdated).getTime())}(t))return void n.error(`${this.name} received an invalid greeting response`);if(t.identifier!==this.identifier)return;n.debug(`${this.name} received a socket notification: '${e}' with payload: ${JSON.stringify(t)}`),this.state=t,this.updateDom()}else n.error(`${this.name} received unknown socket notification: '${e}'`)},scheduleUpdate(){setInterval((()=>{this.loadData()}),1e4)},loadData(){n.debug(`${this.name} is loading data`);const e={identifier:this.identifier,config:this.config};this.sendSocketNotification(i.GREETINGS_TEXT_REQUEST,e)}};Module.register("MMM-Hello-World-Ts",s)}));
//# sourceMappingURL=MMM-Hello-World-Ts.js.map
