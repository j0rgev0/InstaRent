const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// Activamos soporte para "exports" modernos en los paquetes (como better-auth)
config.resolver.unstable_enablePackageExports = true

// Aplicamos NativeWind al final (esto también modifica el config)
const finalConfig = withNativeWind(config, { input: './global.css' })

module.exports = finalConfig
