const mapObject = (obj, fn) => {
  const result = {};
  Object.keys(obj).forEach(key => {
    result[key] = fn(obj[key]);
  });
  return result;
}

export default mapObject;