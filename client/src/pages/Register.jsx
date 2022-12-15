import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../store/reducers/usersSlice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("./assets/images/Register-Background.jpg") center;
  background-size: 100% 110%;
  display: flex;
  align-items: center;
  justify-content: end;
  ${mobile({ justifyContent: "center", backgroundSize: "190% 100%" })}
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
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  white-space: nowrap;
`;

const Register = () => {
  const [user, setUser] = useState({});
  const { isLoading, error, currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(user));
    currentUser && navigate("/");
  };

  console.log(user);

  return (
    <Container>
      <Wrapper>
        <Title>CREATE NEW ACCOUNT</Title>
        {isLoading && <CircularProgress />}
        {error && (
          <div className="error">{`${error}.. Please try again later`}</div>
        )}
        <Form onChange={changeHandler} onSubmit={submitHandler}>
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input name="username" placeholder="Username" />
          <Input name="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>SIGN UP</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
