import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import { authService } from "./fbase";
import Home from "./Home";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userObj, setUserObj] = useState(null);
  const [init, setInit] = useState(false);

  const onChangeEmail = (event) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
  };
  const onChangePassword = (event) => {
    const {
      target: { value },
    } = event;
    setPassword(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        // Signed in
        // ...
      })
      .catch((error) => {});
  };
  const resizeHandler = () => {
    if (window.innerWidth < 1000) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <>
          {isLoggedIn ? (
            <Home userObj={userObj} mobile={mobile} />
          ) : (
            <Auth
              onSubmit={onSubmit}
              onChangeEmail={onChangeEmail}
              onChangePassword={onChangePassword}
              mobile={mobile}
              email={email}
              password={password}
            />
          )}
        </>
      ) : (
        <Body>"Loading..."</Body>
      )}
    </>
  );
};
export default App;
