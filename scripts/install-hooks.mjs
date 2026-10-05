const omittedDependencies = (process.env.npm_config_omit ?? '').split(/[\s,]+/)
const isProductionInstall = process.env.NODE_ENV === 'production' || omittedDependencies.includes('dev')
const shouldSkipHooks = Boolean(process.env.CI) || process.env.HUSKY === '0' || isProductionInstall

// Production installs have no Husky dependency; only import it for development.
if (!shouldSkipHooks) {
  const { default: installHooks } = await import('husky')
  const message = installHooks()
  if (message) {
    console.log(message)
  }
}
