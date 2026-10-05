/*! *****************************************************************************
  mmm-hello-world-ts
  Version 1.0.0

  Magic Mirror example module in Typescript
  Please submit bugs at https://github.com/ismarslomic/MMM-Hello-World-Ts/issues

  (c) ismar@slomic.no
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('logger')) :
    typeof define === 'function' && define.amd ? define(['logger'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Log));
})(this, (function (Log) { 'use strict';

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

    /**
     * Type guard for {@link GreetingsRequest}. Socket payloads cross a runtime boundary; TypeScript alone
     * cannot validate them. Only `identifier` and `config.text` are checked, as these are the fields the node helper uses.
     */
    /**
     * Type guard for {@link GreetingsResponse}. Requires string `identifier` and `text`, and a finite
     * `lastUpdated` that is a valid date timestamp.
     */
    function isGreetingsResponse(payload) {
        if (typeof payload !== 'object' || payload === null)
            return false;
        return ('identifier' in payload &&
            typeof payload.identifier === 'string' &&
            'text' in payload &&
            typeof payload.text === 'string' &&
            'lastUpdated' in payload &&
            typeof payload.lastUpdated === 'number' &&
            Number.isFinite(payload.lastUpdated) &&
            !Number.isNaN(new Date(payload.lastUpdated).getTime()));
    }

    var SocketNotification;
    (function (SocketNotification) {
        SocketNotification["GREETINGS_TEXT_REQUEST"] = "GREETINGS_TEXT_REQUEST";
        SocketNotification["GREETINGS_TEXT_RESPONSE"] = "GREETINGS_TEXT_RESPONSE";
    })(SocketNotification || (SocketNotification = {}));

    // JavaScript timers use a signed 32-bit delay; larger values overflow.
    const maximumTimerDelay = 2 ** 31 - 1;
    const frontendModule = {
        defaults: {
            text: 'Hello World!',
            updateInterval: 10000,
            pauseWhenHidden: false,
        },
        start() {
            Log__namespace.debug(`${this.name} is starting`);
            this.state = { text: this.config.text, lastUpdated: null };
            this.loadData();
            this.startPolling();
            this.updateDom();
        },
        getStyles() {
            return [this.file('css/MMM-Hello-World-Ts.css')];
        },
        getTemplate() {
            return 'templates/MMM-Hello-World-Ts.njk';
        },
        getTemplateData() {
            const lastUpdated = this.state?.lastUpdated;
            return {
                text: this.state?.text ?? this.config.text,
                lastUpdated: lastUpdated == null ? '' : new Date(lastUpdated).toLocaleString(),
            };
        },
        socketNotificationReceived(notificationIdentifier, payload) {
            if (notificationIdentifier === SocketNotification.GREETINGS_TEXT_RESPONSE) {
                if (!isGreetingsResponse(payload)) {
                    Log__namespace.error(`${this.name} received an invalid greeting response`);
                    return;
                }
                // The helper broadcasts to every instance of this module type.
                if (payload.identifier !== this.identifier) {
                    return;
                }
                Log__namespace.debug(`${this.name} received a socket notification: '${notificationIdentifier}' with payload: ${JSON.stringify(payload)}`);
                this.state = payload;
                this.updateDom();
            }
            else {
                Log__namespace.error(`${this.name} received unknown socket notification: '${notificationIdentifier}'`);
            }
        },
        suspend() {
            if (this.config.pauseWhenHidden) {
                this.isPollingSuspended = true;
                this.stopPolling();
            }
        },
        resume() {
            // Repeated show calls must not create extra timers or requests.
            if (this.config.pauseWhenHidden && this.isPollingSuspended) {
                this.isPollingSuspended = false;
                this.loadData();
                this.startPolling();
            }
        },
        startPolling() {
            this.stopPolling();
            if (this.isPollingSuspended) {
                return;
            }
            const configuredInterval = this.config.updateInterval;
            const isValidInterval = Number.isInteger(configuredInterval) && configuredInterval > 0 && configuredInterval <= maximumTimerDelay;
            const updateInterval = isValidInterval ? configuredInterval : this.defaults.updateInterval;
            if (!isValidInterval) {
                Log__namespace.error(`${this.name} has an invalid updateInterval; using ${updateInterval} ms`);
            }
            this.pollingTimer = setInterval(() => {
                this.loadData();
            }, updateInterval);
        },
        stopPolling() {
            if (this.pollingTimer !== undefined) {
                clearInterval(this.pollingTimer);
                this.pollingTimer = undefined;
            }
        },
        loadData() {
            Log__namespace.debug(`${this.name} is loading data`);
            const request = { identifier: this.identifier, config: this.config };
            this.sendSocketNotification(SocketNotification.GREETINGS_TEXT_REQUEST, request);
        },
    };
    Module.register('MMM-Hello-World-Ts', frontendModule);

}));
//# sourceMappingURL=MMM-Hello-World-Ts.js.map
