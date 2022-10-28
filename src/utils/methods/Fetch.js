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
