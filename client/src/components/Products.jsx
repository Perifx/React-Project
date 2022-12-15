import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  // GET PRODUCTS

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products/find?category=${cat}`
            : `http://localhost:5000/api/products/find`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);

  // FILTERS HANDLING

  useEffect(() => {
    setFilteredProducts(
      cat &&
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
    );
  }, [products, filters, cat]);

  // SORTING HANDLING

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(
        (prev) =>
          prev &&
          [...prev].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts(
        (prev) => prev && [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts(
        (prev) => prev && [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  console.log(sort);
  console.log(filteredProducts);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => (
            <ProductItem item={item} key={item.id} />
          ))
        : products.map((item) => <ProductItem item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
