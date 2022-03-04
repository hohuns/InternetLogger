import React, { useRef } from "react";

const Login = (props) => {
  const pwRef = useRef("");

  const pwHandler = () => {
    props.pw(pwRef.current.value);
  };

  return (
    <section>
      <h3 style={{ color: "white" }}>
        Input the password to access the Message Log
      </h3>
      <input
        style={{
          backgroundColor: "transparent",
          backgroundRepeat: "no-repeat",
          borderRadius: "5px",
          padding: "0.2rem",
          border: "1px solid #ccc",
          color: "white",
        }}
        type="text"
        id="pw"
        ref={pwRef}
        placeholder="Password"
      />
      <br></br>
      <br></br>
      <button onClick={pwHandler}>Submit</button>
    </section>
  );
};

export default Login;
