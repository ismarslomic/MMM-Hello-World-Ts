export type Config = {
  text: string
  /** Time between greeting requests in milliseconds; must be a positive integer. */
  updateInterval: number
  /** Opt in to pausing requests while MagicMirror hides the module. */
  pauseWhenHidden: boolean
}
