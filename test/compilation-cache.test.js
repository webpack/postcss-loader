import {
  createCompilationCache,
  getCompilation,
} from "../src/compilation-cache";

describe("compilation cache", () => {
  it("should return the compilation of a loader context", () => {
    const compilation = {};

    expect(getCompilation({ _compilation: compilation })).toBe(compilation);
    expect(getCompilation({})).toBeUndefined();
    expect(getCompilation()).toBeUndefined();
  });

  it("should cache a value per compilation and keys", () => {
    const cache = createCompilationCache();
    const compilation = {};
    const context = { _compilation: compilation };
    const key = {};
    const factory = jest.fn(() => ({}));

    const value = cache.get(context, [key, "a"], factory);

    expect(cache.get({ _compilation: compilation }, [key, "a"], factory)).toBe(
      value,
    );
    expect(factory).toHaveBeenCalledTimes(1);
    expect(cache.has(context, [key, "a"])).toBe(true);

    // Other keys
    expect(cache.get(context, [key, "b"], factory)).not.toBe(value);
    expect(cache.get(context, [{}, "a"], factory)).not.toBe(value);
    expect(cache.get(context, [key], factory)).not.toBe(value);
    expect(factory).toHaveBeenCalledTimes(4);

    // Another compilation
    expect(cache.get({ _compilation: {} }, [key, "a"], factory)).not.toBe(
      value,
    );
    expect(factory).toHaveBeenCalledTimes(5);
  });

  it("should compare primitive keys by value and objects by identity", () => {
    const cache = createCompilationCache();
    const context = { _compilation: {} };
    const fn = () => {};
    const factory = jest.fn(() => ({}));

    for (const keys of [[1, "1", null, undefined, true, fn]]) {
      const value = cache.get(context, keys, factory);

      expect(cache.get(context, [...keys], factory)).toBe(value);
    }

    expect(factory).toHaveBeenCalledTimes(1);
    expect(cache.has(context, ["1", "1", null, undefined, true, fn])).toBe(
      false,
    );
    expect(cache.has(context, [1, "1", null, undefined, true, () => {}])).toBe(
      false,
    );
  });

  it("should cache falsy values", () => {
    const cache = createCompilationCache();
    const context = { _compilation: {} };
    const factory = jest.fn(() => undefined);

    cache.get(context, [], factory);
    cache.get(context, [], factory);

    expect(factory).toHaveBeenCalledTimes(1);
  });

  it("should not cache without a compilation", () => {
    const cache = createCompilationCache();
    const factory = jest.fn(() => ({}));

    expect(cache.get({}, [], factory)).not.toBe(cache.get({}, [], factory));
    expect(factory).toHaveBeenCalledTimes(2);
    expect(cache.has({}, [])).toBe(false);
    expect(cache.delete({}, [])).toBe(false);
  });

  it("should not cache a thrown error", () => {
    const cache = createCompilationCache();
    const context = { _compilation: {} };
    const factory = jest
      .fn()
      .mockImplementationOnce(() => {
        throw new Error("failed");
      })
      .mockReturnValue("value");

    expect(() => cache.get(context, ["key"], factory)).toThrow("failed");
    expect(cache.has(context, ["key"])).toBe(false);
    expect(cache.get(context, ["key"], factory)).toBe("value");
    expect(cache.get(context, ["key"], factory)).toBe("value");
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it("should share a pending promise and not keep a rejected one", async () => {
    const cache = createCompilationCache();
    const context = { _compilation: {} };
    const factory = jest
      .fn()
      .mockRejectedValueOnce(new Error("failed"))
      .mockResolvedValue("value");

    const rejected = cache.get(context, ["key"], factory);

    expect(cache.get(context, ["key"], factory)).toBe(rejected);
    await expect(rejected).rejects.toThrow("failed");
    expect(cache.has(context, ["key"])).toBe(false);

    const resolved = cache.get(context, ["key"], factory);

    await expect(resolved).resolves.toBe("value");
    expect(cache.get(context, ["key"], factory)).toBe(resolved);
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it("should delete a value", () => {
    const cache = createCompilationCache();
    const context = { _compilation: {} };
    const factory = jest.fn(() => ({}));

    const value = cache.get(context, ["key"], factory);

    expect(cache.delete(context, ["key"])).toBe(true);
    expect(cache.delete(context, ["key"])).toBe(false);
    expect(cache.delete(context, ["other", "key"])).toBe(false);
    // Only primitive keys are stored, so there is no store for object keys
    expect(cache.delete(context, [{}])).toBe(false);
    // A compilation without values
    expect(cache.has({ _compilation: {} }, ["key"])).toBe(false);
    expect(cache.get(context, ["key"], factory)).not.toBe(value);
  });
});
