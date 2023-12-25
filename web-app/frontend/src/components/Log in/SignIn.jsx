import React from "react";

const SignIn = () => {
  return (
    <div style={style.SignInContainer}>
      <div style={style.text}>New User?</div>
      <button style={style.button} className="sign-up-button">
        <a href="/register" style={style.link}>
          {" "}
          Sign Up{" "}
        </a>
      </button>
    </div>
  );
};

const style = {
  SignInContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: "10px",
    right: "10px",
    marginRight: "40px",
    marginTop: "20px",
  },
  button: {
    width: "100%",
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
    //width: '10%',
    marginTop: "30px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "30px",
    whiteSpace: "nowrap",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
};

export default SignIn;
