/*! *****************************************************************************
  mmm-hello-world-ts
  Version 1.0.0

  Magic Mirror example module in Typescript
  Please submit bugs at https://github.com/ismarslomic/MMM-Hello-World-Ts/issues

  (c) ismar@slomic.no
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */
'use strict';

var NodeHelper = require('node_helper');
var Log = require('logger');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var Log__namespace = /*#__PURE__*/_interopNamespaceDefault(Log);

var SocketNotification;
(function (SocketNotification) {
    SocketNotification["GREETINGS_TEXT_REQUEST"] = "GREETINGS_TEXT_REQUEST";
    SocketNotification["GREETINGS_TEXT_RESPONSE"] = "GREETINGS_TEXT_RESPONSE";
})(SocketNotification || (SocketNotification = {}));

/**
 * Type guard for {@link GreetingsRequest}. Socket payloads cross a runtime boundary; TypeScript alone
 * cannot validate them. Only `identifier` and `config.text` are checked, as these are the fields the node helper uses.
 */
function isGreetingsRequest(payload) {
    if (typeof payload !== 'object' || payload === null)
        return false;
    if (!('identifier' in payload) || typeof payload.identifier !== 'string')
        return false;
    if (!('config' in payload) || typeof payload.config !== 'object' || payload.config === null)
        return false;
    return 'text' in payload.config && typeof payload.config.text === 'string';
}

// noinspection JSVoidFunctionReturnValueUsed,JSUnusedGlobalSymbols
// Default import preserves static methods on MagicMirror's CommonJS NodeHelper class.
var Backend = NodeHelper.create({
    start() {
        Log__namespace.debug(`${this.name} is started!`);
    },
    stop() {
        Log__namespace.debug(`${this.name} is started!`);
    },
    socketNotificationReceived(notification, request) {
        if (notification === SocketNotification.GREETINGS_TEXT_REQUEST) {
            if (!isGreetingsRequest(request)) {
                Log__namespace.error(`${this.name} received an invalid greeting request`);
                return;
            }
            Log__namespace.debug(`${this.name} received a socket notification: '${notification}' with config: ${JSON.stringify(request)}`);
            const payload = {
                identifier: request.identifier,
                text: `${this.name} says: ${request.config.text}`,
                lastUpdated: Date.now(),
            };
            this.sendSocketNotification(SocketNotification.GREETINGS_TEXT_RESPONSE, payload);
        }
        else {
            Log__namespace.error(`${this.name} received unknown socket notification: '${notification}'`);
        }
    },
});

module.exports = Backend;
//# sourceMappingURL=node_helper.js.map
