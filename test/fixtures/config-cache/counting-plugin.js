// Counts how many instances are created, in `global.configCachePluginCount`
module.exports = (options = {}) => {
  global.configCachePluginCount = (global.configCachePluginCount || 0) + 1;

  return {
    postcssPlugin: "config-cache-counting-plugin",
    Once(root) {
      root.append({ text: `counting: ${options.label || "none"}` });
    },
  };
};

module.exports.postcss = true;
