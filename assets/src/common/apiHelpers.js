const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const deserialize = response => response.json(); 

const request = (urlInput, {method = "GET", queries, body, jwt}) => {
  let url = urlInput;

  // build query string
  let first = true;
  for (const query in queries) {
    if (first) { 
      url += "?";
      first = false;
    }
    else url += "&";
    
    url += `${query}=${queries[query]}`;
  }

  const headers = {}
  if (jwt) {
    headers['Authorization'] = "Bearer " + jwt;
  }
  if (method !== "GET") {
    headers['Content-Type'] = 'application/json';
  }
  
  const opts = {
    method,
    body: (method === "GET") ? undefined : JSON.stringify(body),
    headers
  }
  const finalUrl = process.env.NODE_ENV === "production" ? ("/" + url) : `http://${process.env.REACT_APP_API_URL}/${url}`;
  return fetch(finalUrl, opts)
    .then(checkStatus)
    .then(deserialize);
}

export const get = (url, {queries, jwt} = {}) => request(url, {method: "GET", queries, jwt});
export const post = (url, {body, jwt} = {}) => request(url, {method: "POST", body, jwt});

const addUrl = (fn, added) => (url, opts) => fn(`${added}/${url}`, opts);

export const withUrl = (args, added) => {
  if (added === undefined) return withUrl({get, post}, args);
  else if (typeof args === "function") return addUrl(args, added);
  else {
    const result = {};
    for (const key in args) {
      result[key] = withUrl(args[key], added);
    }
    return result;
  }
}