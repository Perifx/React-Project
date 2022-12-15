import { useState } from "react";
import "./newProduct.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/reducers/productSlice";

export default function NewProduct() {
  const [newProduct, setNewProduct] = useState({});
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };
  console.log(newProduct);
  console.log(newProduct);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addProduct(newProduct));
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form
        className="addProductForm"
        onSubmit={submitHandler}
        onChange={changeHandler}
      >
        <div className="addProductItem">
          <label>Image</label>
          <input name="img" type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input name="title" type="text" placeholder="product name" />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="product description" />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input name="color" type="text" placeholder="product color" />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="123" />
        </div>
        <button type="submit" className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
