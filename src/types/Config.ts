/** Module configuration, set per instance in the `config` section of `config.js`. */
export type Config = {
  /** The greeting text shown by the module. */
  text: string
  /** Time between greeting requests in milliseconds; must be a positive integer. Invalid values fall back to the default. */
  updateInterval: number
  /** Opt in to pausing requests while MagicMirror hides the module (`suspend()`), and refreshing on `resume()`. */
  pauseWhenHidden: boolean
}
