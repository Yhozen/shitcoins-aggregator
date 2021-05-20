const extraNodeModules = require('node-libs-browser');

module.exports = {
    resolver: {
      extraNodeModules: {
        // Polyfills for node libraries
        ...extraNodeModules,
        "crypto": require.resolve("expo-crypto"),
      }
    },
    // other metro config, etc
  }