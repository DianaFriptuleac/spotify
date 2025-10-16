export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER    = "LOGIN_USER";
export const LOGOUT_USER   = "LOGOUT_USER";

export const AUTH_LOGOUT = "AUTH_LOGOUT";

const API_BASE = "http://localhost:3001/auth";

const JSON_HEADERS = { "Content-Type": "application/json" };

//Register
export const registerUser = ({ name, surname, email, password, avatar }) => {
  return async (dispatch) => {
    const resp = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name, surname, email, password, avatar }),
    });

    if (!resp.ok) throw new Error(`Registrazione fallita (${resp.status})`);

    let data = null;
    try { data = await resp.json(); } catch { data = null; }

    // Se il BE restituisce accessToken -> auto-login
    if (data?.accessToken) {
      dispatch({
        type: REGISTER_USER,
        payload: {
          token: data.accessToken,
          user: {
            id: data.id,
            nome: data.name ?? data.nome,
            cognome: data.surname ?? data.cognome,
            email: data.email,
            avatar: data.avatar,
          },
        },
      });
      return { ok: true, autoLogged: true };
    }

    // Altrimenti: registrato ma non autenticato
    dispatch({
      type: REGISTER_USER,
      payload: {
        token: null,
        user: {
          id: null,
          nome: name,
          cognome: surname,
          email,
          avatar,
        },
      },
    });
    return { ok: true, autoLogged: false };
  };
};

/**
 * LOGIN
 */
export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    const resp = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ email, password }),
    });

    if (!resp.ok) throw new Error("Credenziali errate");

    const data = await resp.json();
    dispatch({
      type: LOGIN_USER,
      payload: {
        token: data.accessToken,
        user: {
          id: data.id,
          nome: data.name ?? data.nome,
          cognome: data.surname ?? data.cognome,
          email: data.email,
          avatar: data.avatar,
        },
      },
    });
    return { ok: true };
  };
};

export const logoutUser = () => ({ type: LOGOUT_USER });