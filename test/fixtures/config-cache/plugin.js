module.exports = (options = {}) => ({
  postcssPlugin: "config-cache-plugin",
  Once(root) {
    root.append({ text: `config: ${options.label}` });
    root.append({ text: `prev map: ${Boolean(root.source.input.map)}` });
  },
});

module.exports.postcss = true;
