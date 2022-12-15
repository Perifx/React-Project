import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: all ease 1.5s;
`;

const Slide = styled.div`
  background-color: #${(props) => props.bg};
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  transform: translateX(2 * -100vw);
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
`;
const Desc = styled.p`
  margin: 50px 0;
  font-style: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState();
  const arrowHandler = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3);
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
    }
  };
  const navigate = useNavigate();

  const moreHandler = (cat) => {
    navigate(`/products/${cat}`);
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => arrowHandler("left")}>
        <KeyboardDoubleArrowLeft />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide key={item.id} bg={item.bg}>
            <ImgContainer>
              <Image src={item.img}></Image>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button onClick={() => moreHandler(item.cat)}>Show More</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => arrowHandler("right")}>
        <KeyboardDoubleArrowRight />
      </Arrow>
    </Container>
  );
};

export default Slider;
