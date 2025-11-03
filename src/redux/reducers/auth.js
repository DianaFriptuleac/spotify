import {
REGISTER_USER, LOGIN_USER, LOGOUT_USER
} from "../action/auth";

const initialState = {
  userId: null,
  token: null,
  user: null,
  isAuthenticated: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      const token = action.payload?.token ?? null;
      const user  = action.payload?.user ?? null;
      return {
        ...state,
        userId: user?.id ?? null,
        token,
        user,
        // autenticato solo se abbiamo un token
        isAuthenticated: Boolean(token),
      };
    }

    case LOGIN_USER:
      return {
        ...state,
        userId: action.payload.user.id,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};
export default authReducer;
