export const LoginStart = (userInfo) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
});
export const Logout = (error) => ({
  type: "LOGOUT",
});

export const UpdateStart = (userInfo) => ({
  type: "UPDATE_START",
});

export const UpdateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
});

export const UpdateSearch = (search) => {
  return {
    type: "UPDATE_SEARCH",
    payload: search,
  };
};
