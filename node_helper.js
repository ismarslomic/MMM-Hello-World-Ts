/*! *****************************************************************************
  mmm-hello-world-ts
  Version 1.0.0

  Magic Mirror example module in Typescript
  Please submit bugs at https://github.com/ismarslomic/MMM-Hello-World-Ts/issues

  (c) ismar@slomic.no
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */
"use strict";var e=require("node_helper"),t=require("logger");function i(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(i){if("default"!==i){var n=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(t,i,n.get?n:{enumerable:!0,get:function(){return e[i]}})}})),t.default=e,Object.freeze(t)}var n,r=i(e),o=i(t);!function(e){e.GREETINGS_TEXT_REQUEST="GREETINGS_TEXT_REQUEST",e.GREETINGS_TEXT_RESPONSE="GREETINGS_TEXT_RESPONSE"}(n||(n={})),module.exports=r.create({start(){o.info(`${this.name} is started!`)},stop(){o.info(`${this.name} is started!`)},async socketNotificationReceived(e,t){if(e===n.GREETINGS_TEXT_REQUEST){o.info(`${this.name} received a socket notification: '${e}' with config: ${JSON.stringify(t)}`);const i={text:`${this.name} says: ${t.text}`,lastUpdated:Date.now()};this.sendSocketNotification(n.GREETINGS_TEXT_RESPONSE,i)}else o.error(`${this.name} received unknown socket notification: '${e}'`)}});
//# sourceMappingURL=node_helper.js.map
