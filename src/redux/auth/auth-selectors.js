export const getIsLoggedIn = state => state.auth.isLoggedIn;

export const getUserName = state => state.auth.user.name;

export const getIsRefreshingCurrentUser = state =>
    state.auth.isRefreshingCurrentUser;
