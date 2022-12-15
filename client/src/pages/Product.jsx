import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/reducers/cartSlice";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 20px 0;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  transition: all ease 0.25s;
  &:hover {
    background-color: teal;
    color: white;
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const { addProduct } = cartActions;
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const res = await publicRequest.get(id && `/products/find/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductById();
  }, [id]);

  const amountHandler = (operation) => {
    if (operation === "dec") {
      amount > 1 && setAmount(amount - 1);
    } else {
      setAmount(amount + 1);
    }
  };

  const addBtnHandler = () => {
    dispatch(addProduct({ ...product, amount, color, size }));
  };

  console.log(size, color);
  console.log(product);

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img}></Image>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>{product.price} LE</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color &&
                product.color.map((item) => (
                  <FilterColor
                    color={item}
                    onClick={() => setColor(item)}
                    key={item}
                  />
                ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size &&
                  product.size.map((item) => (
                    <FilterSizeOption key={item}>{item}</FilterSizeOption>
                  ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => amountHandler("dec")} />
              <Amount>{amount}</Amount>
              <Add onClick={() => amountHandler("inc")} />
            </AmountContainer>
            <Button onClick={addBtnHandler}>ADD TO CARD</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
    </Container>
  );
};

export default Product;
