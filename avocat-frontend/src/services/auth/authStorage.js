const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

let inMemoryToken = null;
let inMemoryUser = null;

export const getStoredToken = () => {
  if (inMemoryToken) {
    return inMemoryToken;
  }

  const storedToken = localStorage.getItem(TOKEN_KEY);
  if (!storedToken) {
    return null;
  }

  try {
    inMemoryToken = JSON.parse(storedToken);
  } catch {
    inMemoryToken = storedToken;
  }

  return inMemoryToken;
};

export const getStoredUser = () => {
  if (inMemoryUser) {
    return inMemoryUser;
  }

  const storedUser = localStorage.getItem(USER_KEY);
  if (!storedUser) {
    return null;
  }

  try {
    inMemoryUser = JSON.parse(storedUser);
  } catch {
    inMemoryUser = null;
  }

  return inMemoryUser;
};

export const setStoredAuth = (user, token) => {
  inMemoryToken = token;
  inMemoryUser = user;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearStoredAuth = () => {
  inMemoryToken = null;
  inMemoryUser = null;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
