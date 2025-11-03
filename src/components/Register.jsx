import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../redux/action/auth";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  //Form state
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  //modifiche campo input
  const onChange = (e) => {
    // Aggiorna lo stato "form" - copia il contenuto precedente (...f)
    // sostituisce solo il campo modificato (e.target.name)
    // con il nuovo valore inserito (e.target.value)
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(""); // svuota campi
    try {
      await dispatch(registerUser(form)); // chiama registerUser di Redux
      // { replace: true } indica a React Router di sostituire
      // la voce corrente nella cronologia del browser (non potrà
      // tornare indietro con il tasto “←” alla pagina di registrazione)
      // Evita che l’utente torni su /register dopo essersi registrato.
      navigate("/login", { replace: true }); //reindirizza alla pagina di login
    } catch (err) {
      setErrMsg(err.message || "Registration failed");
    }
  };

  return (
    <Container className="mt-5 auth-container" style={{ maxWidth: 520 }}>
      {errMsg && (
        <Alert variant="danger" className="mt-3 auth-alert">
          {errMsg}
        </Alert>
      )}
      <h3 className="mb-3 auth-title">Register</h3>

      <Form onSubmit={onSubmit} noValidate className="auth-card">
        <Row>
          <Col md={6} className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
            className="auth-input"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Name"
              required
            />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control
            className="auth-input"
              name="surname"
              value={form.surname}
              onChange={onChange}
              placeholder="Surname"
              required
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
          className="auth-input"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
          className="auth-input"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Enter your password"
            minLength={8}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="auth-submit"
          disabled={
            !form.name || !form.surname || !form.email || !form.password
          }
        >
          {" "}
        Create an account
        </Button>
      </Form>

      <div className="mt-3 text-secondary px-2">
        You already have an account? <Link to="/login">Sign in</Link>
      </div>
    </Container>
  );
};
export default Register;
