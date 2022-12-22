export const copyKeys = (keys, target, source) => {
  keys.forEach((key) => {
    target[key] = source[key];
  });
};
