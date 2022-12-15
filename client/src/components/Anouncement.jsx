import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Anouncement = () => {
  return (
    <Container>
      Super Sale 50% on Men Shirts! .. Mega Sale on Women Shoes!
    </Container>
  );
};

export default Anouncement;
