import { fetchWrapper } from "./fetch.wrapper";

export type User = { name: string; username: string }
export type UserList = Array<User & { password: string }>

export async function getUsers() {
  const request = await fetchWrapper.get('/api/account/getusers');
  const user: User[] = await request.json()
  return user
}

export async function getUser() {
  const request = await fetchWrapper.get('/api/account/getuser');
  const user: User = await request.json()
  return user
}

export async function login(username: string, password: string) {
  const res = await fetchWrapper.post('/api/account/login', { username: username, password: password });

  if (res.serviceToken && res.serviceToken.length > 0) {
    return res;
  }
  return false;
}

export async function logout() {
  const res = await fetchWrapper.post('/api/account/logout', {});
  return res;
}

export async function getContainerList() {
  const res = await fetchWrapper.get('/api/containers');
  return res;
}