import store from '@/store';

const baseURL = process.env.VUE_APP_SERVER_URL;
const headers = { 'Content-Type': 'application/json' };

const GET = async (url, options) => {
  const response = await fetch(baseURL + '/' + store.getters['auth/userId'] + url, { headers: headers, ...options });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Failed to fetch data'); ;
  }
};

const POST = async (url, body, options) => {
  const response = await fetch(baseURL + '/' + store.getters['auth/userId'] + url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
    ...options,
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Failed to create data'); ;
  }
};

const PUT = async (url, body, options) => {
  const response = await fetch(baseURL + '/' + store.getters['auth/userId'] + url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(body),
    ...options,
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Failed to update data'); ;
  }
};

const PATCH = async (url, body, options) => {
  const response = await fetch(baseURL + '/' + store.getters['auth/userId'] + url, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(body),
    ...options,
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Failed to update data'); ;
  }
};

const DELETE = async (url, options) => {
  const response = await fetch(baseURL + '/' + store.getters['auth/userId'] + url, {
    method: 'DELETE',
    ...options,
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Failed to delete data'); ;
  }
};

export default { GET, POST, PUT, PATCH, DELETE };
