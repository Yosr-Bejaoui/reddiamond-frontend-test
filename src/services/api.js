const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export const getUsers = () => request('/users');
export const getUserById = (id) => request(`/users/${id}`);
export const getPostsByUser = (userId) => request(`/posts?userId=${userId}`);
export const getAlbumsByUser = (userId) => request(`/albums?userId=${userId}`);
