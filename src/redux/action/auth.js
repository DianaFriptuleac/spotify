export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER    = "LOGIN_USER";
export const LOGOUT_USER   = "LOGOUT_USER";

export const AUTH_LOGOUT = "AUTH_LOGOUT";

const API_BASE = "http://localhost:3001/auth";

const JSON_HEADERS = { "Content-Type": "application/json" };

//Register
// redux/action/auth.js
export const registerUser = ({ name, surname, email, password, avatar }) => {
  return async (dispatch) => {
    const resp = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name, surname, email, password, avatar }),
    });

    // prova a leggere l'errore testuale/json per messaggio utile
    if (!resp.ok) {
      let msg = `Registrazione fallita (${resp.status})`;
      try {
        const err = await resp.json();
        msg = err?.msg || err?.message || msg;
      } catch {}
      throw new Error(msg);
    }

    const user = await resp.json();

    // salva utente "registrato ma non autenticato"
    dispatch({
      type: REGISTER_USER,
      payload: { token: null, user: {
        id: user.id, nome: user.name, cognome: user.surname, email: user.email, avatar: user.avatar
      }},
    });

    // AUTO-LOGIN: riutilizza le stesse credenziali
    await dispatch(loginUser({ email, password }));

    return { ok: true, autoLogged: true };
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

    if (!resp.ok) {
      let msg = `Errore (${resp.status})`;
      try {
        const err = await resp.json();
        // il BE manda "msg"
        msg = err?.msg || err?.message || msg;
      } catch {}
      throw new Error(msg);
    }

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