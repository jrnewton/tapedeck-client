const prefix = 'tapedeck';

export const setItem = (key, value) => {
  localStorage.setItem(`${prefix}-${key}`, value);
};

export const getItem = (key) => {
  return localStorage.getItem(`${prefix}-${key}`);
};

export const removeItem = (key) => {
  localStorage.removeItem(`${prefix}-${key}`);
};
