---
"postcss-loader": patch
---

pr: #746
Pass a precompiled options check to `this.getOptions`, so webpack versions that accept it skip compiling the options schema.
