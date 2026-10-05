/*! *****************************************************************************
  mmm-hello-world-ts
  Version 1.0.0

  Magic Mirror example module in Typescript
  Please submit bugs at https://github.com/ismarslomic/MMM-Hello-World-Ts/issues

  (c) ismar@slomic.no
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */
"use strict";var e=require("node_helper");function t(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(i){if("default"!==i){var n=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(t,i,n.get?n:{enumerable:!0,get:function(){return e[i]}})}})),t.default=e,Object.freeze(t)}var i,n=t(require("logger"));!function(e){e.GREETINGS_TEXT_REQUEST="GREETINGS_TEXT_REQUEST",e.GREETINGS_TEXT_RESPONSE="GREETINGS_TEXT_RESPONSE"}(i||(i={}));var r=e.create({start(){n.debug(`${this.name} is started!`)},stop(){n.debug(`${this.name} is started!`)},socketNotificationReceived(e,t){if(e===i.GREETINGS_TEXT_REQUEST){if(!function(e){return"object"==typeof e&&null!==e&&"identifier"in e&&"string"==typeof e.identifier&&"config"in e&&"object"==typeof e.config&&null!==e.config&&"text"in e.config&&"string"==typeof e.config.text}(t))return void n.error(`${this.name} received an invalid greeting request`);n.debug(`${this.name} received a socket notification: '${e}' with config: ${JSON.stringify(t)}`);const r={identifier:t.identifier,text:`${this.name} says: ${t.config.text}`,lastUpdated:Date.now()};this.sendSocketNotification(i.GREETINGS_TEXT_RESPONSE,r)}else n.error(`${this.name} received unknown socket notification: '${e}'`)}});module.exports=r;
//# sourceMappingURL=node_helper.js.map
