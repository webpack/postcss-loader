// Passes a source map for `file-0.css` only
module.exports = function mapLoader(content) {
  if (!this.resourcePath.endsWith("file-0.css")) {
    return content;
  }

  this.callback(null, content, {
    version: 3,
    sources: ["file-0.css"],
    names: [],
    mappings: "AAAA",
    file: "file-0.css",
    sourcesContent: [content],
  });
};
