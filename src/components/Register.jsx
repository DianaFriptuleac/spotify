import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectIsAuthenticated,
} from "../redux/selectors/authSelectors";
import { useState } from "react";
import { registerUser } from "../redux/action/auth";
import { Navigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const isAuthed = useSelector(selectIsAuthenticated);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  }

  if(isAuthed) return <Navigate to="/" replace/>

  return(
      <Container className="mt-5" style={{ maxWidth: 520 }}>
      <h3 className="mb-3">Registrazione</h3>

      <Form onSubmit={onSubmit} noValidate>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Mario"
              required
            />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              name="surname"
              value={form.surname}
              onChange={onChange}
              placeholder="Rossi"
              required
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="nome@esempio.com"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="••••••••"
            minLength={8}
            required
          />
          <Form.Text className="text-muted">
            Minimo 8 caratteri, usa maiuscole, minuscole, numeri e simboli.
          </Form.Text>
        </Form.Group>

       <Button
 type="submit"
  variant="success"
 disabled={!form.name || !form.surname || !form.email || !form.password}
>  Crea account
</Button>
      </Form>

      <div className="mt-3">
        Hai già un account? <Link to="/login">Accedi</Link>
      </div>
    </Container>
  )
};
export default Register