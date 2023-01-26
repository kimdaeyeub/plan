import React from "react";
import styled from "styled-components";

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: ${(prop) => (prop.mobile ? "80%" : "50%")};
  height: 90%;
  min-height: 560px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3% 3% 6% 3%;
  box-sizing: border-box;
`;

const Logo = styled.h1`
  font-family: "Dancing Script", cursive;
  font-size: 12em;
  background-image: linear-gradient(135deg, #5efce8 10%, #736efe 100%);
  height: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  width: 100%;
`;

const Input = styled.input`
  padding: 5%;
  box-sizing: border-box;
  border: none;
  border-bottom: ${(prop) => (prop.Width ? "1px solid grey" : "none")};
  width: ${(prop) => (prop.Width ? "80%" : "40%")};
  margin-top: ${(prop) => (prop.Width ? "1rem" : "3rem")};
`;
const Auth = ({
  mobile,
  onChangePassword,
  onChangeEmail,
  onSubmit,
  email,
  password,
}) => {
  return (
    <Body>
      <Box mobile={mobile}>
        <Logo>Plan</Logo>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChangeEmail}
            value={email}
            Width={true}
            placeholder="Email"
            type="email"
          />
          <Input
            onChange={onChangePassword}
            value={password}
            Width={true}
            placeholder="Password"
            type="password"
          />
          <Input Width={false} type="submit" value="LogIn" />
        </Form>
      </Box>
    </Body>
  );
};

export default Auth;
