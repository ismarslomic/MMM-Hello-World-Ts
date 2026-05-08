import ModuleProperties = Module.ModuleProperties

export interface MM2ModuleHelper {
  /**
   * This function has to be called for the module to be used
   * @param moduleName the name of the module
   * @param moduleProperties an object with the module properties
   */
  register<T>(moduleName: string, moduleProperties: ThisType<ModuleProperties<T>> & Partial<ModuleProperties<T>>): void
}
