import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logo from "./Logo"; // Import the Logo component
import Img from "./Img"; // Import the Img component
import SignIn from "./SignIn"; // Import the SignIn component
//import userLogo from "./user.png";

import { useState } from "react";

function FormContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.user) {
        localStorage.setItem("token", data.user);
        alert("Login successful");
        window.location.href = "/dashboard";
      } else {
        alert("Please check your username and password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div style={style.container}>
      <Logo />
      <SignIn />
      <Img />
      <div style={style.welcome}>Welcome Back!</div>
      <div style={style.login}>Login to continue</div>
      <Form style={style.form} onSubmit={loginUser}>
        <Form.Group controlId="username">
          <Form.Label style={style.label}>Username / Email</Form.Label>
          <Form.Control
            type="username"
            placeholder="username@gmail.com"
            style={style.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            <Button variant="primary" type="submit" style={style.button}>
              Login
            </Button>
          
            <div style={style.text}>Forgot Password?</div>
          </div>
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
    //justifyContent: "center",
    alignItems: "center",
    //marginTop: "20px",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
    backgroundColor: "#4f9e5f",
    borderColor: "#005211",
    marginTop: "20px",
    padding: "5px",
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
