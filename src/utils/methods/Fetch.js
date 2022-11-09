export const get_fetch = async (url, payload="", header="") => {
  for (let i in payload) {
    url.searchParams.append(i, payload[i]);
  }
  return fetch(url, { headers: header }).then((response) => response.json());
};

export const post_fetch = async (url, payload, header) => {
  return fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify(payload),
  }).then((response) => response.json());
};


export const fetch_without_payload = async (methods,url, header) => {
  return fetch(url, {
    method: methods,
    headers: header
  }).then((response) => response.json());
};

export const fetch_with_payload = async (methods,url, header,payload) => {
  return fetch(url, {
    method: methods,
    headers: header,
    body:JSON.stringify(payload)
  }).then((response) => response.json());
};

export const fetch_fileUpload = async (methods,url, header,payload) => {
  return fetch(url, {
    method: methods,
    headers: header,
    body:payload
  }).then((response) => response.json());
};