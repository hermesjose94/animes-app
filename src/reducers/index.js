const reducer = (state, action) => {
  switch (action.type) {
    //--------------
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_EXPITED_AT':
      return {
        ...state,
        expiredAt: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_IS_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case 'SET_ANIMES_WEEK':
      return {
        ...state,
        animesWeek: action.payload,
      };
    case 'SET_ANIMES':
      return {
        ...state,
        animes: action.payload,
      };
    case 'SET_ANIME':
      return {
        ...state,
        anime: action.payload,
      };
    case 'SET_LOADING_AUTH':
      return {
        ...state,
        loadingAuth: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_ANIMES_FILTER':
      return {
        ...state,
        animesFilter: action.payload,
      };
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'SET_FORM_ANIME':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
