import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 4px" })}
`;
const Option = styled.option`
  padding: 10px;
`;

const ProductList = () => {
  const { category } = useParams();
  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState("");

  const filterHandler = (e) => {
    setFilter({ ...filters, [e.target.name]: e.target.value });
  };
  const sortHandler = (e) => {
    setSort((e.target.name = e.target.value));
  };

  return (
    <Container>
      <Title>{`${category.toUpperCase()} COLLECTION`}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={filterHandler}>
            <Option disabled selected>
              Color
            </Option>
            <Option value="black">Black</Option>
            <Option value="white">White</Option>
            <Option value="red">Red</Option>
            <Option value="pink">Pink</Option>
            <Option value="maroon">Maroon</Option>
            <Option value="blue">Blue</Option>
            <Option value="green">Green</Option>
            <Option value="yellow">Yellow</Option>
          </Select>
          <Select name="size" onChange={filterHandler}>
            <Option disabled selected>
              Size
            </Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select name="sort" onChange={sortHandler}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={category} filters={filters} sort={sort} />
      <Newsletter />
    </Container>
  );
};

export default ProductList;
