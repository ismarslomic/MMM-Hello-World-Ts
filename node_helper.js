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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9oZWxwZXIuanMiLCJzb3VyY2VzIjpbInNyYy9jb25zdGFudHMvU29ja2V0Tm90aWZpY2F0aW9ucy50cyIsInNyYy9iYWNrZW5kL0JhY2tlbmQudHMiXSwic291cmNlc0NvbnRlbnQiOltudWxsLG51bGxdLCJuYW1lcyI6WyJTb2NrZXROb3RpZmljYXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIiwiTm9kZUhlbHBlciIsImNyZWF0ZSIsInN0YXJ0IiwiTG9nIiwiZGVidWciLCJ0aGlzIiwibmFtZSIsInN0b3AiLCJhc3luYyIsIm5vdGlmaWNhdGlvbiIsImNvbmZpZyIsIkdSRUVUSU5HU19URVhUX1JFUVVFU1QiLCJKU09OIiwic3RyaW5naWZ5IiwicGF5bG9hZCIsInRleHQiLCJsYXN0VXBkYXRlZCIsIkRhdGUiLCJub3ciLCJzZW5kU29ja2V0Tm90aWZpY2F0aW9uIiwiR1JFRVRJTkdTX1RFWFRfUkVTUE9OU0UiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3FVQUFZQSxpQkFBWixTQUFZQSxHQUNWQSxFQUFBLHVCQUFBLHlCQUNBQSxFQUFBLHdCQUFBLHlCQUNELENBSEQsQ0FBWUEsSUFBQUEsRUFBa0IsQ0FBQSxJQ085QkMsT0FBT0MsUUFBVUMsRUFBV0MsT0FBTyxDQUNqQ0MsUUFDRUMsRUFBSUMsTUFBTSxHQUFHQyxLQUFLQyxtQkFDcEIsRUFFQUMsT0FDRUosRUFBSUMsTUFBTSxHQUFHQyxLQUFLQyxtQkFDcEIsRUFFQUUsaUNBQWlDQyxFQUFrQ0MsR0FDakUsR0FBSUQsSUFBaUJaLEVBQW1CYyx1QkFBd0IsQ0FDOURSLEVBQUlDLE1BQU0sR0FBR0MsS0FBS0MseUNBQXlDRyxtQkFBOEJHLEtBQUtDLFVBQVVILE1BQ3hHLE1BQU1JLEVBQVUsQ0FDZEMsS0FBTSxHQUFHVixLQUFLQyxjQUFjSSxFQUFPSyxPQUNuQ0MsWUFBYUMsS0FBS0MsT0FFcEJiLEtBQUtjLHVCQUF1QnRCLEVBQW1CdUIsd0JBQXlCTixFQUMxRSxNQUNFWCxFQUFJa0IsTUFBTSxHQUFHaEIsS0FBS0MsK0NBQStDRyxLQUVyRSJ9
