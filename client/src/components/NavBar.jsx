import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { cartActions } from "../store/reducers/cartSlice";
import { userActions } from "../store/reducers/usersSlice";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  border: 1px solid black;
  color: black !important;
  padding: 7px 10px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const CartIcon = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const NavBar = () => {
  const { amount } = useSelector((state) => state.cartList);
  const { currentUser } = useSelector((state) => state.user);
  const { logOut } = userActions;
  const { cartLogOut } = cartActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoClickHandler = () => {
    navigate("/");
  };
  const logOutHandler = () => {
    localStorage.removeItem(`persist:root`);
    dispatch(logOut());
    dispatch(cartLogOut());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search.." />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={logoClickHandler}>PERIFX.</Logo>
        </Center>
        <Right>
          {!currentUser && (
            <>
              <MenuItem>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                >
                  LOGIN
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/register"
                >
                  REGISTER
                </Link>
              </MenuItem>
            </>
          )}
          {currentUser && (
            <MenuItem onClick={logOutHandler}>
              <Link style={{ textDecoration: "none", color: "black" }} to="/">
                LOGOUT
              </Link>
            </MenuItem>
          )}
          <CartIcon>
            <Link style={{ color: "black" }} to="/cart">
              <Badge badgeContent={amount} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </CartIcon>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
