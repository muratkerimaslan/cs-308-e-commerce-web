import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  user: {
    username: "",
    email: ""
  }
});



export const setGlobalUsername = (username) => {
  setGlobalState('user', (v) => ({ ...v, username }));
};

export const setGlobalEmail = (email) => {
  setGlobalState('user', (v) => ({ ...v, email }));
};

export { useGlobalState };