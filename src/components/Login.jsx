import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../redux/selectors/authSelectors";
import { useState } from "react";
import { loginUser } from "../redux/action/auth";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //modifiche campo input
  const onChange = (e) => {
     // Aggiorna lo stato "form" - copia il contenuto precedente (...f)
    // sostituisce solo il campo modificato (e.target.name)
    // con il nuovo valore inserito (e.target.value)
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);
    try {
      await dispatch(loginUser(form));  // chiama loginUser - action Redux
    } catch (error) {
      setErrMsg(error.message || "Incorrect credentials");
    } finally {
      setLoading(false);
    }
  };
  if (isAuth) return <Navigate to="/" replace/>  //Se autenticato - reindirizza alla Home

  return (

    <Container className="mt-5">
        {errMsg && <Alert variant="danger" className="mt-3">{errMsg}</Alert>}
      <h3>Accedi</h3>
      <Form onSubmit={onSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
            <Button
              type="button"
              variant="link"
              className="position-absolute top-50 end-0 translate-middle-y me-1 p-2"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"} />
            </Button>
          </div>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          disabled={!form.email || !form.password || loading}
        >
          {loading ? "Access..." : "Log in"}
        </Button>
      </Form>
    </Container>
  );
};
export default Login;
