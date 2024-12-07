// config-overrides.js
module.exports = function override(config, env) {
    if (env === 'development') {
      if (!config.devServer) {
        config.devServer = {};
      }
      // Ensure allowedHosts is properly set
      config.devServer.allowedHosts = ['localhost', '127.0.0.1'];
    }
    return config;
  };
  