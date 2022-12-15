import { CachedOutlined } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../store/reducers/usersSlice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("./assets/images/Login-Background.jpg") center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  ${mobile({ justifyContent: "center", backgroundSize: "200% 100%" })}
`;
const Wrapper = styled.div`
  width: 40%;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  margin-right: 4%;
  ${mobile({ width: "75%", marginRight: "0" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: teal;
  }
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  margin: 10px 0;
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
`;

const Login = () => {
  const [user, setUser] = useState({});
  const { isLoading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  console.log(user);
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        {error && <Error>{error}</Error>}
        <Form onSubmit={submitHandler} onChange={changeHandler}>
          <Input type="text" placeholder="Username" name="username" />
          <Input type="password" placeholder="Password" name="password" />
          {isLoading && <CachedOutlined />}
          <Button>LOGIN</Button>
          <Link>Forget Your Password ?</Link>
          <Link>Create New Account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
