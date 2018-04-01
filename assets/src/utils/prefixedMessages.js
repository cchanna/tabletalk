const prefixedMessages = (prefix, messages) => {
  const result = {};
  Object.keys(messages)
    .forEach(key => {
      result[prefix + "_" + key] = messages[key];
    });
  return result;
}

export default prefixedMessages;