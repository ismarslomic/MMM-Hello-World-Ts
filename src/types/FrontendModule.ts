import { Config } from './Config'

export type GreetingsState = { text: string; lastUpdated: number | null }

type MagicMirrorModule = Module.ModuleProperties<Config>

/**
 * Only the MagicMirror module properties and methods used by this example are required.
 * See https://docs.magicmirror.builders/module-development/core-module-file.html
 *
 * Every member is documented and tagged with its origin:
 * - `@official` - part of the MagicMirror module API (inherited, subclassable or provided by MagicMirror).
 * - `@custom` - added by this module, not known to MagicMirror.
 */
export interface FrontendModule {
  /**
   * @official
   * The name of the module, as registered with `Module.register()`.
   */
  name: MagicMirrorModule['name']

  /**
   * @official
   * Unique identifier of this module instance, e.g. `module_1_MMM-Hello-World-Ts`.
   * Distinguishes multiple instances of the same module.
   */
  identifier: MagicMirrorModule['identifier']

  /**
   * @official
   * The merged configuration of this instance: `defaults` overridden by the values in `config.js`.
   */
  config: MagicMirrorModule['config']

  /**
   * @official
   * Returns the absolute URL of a file inside the module folder, e.g. `this.file('styles.css')`.
   */
  file: MagicMirrorModule['file']

  /**
   * @official
   * Requests MagicMirror to re-render the module by calling `getDom()` (or the template) again.
   *
   * @param speed - Optional animation speed in milliseconds for the transition.
   */
  updateDom: MagicMirrorModule['updateDom']

  /**
   * @official
   * Sends a socket notification to the module's `node_helper`. The helper receives it in its own
   * `socketNotificationReceived()`.
   */
  sendSocketNotification: MagicMirrorModule['sendSocketNotification']

  /**
   * @official
   * Default configuration of the module. Values here are merged with (and overridden by) the `config`
   * defined for the module in `config.js`.
   */
  defaults: Config

  /**
   * @custom
   * The latest greeting received from the node helper. Used by `getTemplateData()` when rendering.
   * `lastUpdated` is `null` until the first response has arrived.
   */
  state?: GreetingsState

  /**
   * @custom
   * Handle of the interval timer that periodically calls `loadData()`.
   * `undefined` when polling is not running.
   */
  pollingTimer?: ReturnType<typeof setInterval>

  /**
   * @custom
   * `true` while polling is paused because the module is hidden (only when `config.pauseWhenHidden` is set).
   * Prevents `startPolling()` from creating a timer and lets `resume()` know it must restart polling.
   */
  isPollingSuspended?: boolean

  /**
   * @official
   * Called when all modules are loaded and the system is ready to boot up.
   * Use it to set up initial state, such as starting update timers or requesting data from the node helper.
   * Note: the DOM is not yet available, and notifications from other modules may not have arrived.
   */
  start(): void

  /**
   * @official
   * Returns an array of CSS file paths (relative to the module folder, see `this.file()`) that
   * MagicMirror loads for this module. Return an empty array if the module has no styles.
   */
  getStyles(): string[]

  /**
   * @official
   * Returns the path (relative to the module folder) of the Nunjucks template used to render the module.
   * The template is rendered with the data returned from `getTemplateData()`.
   * Used by the default `getDom()` implementation.
   */
  getTemplate(): string

  /**
   * @official
   * Returns the data object passed to the Nunjucks template returned by `getTemplate()`.
   * Used by the default `getDom()` implementation.
   */
  getTemplateData(): { text: string; lastUpdated: string }

  /**
   * @official
   * Called when a socket notification arrives from the module's `node_helper`
   * (sent with `sendSocketNotification()` on the node_helper side).
   *
   * @param notification - The identifier of the notification.
   * @param payload - Optional data sent along with the notification.
   */
  socketNotificationReceived(notification: string, payload: unknown): void

  /**
   * @official
   * When a module is hidden (using the `module.hide()` method), the `suspend()` method will be called.
   * By subclassing this method you can perform tasks like halting the update timers.
   */
  suspend(): void

  /**
   * @official
   * When a module is requested to be shown (using the `module.show()` method), the `resume()` method will be called.
   * By subclassing this method you can perform tasks restarting the update timers.
   */
  resume(): void

  /**
   * @custom
   * Starts the interval timer that calls `loadData()` every `config.updateInterval` ms.
   * Any running timer is stopped first, and nothing is started while polling is suspended.
   * An invalid `updateInterval` is logged and replaced by the default.
   */
  startPolling(): void

  /**
   * @custom
   * Stops the interval timer started by `startPolling()`. Safe to call when no timer is running.
   */
  stopPolling(): void

  /**
   * @custom
   * Requests fresh data by sending this instance's identifier and config to the node helper
   * as a socket notification. The response arrives in `socketNotificationReceived()`.
   */
  loadData(): void
}
