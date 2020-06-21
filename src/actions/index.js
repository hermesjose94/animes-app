//AUTH

export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const setToken = (payload) => ({
  type: 'SET_TOKEN',
  payload,
});

export const setExpitedAt = (payload) => ({
  type: 'SET_EXPITED_AT',
  payload,
});

export const setUser = (payload) => ({
  type: 'SET_USER',
  payload,
});

export const setIsAuthenticated = (payload) => ({
  type: 'SET_IS_AUTHENTICATED',
  payload,
});

export const setLoadingAuth = (payload) => ({
  type: 'SET_LOADING_AUTH',
  payload,
});

//ANIMES
export const setAnimesWeek = (payload) => ({
  type: 'SET_ANIMES_WEEK',
  payload,
});

export const setAnimes = (payload) => ({
  type: 'SET_ANIMES',
  payload,
});

export const setAnime = (payload) => ({
  type: 'SET_ANIME',
  payload,
});

export const setAnimesFilter = (payload) => ({
  type: 'SET_ANIMES_FILTER',
  payload,
});

//GENERAL PAGE
export const setLoading = (payload) => ({
  type: 'SET_LOADING',
  payload,
});

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const setQuery = (payload) => ({
  type: 'SET_QUERY',
  payload,
});

//FORM
export const setFormAnime = (payload) => ({
  type: 'SET_FORM_ANIME',
  payload,
});

export const setErrorForm = (payload) => ({
  type: 'SET_ERROR_FORM',
  payload,
});
