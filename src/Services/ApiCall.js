import { getToken } from "../Utilities";


const checkRefreshToken = async () => {
  let exp = await getTokenInfo();
  exp = JSON.parse(exp);
  const expirationTime = exp - 60000 * 5;
  if (Date.now() > expirationTime) {
    await RefreshToken();
    return;
  }

  return;
};

export const getRequest = async (url) => {
  await checkRefreshToken();
  let token = await getToken();
  console.log('TEST' + url);
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log(' response VHECK divya' + JSON.stringify(response));
      return response.json();
    })
    .then((response) => {
      // console.log(' response vjhgHECK ' + JSON.stringify(response));
      return response;
    })
    .catch((error) => {
      console.log(' response error ' + JSON.stringify(error));
      return error;
    });
};

export const postRequest = async (url, params) => {
//   await checkRefreshToken();
  let token = await getToken();
  console.log('REQ' + url + JSON.stringify(params));
  console.log('params', JSON.stringify(params));
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      // console.log('response', JSON.stringify(response));
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const postRequestwithoutparam = async (url) => {
  await checkRefreshToken();
  let token = await getToken();
  console.log('TEST REQ' + url);

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    //body: JSON.stringify(params),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};