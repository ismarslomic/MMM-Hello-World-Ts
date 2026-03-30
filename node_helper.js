/*! *****************************************************************************
  mmm-hello-world-ts
  Version 1.0.0

  Magic Mirror example module in Typescript
  Please submit bugs at https://github.com/ismarslomic/MMM-Hello-World-Ts/issues

  (c) ismar@slomic.no
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */
"use strict";var e=require("node_helper"),t=require("logger");function i(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(i){if("default"!==i){var r=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(t,i,r.get?r:{enumerable:!0,get:function(){return e[i]}})}})),t.default=e,Object.freeze(t)}var r,n=i(e),E=i(t);!function(e){e.GREETINGS_TEXT_REQUEST="GREETINGS_TEXT_REQUEST",e.GREETINGS_TEXT_RESPONSE="GREETINGS_TEXT_RESPONSE"}(r||(r={})),module.exports=n.create({start(){E.debug(`${this.name} is started!`)},stop(){E.debug(`${this.name} is started!`)},async socketNotificationReceived(e,t){if(e===r.GREETINGS_TEXT_REQUEST){E.debug(`${this.name} received a socket notification: '${e}' with config: ${JSON.stringify(t)}`);const i={text:`${this.name} says: ${t.text}`,lastUpdated:Date.now()};this.sendSocketNotification(r.GREETINGS_TEXT_RESPONSE,i)}else E.error(`${this.name} received unknown socket notification: '${e}'`)}});
//# sourceMappingURL=node_helper.js.map
