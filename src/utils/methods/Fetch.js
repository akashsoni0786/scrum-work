export const get_fetch = async (url, data, header) => {
  for (let i in data) {
    url.searchParams.append(i, data[i]);
  }
  return fetch(url, { headers: header }).then((response) => response.json());
};

export const post_fetch = async (url, data, header) => {
  for (let i in data) {
    url.searchParams.append(i, data[i]);
  }
  return fetch(url, { headers: header }).then((response) => response.json());
};
