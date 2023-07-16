import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase";
let Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/dashboard", { replace: true });
      } else {
      }
    });
  }, []); //useEffect for auth

  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("email", userCredential.email);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log(error.code);
      });
  }; //submitHandler

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center flex-column"
        style={{ height: "100vh" }}
      >
        <h3 className="text-start">Login</h3>
        <Form
          onSubmit={(e) => submitHandler(e)}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              placeholder="Email"
              name="email"
              className="shadow-none"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              placeholder="Password"
              name="password"
              type="password"
              className="shadow-none d-block"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {email !== "" &&
          password !== "" &&
          email.length > 5 &&
          password.length > 4 ? (
            <Button variant="outline-success" type="submit" className="w-100">
              Login
            </Button>
          ) : (
            <Button
              variant="outline-success"
              type="submit"
              className="w-100"
              disabled
            >
              Login
            </Button>
          )}
        </Form>
        <div className="container text-center">
          <p className="display-5 mt-5"></p>
        </div>
      </Container>
    </>
  );
};

export default Login;
