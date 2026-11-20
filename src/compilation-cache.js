/**
 * Caches scoped to a webpack compilation.
 *
 * Loaders run once per module, so work that does not depend on the module
 * (searching and loading a config file, resolving and creating plugins,
 * creating a compiler or processor) is repeated for every file. These
 * helpers keep such values for the lifetime of one compilation:
 *
 * - a new compilation (e.g. a watch rebuild) starts with an empty cache, so
 *   changes to config files are picked up;
 * - values are held in `WeakMap`s keyed by the compilation (and by object
 *   keys), so they are garbage-collected together with it;
 * - without a compilation object (e.g. a loader called directly, or
 *   `thread-loader`, which passes a new stub context for every file), nothing
 *   is cached and the factory runs every time.
 *
 * The module has no dependencies on the loader, so other loaders that load
 * configuration can use the same approach.
 */

const VALUE = Symbol("value");

function isObjectKey(key) {
  return (typeof key === "object" && key !== null) || typeof key === "function";
}

function getChild(node, key, create) {
  const store = isObjectKey(key) ? "weak" : "strong";

  if (!node[store]) {
    if (!create) {
      return undefined;
    }

    node[store] = store === "weak" ? new WeakMap() : new Map();
  }

  let child = node[store].get(key);

  if (!child && create) {
    child = {};
    node[store].set(key, child);
  }

  return child;
}

/**
 * Returns the compilation of a loader context, or `undefined` when there is none.
 *
 * @param {object} loaderContext Loader context
 * @returns {object | undefined} Compilation
 */
function getCompilation(loaderContext) {
  return (loaderContext && loaderContext._compilation) || undefined;
}

/**
 * Creates a cache of values per compilation and list of keys.
 *
 * Object and function keys are compared by identity and held weakly,
 * primitive keys are compared by value. Use a separate cache for each kind of
 * value, so different values never share a key.
 *
 * When the factory throws or returns a promise that rejects, nothing is
 * cached, so the error is reported for every file, and the next call tries
 * again.
 *
 * @example
 * const explorerCache = createCompilationCache();
 *
 * const explorer = explorerCache.get(loaderContext, [moduleName], () =>
 *   cosmiconfig(moduleName, options),
 * );
 *
 * @returns {{
 *   get: <T>(loaderContext: object, keys: any[], factory: () => T) => T,
 *   has: (loaderContext: object, keys: any[]) => boolean,
 *   delete: (loaderContext: object, keys: any[]) => boolean,
 * }} Cache
 */
function createCompilationCache() {
  const compilations = new WeakMap();

  function find(compilation, keys, create) {
    let node = compilations.get(compilation);

    if (!node) {
      if (!create) {
        return undefined;
      }

      node = {};
      compilations.set(compilation, node);
    }

    for (const key of keys) {
      node = getChild(node, key, create);

      if (!node) {
        return undefined;
      }
    }

    return node;
  }

  return {
    get(loaderContext, keys, factory) {
      const compilation = getCompilation(loaderContext);

      if (!compilation) {
        return factory();
      }

      const node = find(compilation, keys, true);

      if (VALUE in node) {
        return node[VALUE];
      }

      const value = factory();

      node[VALUE] = value;

      if (value && typeof value.then === "function") {
        // Do not keep a rejected promise, the next call tries again
        value.then(undefined, () => {
          if (node[VALUE] === value) {
            delete node[VALUE];
          }
        });
      }

      return value;
    },
    has(loaderContext, keys) {
      const compilation = getCompilation(loaderContext);
      const node = compilation && find(compilation, keys, false);

      return Boolean(node) && VALUE in node;
    },
    delete(loaderContext, keys) {
      const compilation = getCompilation(loaderContext);
      const node = compilation && find(compilation, keys, false);

      if (!node || !(VALUE in node)) {
        return false;
      }

      delete node[VALUE];

      return true;
    },
  };
}

export { createCompilationCache, getCompilation };
