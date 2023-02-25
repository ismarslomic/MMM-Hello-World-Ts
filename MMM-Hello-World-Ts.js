/*! *****************************************************************************
  mmm-hello-world-ts
  Version 1.0.0

  Magic Mirror example module in Typescript
  Please submit bugs at https://github.com/ismarslomic/MMM-Hello-World-Ts/issues

  (c) ismar@slomic.no
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("logger")):"function"==typeof define&&define.amd?define(["logger"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Log)}(this,(function(e){"use strict";function t(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(i){if("default"!==i){var o=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(t,i,o.get?o:{enumerable:!0,get:function(){return e[i]}})}})),t.default=e,Object.freeze(t)}var i,o=t(e);!function(e){e.GREETINGS_TEXT_REQUEST="GREETINGS_TEXT_REQUEST",e.GREETINGS_TEXT_RESPONSE="GREETINGS_TEXT_RESPONSE"}(i||(i={})),Module.register("MMM-Hello-World-Ts",{defaults:{text:"Hello World!"},start(){o.info(`${this.name} is starting`),this.loadData(),this.scheduleUpdate(),this.updateDom()},getTemplate:()=>"templates/MMM-Hello-World-Ts.njk",getTemplateData(){return{text:this.state?.text,lastUpdated:new Date(this.state?.lastUpdated).toLocaleString()}},socketNotificationReceived(e,t){e===i.GREETINGS_TEXT_RESPONSE?(o.info(`${this.name} received a socket notification: '${e}' with payload: ${JSON.stringify(t)}`),this.state=t,this.updateDom()):o.error(`${this.name} received unknown socket notification: '${e}'`)},scheduleUpdate(){setInterval((()=>{this.loadData()}),1e4)},loadData(){o.info(`${this.name} is loading data`),this.sendSocketNotification("GREETINGS_TEXT_REQUEST",this.config)}})}));
//# sourceMappingURL=MMM-Hello-World-Ts.js.map
