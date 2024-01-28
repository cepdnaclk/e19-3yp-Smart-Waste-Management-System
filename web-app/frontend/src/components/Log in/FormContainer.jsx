import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logo from "./Logo";
import Img from "./Img";
import SignIn from "./SignIn";
import { useLogin } from "../../hooks/useLogin";
//import userLogo from "./user.png";

import { useState } from "react";

function FormContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  async function loginUser(event) {
    event.preventDefault();

    await login(email, password);

    // try {
    //   const response = await fetch("http://localhost:1337/api/", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await response.json();

    //   if (data.admin) {
    //     localStorage.setItem("token", data.admin);
    //     window.location.href = "/dashboard";
    //   } else {
    //     alert("Please check your email and password");
    //   }
    // } catch (error) {
    //   console.log("Error during login:", error);
    // }
  }

  return (
    <div style={style.container}>
      <Logo />
      <SignIn />
      <Img />
      <div style={style.welcome}>Welcome Back!</div>
      <div style={style.login}>Login to continue</div>
      <Form style={style.form} onSubmit={loginUser}>
        <Form.Group controlId="email">
          <Form.Label style={style.label}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="username@gmail.com"
            style={style.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label style={style.label}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            style={style.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div style={style.buttonContainer}>
          <Button
            variant="primary"
            type="submit"
            style={style.button}
            disabled={isLoading}
          >
            Login
          </Button>

          <div style={style.text}>Forgot Password?</div>
        </div>
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
      </Form>
    </div>
  );
}

const style = {
  container: {
    width: "500px",
    margin: "auto",
    marginTop: "200px",
    marginLeft: "650px",
  },
  form: {
    padding: "20px",
    //borderRadius: "8px",
    //boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    //border: "none",
  },
  welcome: {
    color: "#005211",
    fontWeight: "bold",
    fontSize: "32px",
    marginBottom: "16px",
  },
  login: {
    color: "#4f9e5f",
    marginBottom: "32px",
  },

  label: {
    fontWeight: "bold",
    marginBottom: "10px",
    display: "block",
    borderRadius: "0px",
    //borderColor: "#005211",
    color: "#005211",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
    boxSizing: "border-box",
    borderRadius: "20px",
    borderColor: "#005211",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
    backgroundColor: "#4f9e5f",
    borderColor: "#005211",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "100px",
    display: "grid",
    placeItem: "center",
  },
  text: {
    color: "#4f9e5f",
    textAlign: "center",
    marginTop: "30px",
    marginBottom: "10px",
    marginLeft: "10px",
  },
};

export default FormContainer;
