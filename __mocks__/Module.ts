import ModuleProperties = Module.ModuleProperties

export interface MM2ModuleHelper {
  /**
   * This function has to be called for the module to be used
   * @param moduleName the name of the module
   * @param moduleProperties an object with the module properties
   */
  register<Config>(moduleName: string, moduleProperties: ModuleProperties<Config>): void
}
